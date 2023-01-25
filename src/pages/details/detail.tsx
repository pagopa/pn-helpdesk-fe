import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Box, Card, Container, Grid, Typography} from "@mui/material";

import MainLayout from "../mainLayout/MainLayout";
import React from "react";


export function TenderDetailPage() {

    return <MainLayout >
        <Container>
            <BreadcrumbCustom/>
            <Grid container direction="row" rowSpacing={3}>
                <Grid item container>
                    <Box>
                        <Typography variant="h4" color="text.primary">
                            Dettaglio gara
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
                        }}>
                            <Grid item container>
                            <Box>
                            <Typography variant="h4" color="text.primary">
                            Dettaglio gara
                            </Typography>
                            </Box>
                        </Grid>
                    </Card>

                    <Card
                        elevation={24}
                        column-gap= {20}
                        sx={{
                        width: 1,
                            padding: "5%",
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