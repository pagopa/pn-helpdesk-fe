import MainLayout from "../mainLayout/MainLayout";
import {Box, Card, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {EstimatesTable} from "../../components/usageEstimates/EstimatesTable";
import FilterTable from "../../components/forms/filterTable/FilterTable";
import {FieldsEstimatesFilter} from "../../components/formFields/FormFields";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {EstimatesPageableRequest} from "../../model";
import {changeFilterEstimates} from "../../redux/usageEstimates/reducers";


export function SearchUsageEstimationsPage({email=""}){
  const filters = useAppSelector(state => state.usageEstimate.pagination);
  const dispatch = useAppDispatch();

  const handleFiltersSubmit = (filters: any) => {
    console.log(filters);
    if (filters?.paSelected?.id) {
      const filter: EstimatesPageableRequest = {
        paId: filters.paSelected.id,
        page: 1,
        tot: 10
      }
      dispatch(changeFilterEstimates(filter));
    }
  }

  const fields = [FieldsEstimatesFilter["Pa Autocomplete"]];

  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Volumi delle notifiche
            </Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "5%",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
            {
              (filters.paId) && <EstimatesTable/>
            }
            {
              (!(filters.paId)) && <Typography>Selezionare una PaId</Typography>
            }

          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}