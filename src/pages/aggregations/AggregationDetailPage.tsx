import React from "react";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregation/AggregationDetailForm";
import { CardContent, Box, Grid, Typography } from "@mui/material";

/**
 * AggregationDetail page
 * @component
 */
const AggregationDetailPage = ({email}: any) => {
    const { aggregateId } = useParams();
    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Typography gutterBottom variant="h5" component="div">
                    Dettaglio Aggregazione {aggregateId}
                </Typography>
                <AggregationDetailForm />
            </Box>
        </MainLayout>
    );
}
export default AggregationDetailPage;