import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregates/AggregateDetailForm";
import { Box, Grid, Typography, Link } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import ItemsTable from '../../components/table/table';
import { Column, Item, PaColumn } from "../../types";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaAssociation from "../../components/aggregates/PaAssociation";
import AggregateAccordion from '../../components/aggregates/AggregateAccordion';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import * as routes from '../../navigation/routes';
/**
 * PaAssociationPage
 * @component
 */
const PaAssociationPage = ({email}: any) => {
    const { idAggregate } = useParams();

    const breadcrumbsLinks = [
        {
            linkLabel: 'Gestione Aggregazioni ApiKey',
            linkRoute: routes.AGGREGATES
        },
        {
            linkLabel: 'Dettaglio Aggregazione',
            linkRoute: routes.GET_UPDATE_AGGREGATE_PATH(idAggregate!)
        }
    ]

    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Breadcrumbs currentLocationLabel="Associa PA" links={breadcrumbsLinks} />
            </Box>

            <Box px={2} mt={2}>
                <Grid container>
                    <Typography gutterBottom variant="h5" component="div">
                        Associa PA
                    </Typography>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AggregateAccordion idAggregate={idAggregate} />
                    </Grid>
                </Grid>

                <PaAssociation idAggregate={idAggregate} />
            </Box>
            
        </MainLayout>
    )
}
export default PaAssociationPage;