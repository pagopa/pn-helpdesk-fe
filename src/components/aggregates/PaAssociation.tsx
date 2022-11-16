import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardContent, Card, CardHeader, Button, Grid, Typography, Box, Badge, Breadcrumbs, Link, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import PaList from "./PaList";
import PaTable from "./PaTable";
import PaFilterTable from './PaFilterTable';
import { useParams, useNavigate } from "react-router-dom";
import { Aggregate, Pa } from '../../types';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useDispatch } from 'react-redux';
import CustomCard from '../customCard/CustomCard';
import { CardActionType, CardHeaderType } from '../customCard/types';
import BusinessIcon from '@mui/icons-material/Business';
import useConfirmDialog from '../confirmationDialog/useConfirmDialog';

type Props = {
    idAggregate: string | undefined
}
const PaAssociation = ({idAggregate} : Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirmDialog = useConfirmDialog();
    const [associablePaList, setAssociablePaList] = useState<Array<Pa>>([]);
    // const [paSelectedList, setPaSelectedList] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(spinnerActions.updateSpinnerOpened(true));

        apiRequests.getAssociablePaList("")
            .then(
                (response) => {
                    setAssociablePaList(response.items.map((pa) => {return{...pa, selected: false}}));
                }
            )
            .catch(
                error => {
                    dispatch(snackbarActions.updateSnackbacrOpened(true));
                    dispatch(snackbarActions.updateStatusCode("400"));
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                    navigate(`/aggregate/${idAggregate}`);
                }
            ).finally(
                () => dispatch(spinnerActions.updateSpinnerOpened(false))
            )
    }, [idAggregate])

    const handleSelection = (pa: any, selected: boolean) => {
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

    const associablePaCardBody = <PaTable paList={associablePaList} handleSelection={handleSelection} />;

    const paSelectedList = associablePaList.filter((pa) => pa.selected);

    const selectedPaCardHeader : CardHeaderType = {
        title: <Typography variant="h6" component="div">
            PA Selezionate
        </Typography>,
        avatar: <Badge color="primary" badgeContent={paSelectedList.length}>
            <BusinessIcon />
        </Badge>
    }

    const selectedPaCardBody = useMemo(
        () => {
            return (
                <PaList 
                    paList={paSelectedList}
                    handleSelection={handleSelection}
                />
            )
    }, [paSelectedList]
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
            navigate(`/aggregate/${idAggregate}`);
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