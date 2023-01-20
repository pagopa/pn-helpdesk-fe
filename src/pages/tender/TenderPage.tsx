import MainLayout from "../mainLayout/MainLayout";
import React from "react";
import {Box, Button, Card, Container, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {ModelType, PaginationDataGrid} from "../../components/paginationGrid";
import {Page} from "../../model";



interface Tender {
  id: number
  name: string,
  startDate: string,
  endDate: string,
  status: string
}

const rows:Tender[] = [
  { id: 1, name: "Gara 2020", startDate: '2018-12-17T03:24:00', endDate: "2020-12-17T03:24:00", status: "ENDED" },
  { id: 2, name: "Gara 2022", startDate: '2020-12-17T03:24:00', endDate: "2022-12-17T03:24:00", status: "ENDED" },
  { id: 3, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 4, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 5, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 6, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 7, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 8, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 9, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
  { id: 10, name: "Gara 2023", startDate: '2022-12-17T03:24:00', endDate: "2024-12-17T03:24:00", status: "IN_PROGRESS" },
];


const response : Page<Tender> = {
  page: 0,
  size: 10,
  total: 100,
  content: rows
}


export default function TenderPage({ email }: any){

  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Gare dei recapitisti
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
            <Grid item container justifyContent="right">
              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                Aggiungi
              </Button>
            </Grid>
            <PaginationDataGrid <Tender> data={response} type={ModelType.TENDER} />
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}