import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregation/AggregationDetailForm";
import { CardContent, Card, CardHeader, Box, Grid, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import ItemsTable from '../../components/table/table';
import { Column, Item, PaColumn } from "../../types";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaAssociation from "../../components/aggregation/PaAssociation";

/**
 * AssociationPage
 * @component
 */
const AssociationPage = ({email}: any) => {
    return (
        <MainLayout email={email}>
            <PaAssociation />
        </MainLayout>
    )
}
export default AssociationPage;