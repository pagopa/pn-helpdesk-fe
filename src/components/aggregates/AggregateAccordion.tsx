import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { getAggregateResponse } from '../../api/apiRequestTypes';
import PaginatedPaList from '../paList/PaginatedPaList';

type Props = {
  aggregate: getAggregateResponse;
};

const AggregateAccordion = ({ aggregate }: Props) => (
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
      <Grid container spacing={2}>
        <Typography>
          <strong>Nome aggregazione: </strong>
        </Typography>
        <Typography>{aggregate?.name}</Typography>
        <Typography>
          <strong>Descrizione aggregazione: </strong>
        </Typography>
        <Typography>{aggregate?.description}</Typography>
        <Typography>
          <strong>Usage plan: </strong>
        </Typography>
        <Typography>{aggregate?.usagePlan?.name}</Typography>
        <Typography>
          <strong>PA Associate: </strong>
        </Typography>
        <PaginatedPaList items={aggregate?.associatedPa ?? []} />
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default AggregateAccordion;
