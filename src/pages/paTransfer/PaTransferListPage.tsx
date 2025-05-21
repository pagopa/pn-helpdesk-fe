import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Autocomplete,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Checkbox,
  Container,
  Box,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import MainLayout from '../mainLayout/MainLayout';
import apiRequests from '../../api/apiRequests';
import * as snackbarActions from '../../redux/snackbarSlice';
import * as spinnerActions from '../../redux/spinnerSlice';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import * as routes from '../../navigation/router.const';
import { Pa } from '../../api/apiRequestTypes';

const PaTransferListPage = ({ email }: any) => {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const aggParam = location?.state?.aggregate ?? null;
  const [renderedAggList, setRenderedAggList]: any = useState(undefined);
  const [input1Value, setInput1Value]: any = useState(undefined);
  const [input2Value, setInput2Value]: any = useState(undefined);
  const [paList1, setPaList1]: any = useState(undefined);
  const [paList2, setPaList2]: any = useState(undefined);
  const [checked, setChecked] = useState<Array<Pa>>([]);
  const areInputsEqual = !!input1Value && input1Value === input2Value;
  const isInput2Disabled = !input1Value;

  useEffect(() => {
    const getAggregates = () => {
      dispatch(spinnerActions.updateSpinnerOpened(true));
      const request = apiRequests.getAggregates({ lastEvaluatedId: '' });
      if (request) {
        request
          .then((res) => {
            setRenderedAggList(res);
          })
          .catch((err) => {
            console.log('Errore: ', err);
          })
          .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
      }
    };

    getAggregates();

    if (aggParam) {
      setInput1Value(aggParam);
      getPas1(null, aggParam);
    }
  }, [dispatch, aggParam]);

  const handleChangeInput1 = (e: any, value: any) => {
    setInput1Value(value);
    setPaList1(undefined);
    value && getPas1(e, value);
  };

  const handleChangeInput2 = (e: any, value: any) => {
    setInput2Value(value);
    setPaList2(undefined);
    value && getPas2(e, value);
  };

  const getPas1 = (e: any, value: any) => {
    const idAggregation = value?.id;
    const request = apiRequests.getAssociatedPaList(idAggregation);
    if (request) {
      request
        .then((res) => {
          setChecked([]);
          setPaList1(res);
        })
        .catch((err) => {
          console.log('Errore: ', err);
        });
    }
  };

  const getPas2 = (e: any, value: any) => {
    const idAggregation = value?.id;
    const request = apiRequests.getAssociatedPaList(idAggregation);
    if (request) {
      request
        .then((res) => {
          setPaList2(res);
        })
        .catch((err) => {
          console.log('Errore: ', err);
        });
    }
  };

  const handleTransfer = () => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests
      .movePa(input2Value.id, checked)
      .then((res) => {
        let statusCode = '200';
        let message = '';

        if (res.processed === checked.length) {
          message = 'Tutte le PA sono state trasferite con successo';
        } else {
          if (res.processed === 0) {
            message = 'Non è stato possibile trasferire le PA selezionate';
            statusCode = '400';
          } else {
            message =
              'Riscontrati problemi nel trasferimento delle seguenti PA : ' +
              res.unprocessedPA.toString() +
              '. Le restanti PA selezionate sono state salvate con successo';
            statusCode = '202';
          }
        }

        dispatch(snackbarActions.updateMessage(message));
        dispatch(snackbarActions.updateStatusCode(statusCode));
        dispatch(snackbarActions.updateAutoHideDuration(null));
        dispatch(snackbarActions.updateSnackbarOpened(true));

        // Refresh lists
        getPas1(undefined, input1Value);
        getPas2(undefined, input2Value);
      })
      .catch((err) => {
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode(400));
        dispatch(snackbarActions.updateMessage('Errore nel trasferimento delle PA'));
        console.log('Errore: ', err);
      })
      .finally(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
      });
  };

  const breadcrumbsLinks = aggParam
    ? [
        {
          linkLabel: 'Gestione Aggregazioni ApiKey',
          linkRoute: routes.AGGREGATES_LIST,
        },
        {
          linkLabel: 'Dettaglio Aggregazione',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          linkRoute: routes.GET_UPDATE_AGGREGATE_PATH(aggParam.id!),
        },
      ]
    : [];

  const list2 = useMemo(
    () => (
      <List
        style={{
          backgroundColor: 'white',
          width: 500,
          height: 500,
          overflow: 'auto',
        }}
      >
        {!areInputsEqual && paList2 && paList2?.items?.length < 1 ? (
          <ListItem>La lista è vuota</ListItem>
        ) : (
          paList2?.items?.map((pa: any) => (
            <ListItem key={pa.id}>
              <ListItemText id={pa.id} primary={pa.name} />
            </ListItem>
          ))
        )}
      </List>
    ),
    [paList2, areInputsEqual]
  );

  const list1 = useMemo(() => {
    const addToChecked = (pa: any) => {
      if (!checked.includes(pa)) {
        setChecked([...checked, pa]);
      } else {
        setChecked(checked.filter((item: any) => item !== pa));
      }
    };

    return (
      <List
        style={{
          backgroundColor: 'white',
          width: 500,
          height: 500,
          overflow: 'auto',
        }}
      >
        {paList1 && paList1?.items?.length < 1 ? (
          <ListItem>La lista è vuota</ListItem>
        ) : (
          paList1?.items?.map((pa: any) => (
            <ListItem key={pa.id}>
              <ListItemIcon>
                <Checkbox
                  onChange={() => addToChecked(pa)}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': pa.id }}
                />
              </ListItemIcon>
              <ListItemText id={pa.id} primary={pa.name} />
            </ListItem>
          ))
        )}
      </List>
    );
  }, [paList1, checked]);

  return (
    <MainLayout email={email}>
      {aggParam && (
        <Container>
          <Breadcrumbs currentLocationLabel="Trasferimento di PA" links={breadcrumbsLinks} />
        </Container>
      )}

      <Container>
        <h1>Trasferimento di PA</h1>
      </Container>
      <Container style={{ marginTop: 20 }}>
        <Box className="agg-selection" style={{ display: 'flex', gap: 350 }}>
          <Autocomplete
            onChange={handleChangeInput1}
            options={renderedAggList?.items || [{ id: 'Caricamento', name: 'Caricamento' }]}
            sx={{ width: 500 }}
            defaultValue={aggParam || null}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => <TextField {...params} label="Aggregazione di partenza" />}
            isOptionEqualToValue={(opt, value) => value.id === opt.id}
            data-testid="sender-agg-autocomplete"
          />
          <Autocomplete
            onChange={handleChangeInput2}
            options={renderedAggList?.items || [{ id: 'Caricamento', name: 'Caricamento' }]}
            sx={{ width: 500 }}
            disabled={isInput2Disabled}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params) => (
              <TextField
                error={areInputsEqual}
                helperText={areInputsEqual ? 'Scegli una lista di aggregazione diversa' : null}
                {...params}
                label="Aggregazione di destinazione"
              />
            )}
            data-testid="receiver-agg-autocomplete"
            isOptionEqualToValue={(opt, value) => value.id === opt.id}
          />
        </Box>
        <Box className="transfer-list" style={{ display: 'flex', gap: 100, marginTop: 50 }}>
          {list1}
          <Box
            style={{
              width: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {isInput2Disabled ||
            areInputsEqual ||
            !input1Value ||
            !input2Value ||
            checked?.length < 1 ? (
              <Button variant="contained" disabled>
                Trasferisci
                <SendIcon fontSize="small" style={{ marginLeft: 10 }} />
              </Button>
            ) : (
              <Button variant="contained" onClick={handleTransfer}>
                Trasferisci
                <SendIcon fontSize="small" style={{ marginLeft: 10 }} />
              </Button>
            )}
          </Box>
          {list2}
        </Box>
      </Container>
    </MainLayout>
  );
};
export default PaTransferListPage;
