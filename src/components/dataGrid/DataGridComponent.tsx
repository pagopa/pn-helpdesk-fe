import { DataGrid, gridClasses, GridColumns } from '@mui/x-data-grid';
import { Box, Typography, Container, Grid, Card } from '@mui/material';

/**
 * @typedef {Object} Row
 */
type Row = {
  id: number;
  functionality: string;
  data: string;
  state: boolean;
};

/**
 * @typedef {Object} Props
 */
type Props = {
  rows: Array<Row>;
  columns: GridColumns;
};

const DataGridComponent = (props: Props) => (
  <Container>
    <Grid container direction="row" rowSpacing={3}>
      <Grid item container>
        <Box>
          <Typography variant="h4" color="text.primary">
            Monitoraggio Piattaforma Notifiche
          </Typography>
        </Box>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        <Card
          elevation={24}
          sx={{
            width: 1,
            padding: '5%',
            boxShadow: '0px 3px 3px -2px ',
            backgroundColor: 'background.paper',
          }}
        >
          <Grid item>
            <DataGrid
              rows={props.rows}
              columns={props.columns}
              disableSelectionOnClick
              hideFooter={true}
              experimentalFeatures={{ newEditingApi: true }}
              disableVirtualization
              sx={{
                width: '100%',
                height: '230px',
                [`& .${gridClasses.row}`]: {
                  bgcolor: () => 'background.default',
                },
              }}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default DataGridComponent;
