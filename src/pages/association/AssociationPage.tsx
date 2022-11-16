import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregates/AggregateDetailForm";
import { Box, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import ItemsTable from '../../components/table/table';
import { Column, Item, PaColumn } from "../../types";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaAssociation from "../../components/aggregates/PaAssociation";
import AggregateAccordion from '../../components/aggregates/AggregateAccordion';

/**
 * AssociationPage
 * @component
 */
const AssociationPage = ({email}: any) => {
    const { idAggregate } = useParams();

    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/aggregates">
                        Gestione Aggregazioni ApiKey
                    </Link>
                    <Link underline="hover" color="inherit" href={`/aggregate/${idAggregate}`}>
                        Dettaglio Aggregazione
                    </Link>
                    <Typography color="text.primary">Associa PA</Typography>
                </Breadcrumbs>
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
export default AssociationPage;