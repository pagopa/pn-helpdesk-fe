import { useEffect, useState } from 'react';
import { Grid, Typography, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Aggregate } from '../../types';
import PaList from './PaList';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as routes from '../../navigation/routes';

type Props = {
    idAggregate: string | undefined
}

const AggregateAccordion = ({idAggregate} : Props) => {
    const dispatch = useDispatch();
    const [aggregate, setAggregate] = useState<Aggregate | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(spinnerActions.updateSpinnerOpened(true));
        const getAggregateRequest = apiRequests.getAggregateDetails(idAggregate!);
        const getAssociatedPaListRequest = apiRequests.getAssociatedPaList(idAggregate!);

        Promise.all([getAggregateRequest, getAssociatedPaListRequest])
            .then(
                (responses) => {
                    let aggregate : Aggregate = {
                        ...responses[0],
                        associatedPa: responses[1].items
                    }
                    setAggregate(aggregate);
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
    }, [idAggregate])

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6" component="div">
                    Riepilogo Aggregazione
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <strong>Nome aggregazione:</strong>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <strong>Descrizione aggregazione:</strong>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.description}</Typography>
                    </Grid>
                    <Grid item>
                        <strong>Usage plan:</strong>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.usagePlan?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <strong>PA Associate:</strong>
                    </Grid>
                    <Grid item>
                        <PaList paList={aggregate?.associatedPa ? aggregate?.associatedPa : []} handleSelection={undefined} />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default AggregateAccordion;