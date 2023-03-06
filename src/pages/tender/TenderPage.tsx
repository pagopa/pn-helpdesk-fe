import MainLayout from "../mainLayout/MainLayout";
import React from "react";
import {Box, Button, Card, Container, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {CREATE_TENDER_ROUTE} from "../../navigation/router.const";
import {TenderTable} from "../../components/deliveriesDrivers/TenderTable";



export default function TenderPage({ email= "" }: any){
  const navigate = useNavigate();

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
                data-testid={"button-added-tender"}
                variant="outlined"
                startIcon={<Add />}
                onClick={() => navigate(CREATE_TENDER_ROUTE)}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                Aggiungi
              </Button>
            </Grid>
            <Grid item container>
              <div data-testid={"tenders-table"}>
                <TenderTable/>
              </div>
            </Grid>
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}