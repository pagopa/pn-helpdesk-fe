import MainLayout from "../mainLayout/MainLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Card, Container, Grid, Typography, Chip} from "@mui/material";
import {Add} from "@mui/icons-material";
import {ModelType, PaginationDataGrid} from "../../components/paginationGrid";
import {FilterRequest} from "../../model";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {getTenders} from "../../redux/tender/actions";
import {TenderDTO} from "../../generated";
import {useNavigate} from "react-router-dom";
import {CREATE_TENDER_ROUTE} from "../../navigation/router.const";

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
                                <Grid item size="50%"><Typography>
                                    25-01-2023
                                </Typography></Grid>
                            </Grid>
                            <Grid item container direction="row" >
                                <Grid item width="50%" >
                                    <Typography>
                                       Data fine
                                    </Typography>
                                </Grid>
                                <Grid item size="50%"><Typography>
                                    25-01-2023
                                </Typography></Grid>
                            </Grid>
                            <Grid item container direction="row" >
                                <Grid item width="50%" >
                                    <Typography>
                                        Stato
                                    </Typography>
                                </Grid>
                                <Grid item size="50%">
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
                        }}
                        >

                    </Card>
                    </Grid>
            </Grid>
        </Container>
    </MainLayout>

}
