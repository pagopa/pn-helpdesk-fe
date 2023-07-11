import MainLayout from "../mainLayout/MainLayout";
import {Box, Card, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {ReportEstimatesTable} from "../../components/usageEstimates/ReportEstimatesTable";
import FilterTable from "../../components/forms/filterTable/FilterTable";
import {FieldsReportEstimateFilter} from "../../components/formFields/FormFields";


export function SearchEstimatesReportPage(){

  const handleFiltersSubmit = (filters: any) => {
    console.log(filters);
  }

  const fields = [FieldsReportEstimateFilter["Pa Autocomplete"], FieldsReportEstimateFilter["Stato report"]];

  return <MainLayout email={"email"}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Dashboard deanonimizzazione consuntivi
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
            <ReportEstimatesTable />
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}