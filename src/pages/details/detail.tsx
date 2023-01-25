import MainLayout from "../mainLayout/MainLayout";
import React from "react";
import {Box,Card, Container, Grid, Typography, Chip} from "@mui/material";

export function TenderDetailPage({email}:any) {

    return <MainLayout email={email}>
        <Container>
            <Grid container direction="row" rowSpacing={3}>
                <Grid item container>
                    <Box>
                        <Typography variant="h4" color="text.primary">
                           Nome gara
                        </Typography>
                    </Box>

                </Grid>
                <Grid item container direction="row" justifyContent="space-between">
                    <Card
                        elevation={24}
                        sx={{
                        width: 1,
                            padding: "2rem",
                            boxShadow: "0px 3px 3px -2px ",
                            backgroundColor: "background.paper",
                        }}
                        >
                        <Grid item container>
                            <Typography variant="h6">
                                Informazioni
                            </Typography>
                        </Grid>
                        <Grid item container width="1"  >
                            <Grid item container direction="row" width="1"  >
                                <Grid item width="50%" >
                                    <Typography>
                                        Identificativo
                                    </Typography>
                                </Grid>
                                <Grid item width="50%"><Typography>
                                    Gara 2023
                                </Typography></Grid>
                            </Grid>
                            <Grid item container direction="row" >
                                <Grid item width="50%" >
                                    <Typography>
                                        Data inizio
                                    </Typography>
                                </Grid>
                                <Grid item width="50%">
                                    <Typography>25-01-2023</Typography>
                                </Grid>
                            </Grid>
                            <Grid item container direction="row" >
                                <Grid item width="50%" >
                                    <Typography>
                                       Data fine
                                    </Typography>
                                </Grid>
                                <Grid item width="50%"><Typography>
                                    25-01-2023
                                </Typography></Grid>
                            </Grid>
                            <Grid item container direction="row" >
                                <Grid item width="50%" >
                                    <Typography>
                                        Stato
                                    </Typography>
                                </Grid>
                                <Grid item width="50%">
                                    <Chip label="IN CORSO"/>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Card>



                </Grid>
                <Grid item container direction="row" justifyContent="space-between">
                    <Card
                        elevation={24}
                        sx={{
                        width: 1,
                            padding: "2rem",
                            boxShadow: "0px 3px 3px -2px ",
                            backgroundColor: "background.paper",
                        }}>
                        <Grid item container>
                            <Box>
                                <Typography variant="h4" color="text.primary">
                                    Dettaglio gara
                                </Typography>
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    </MainLayout>

}
