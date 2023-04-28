import { Grid, Typography, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAggregateResponse } from "../../api/apiRequestTypes";
import PaginatedPaList from "../paList/PaginatedPaList";

type Props = {
    aggregate: getAggregateResponse
}

const AggregateAccordion = ({aggregate} : Props) => {

    return (
        <Accordion data-testid="aggregate-accordion">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="aggregate-header"
            >
                <Typography variant="h6" component="div">
                    Riepilogo Aggregazione
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Typography><strong>Nome aggregazione: </strong></Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Descrizione aggregazione: </strong></Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>Usage plan: </strong></Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{aggregate?.usagePlan?.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography><strong>PA Associate: </strong></Typography>
                    </Grid>
                    <Grid item>
                        <PaginatedPaList items={aggregate?.associatedPa ?? []} />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default AggregateAccordion;