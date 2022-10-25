import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, Typography, Container, Grid, Card } from "@mui/material";
import { grey } from '@mui/material/colors';
import React from "react";

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
            <Typography variant="h4">Monitoraggio Piattaforma Notifiche</Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card elevation={24} sx={{ width: 1, padding: "5%", boxShadow: "0px 3px 3px -2px " }}>
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
                      theme.palette.mode === 'light' ? grey[200] : grey[900],
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
