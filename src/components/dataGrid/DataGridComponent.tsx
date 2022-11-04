import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, Typography, Container, Grid, Card } from "@mui/material";
import { grey } from '@mui/material/colors';

/**
 * @typedef {Object} Columns
 */
type Columns = {
  field: string,
  headerName: string,
  width: number,
  flex: number,
  minWidth: number
}

/**
 * @typedef {Object} Row
 */
type Row = {
  id: number,
  functionality: string,
  data: string,
  state: boolean
}

/**
* @typedef {Object} Props
*/
type Props = {
  rows: Array<Row>;
  columns: Array<Columns>;
}


const DataGridComponent = (props: Props) => {
  
  return (
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">Monitoraggio Piattaforma Notifiche</Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card elevation={24} sx={{ width: 1, padding: "5%", boxShadow: "0px 3px 3px -2px ", backgroundColor: 'background.paper' }}>
            <Grid item>
              <DataGrid
                rows={props.rows}
                columns={props.columns}
                disableSelectionOnClick
                hideFooter={true}
                experimentalFeatures={{ newEditingApi: true }}

                sx={{
                  height: '230px',
                  [`& .${gridClasses.row}`]: {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? 'background.default' : 'background.default',
                  },
                }}
              />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataGridComponent;
