import { useEffect, useState } from 'react';
import { Button, Grid, Typography, Badge } from "@mui/material";
import PaList from "../aggregates/PaList";
import AssociablePaTable from "./AssociablePaTable";
import { useNavigate } from "react-router-dom";
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useDispatch } from 'react-redux';
import CustomCard from '../customCard/CustomCard';
import { CardActionType, CardHeaderType } from '../customCard/types';
import BusinessIcon from '@mui/icons-material/Business';
import useConfirmDialog from '../confirmationDialog/useConfirmDialog';
import * as routes from '../../navigation/router.const';
import { Pa } from '../../api/apiRequestTypes';

type Props = {
    idAggregate: string | undefined
}
const PaAssociation = ({idAggregate} : Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirmDialog = useConfirmDialog();
    const [associablePaList, setAssociablePaList] = useState<Array<Pa>>([]);

    useEffect(() => {
        dispatch(spinnerActions.updateSpinnerOpened(true));

        apiRequests.getAssociablePaList("")
            .then(
                (response) => {
                    setAssociablePaList(response.items);
                }
            )
            .catch(
                error => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("400"));
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                    navigate(routes.GET_UPDATE_AGGREGATE_PATH(idAggregate!));
                }
            ).finally(
                () => dispatch(spinnerActions.updateSpinnerOpened(false))
            )
    }, [idAggregate, dispatch, navigate])

    const handleSelection = (pa: Pa, selected: boolean)  => {
        let indexPa = associablePaList.findIndex((item) => item.id === pa.id);

        let associablePaListCopy = [...associablePaList];
        associablePaListCopy[indexPa].selected = selected;

        setAssociablePaList(associablePaListCopy);
    }

    const associablePaCardHeader : CardHeaderType = {
        title: <Typography variant="h6" component="div">
            Lista PA
        </Typography>
    }

    const associablePaCardBody = <AssociablePaTable paList={associablePaList} handleSelection={handleSelection} />;

    const paSelectedList = associablePaList.filter((pa) => pa.selected);

    const selectedPaCardHeader : CardHeaderType = {
        title: <Typography variant="h6" component="div">
            PA Selezionate
        </Typography>,
        avatar: <Badge color="primary" badgeContent={paSelectedList.length}>
            <BusinessIcon />
        </Badge>
    }

    const selectedPaCardBody = (
        <PaList 
            paList={paSelectedList}
            onSelection={handleSelection}
        />
    );

    const selectedPaCardAction : Array<CardActionType> = [{
        component: (
            paSelectedList.length > 0 && <Button
                variant="outlined"
                type="submit"
                size="small"
                onClick={() => handleOnClickSave()}
            >
                Salva
            </Button>
        ),
        id: "cardAction",
    }]

    const handleOnClickSave = () => {
        confirmDialog({
            message: "Sei sicuro di voler associare le PA selezionate ?",
            title: "Conferma salvataggio"
        })
        .then(() => callAddPa())
        .catch(() => {})
    }

    const callAddPa = () => {
        dispatch(spinnerActions.updateSpinnerOpened(true));
        apiRequests.addPa(idAggregate!, paSelectedList)
        .then(
          res => {
            let statusCode = "200";
            let message = "";

            if(res.processed === paSelectedList.length) {
                message = "Tutte le PA sono state associate con successo";
            } else {
                if(res.processed === 0) {
                    message = "Non è stato possibile associare le PA selezionate";
                    statusCode = "400";
                } else {
                    message = "Riscontrati problemi nell'associazione delle seguenti PA : " + res.unprocessedPA.toString() + ". Le restanti PA selezionate sono state salvate con successo";
                    statusCode = "202"
                }
            }
            
            dispatch(snackbarActions.updateMessage(message));
            dispatch(snackbarActions.updateStatusCode(statusCode));
            dispatch(snackbarActions.updateAutoHideDuration(null));
          }
        )
        .catch(
          err => {
            dispatch(snackbarActions.updateStatusCode("400"));
          }
        )
        .finally(
          () => {
            dispatch(snackbarActions.updateSnackbacrOpened(true));
            dispatch(spinnerActions.updateSpinnerOpened(false));
            navigate(routes.GET_UPDATE_AGGREGATE_PATH(idAggregate!));
          }
        )
    }
            
    return (
        <>
            <Grid container spacing={2} sx={{marginTop:1}}>
                <Grid item xs={3}>
                    <CustomCard 
                        cardId='selected-pa-card'
                        cardHeader={selectedPaCardHeader}
                        cardBody={selectedPaCardBody}
                        cardActions={selectedPaCardAction}
                    />
                </Grid>
                <Grid item xs={9}>
                    <CustomCard 
                        cardId='associable-pa-card'
                        cardHeader={associablePaCardHeader}
                        cardBody={associablePaCardBody}
                    />
                </Grid>
        </Grid>
        </>

    );
}
export default PaAssociation;