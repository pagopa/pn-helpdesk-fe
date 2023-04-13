import { ReactNode, useCallback, useEffect, useState } from "react";
import { Column, Item } from "../table/tableTypes";
import ItemsTable from '../table/table';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { ErrorResponse, getAggregateParams } from "../../api/apiRequestTypes";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, paginationSelector, aggregatesSelector, setPagination, setAggregates, resetState, setFilters } from '../../redux/aggregateSlice';
import { VirtualKeySelector } from "../../redux/virtualKeysSlice";
import { PaginationData } from "../Pagination/types";
import apiRequests from '../../api/apiRequests';
import CustomPagination from "../Pagination/Pagination";
import { calculatePages } from "../../helpers/pagination.utility";
import useConfirmDialog from "../confirmationDialog/useConfirmDialog";
import * as routes from '../../navigation/router.const';
import { FieldsProperties } from "../formFields/FormFields";
import FilterTable from "../forms/filterTable/FilterTable";
import IconButton from '@mui/material/IconButton';
import { useHasPermissions } from "../../hooks/useHasPermissions";
import { Permission } from "../../model/user-permission";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { Box, Button, FormControlLabel, Grid, Typography } from "@mui/material";


type VirtualKeyColumn =
  | 'name'
  | 'groups'
  | 'state'
  | 'pdnd'

/**
 * VirtualKeyTable page
 * @component
 */
const VirtualKeyTable = () => {
  const isUserWriter = useHasPermissions([Permission.API_KEY_WRITE]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmDialog = useConfirmDialog();

  const filters = useSelector(filtersSelector);

  const virtualKeys = useSelector(VirtualKeySelector);

  const paginationData = useSelector(paginationSelector);


  /*const fetchAggregates = useCallback(() => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    //take the lastEvaluated id and name from the pagesKey array using page as index.
    const lastEvaluatedId = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedId;
    const lastEvaluatedName = paginationData.page === 0 ? "" : paginationData.pagesKey[paginationData.page - 1].lastEvaluatedName;
    let params : getAggregateParams = {
      name: filters.name,
      limit: paginationData.limit,
      lastEvaluatedId,
      lastEvaluatedName
    }
    apiRequests.getAggregates(params)
      .then(
        res => {
          dispatch(setAggregates(res));
        }
      ).catch(
        err => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode("400"));
          dispatch(snackbarActions.updateMessage("Non è stato possibile ottenere i dati richiesti"));
          dispatch(resetState());
        }
      ).finally(() => {dispatch(spinnerActions.updateSpinnerOpened(false))})
  }, [filters.name, paginationData.page, paginationData.limit, dispatch, paginationData.pagesKey])

  useEffect(
    () => {
      fetchAggregates();
    }, [fetchAggregates]
  )*/

  const handlePaginationChange = (paginationData: PaginationData) => {
    dispatch(setPagination({ limit: paginationData.limit, page: paginationData.page }));
  };

  const pagesToShow: Array<number> = calculatePages(
    paginationData.limit,
    paginationData.total,
    Math.min(paginationData.pagesKey.length + 1, 3),
    paginationData.page + 1
  );

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  /*const handleClickUpdate = () => {
    apiRequests.modifyPdnd()
      
      .then(res => {
      
      let statusCode = "200";
      let message = "";

      if(res.unprocessedKey.length === 0) {
          message = "Operazione effettuata con successo";
      } else {  
              message = "Riscontrati problemi nel trasferimento delle seguenti Virtual Keys : " + res.unprocessedKey.toString() + ". Le restanti Virtual Keys selezionate sono state aggiornate con successo";
              statusCode = "202"
      }
  
      dispatch(snackbarActions.updateMessage(message));
      dispatch(snackbarActions.updateStatusCode(statusCode));
      dispatch(snackbarActions.updateAutoHideDuration(null));
      dispatch(snackbarActions.updateSnackbacrOpened(true));

      //Refresh lists

  })
  .catch(err => {
      dispatch(snackbarActions.updateSnackbacrOpened(true))
      dispatch(snackbarActions.updateStatusCode(400))
      dispatch(snackbarActions.updateMessage("Errore durante l'aggiornamento delle Virtual Keys"))
      console.log("Errore: ", err)
  })
  .finally(() => {dispatch(spinnerActions.updateSpinnerOpened(false))})

  }*/

  const USER_WRITER_COLUMNS: Array<Column<VirtualKeyColumn>> = [
    {
      id: 'name',
      label: 'Nome',
      width: '20%',
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'groups',
      label: 'Gruppi',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'state',
      label: 'Stato',
      width: '20%',
      sortable: false,
      getCellLabel(value: string) {
        return value;
      }
    },
    {
      id: 'pdnd',
      label: (<FormControlLabel sx={{ marginLeft: 0.019 }}
        value="end"
        control={<Checkbox />}
        label={<Typography sx={{ fontWeight: 600 }}>Flag Interoperabilita'</Typography>}
        labelPlacement="end"
      />
      ),
      width: '20%',
      getCellLabel(value: string) {
        return (<Checkbox
          checked={value === "1"}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        )
      }
    }
  ];


  const rows: Array<Item> = [
    {
      id: "001",
      name: "Key Group 1",
      groups: "Group 1",
      state: "attiva",
      pdnd: "1"
    },
    {
      id: "002",
      name: "Key Group 2",
      groups: "Group 2",
      state: "attiva",
      pdnd: "0"
    },
    {
      id: "003",
      name: "Key Group 3",
      groups: "Group 3",
      state: "attiva",
      pdnd: "1"
    },
    {
      id: "004",
      name: "Key Group 4",
      groups: "Group 4",
      state: "attiva",
      pdnd: "0"
    }
  ];

  return (
    <>
      <Box paddingTop={3}>
        <ItemsTable columns={USER_WRITER_COLUMNS} rows={rows} />
        <CustomPagination
          paginationData={{
            limit: paginationData.limit,
            page: paginationData.page,
            total: paginationData.total
          }}
          onPageRequest={handlePaginationChange}
          pagesToShow={pagesToShow}
          sx={
            {
              padding: '0',
              '& .items-per-page-selector button': {
                paddingLeft: 0,
                height: '24px',
              }
            }
          }
        />
        <Grid direction={"row-reverse"} container marginTop={0.1}>
          <Button
            variant="outlined"
            type="submit"
          //onClick={handleClickUpdate}

          >
            Salva modifiche
          </Button>
        </Grid>
      </Box>
    </>

  );
};
export default VirtualKeyTable;