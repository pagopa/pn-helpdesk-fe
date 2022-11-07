import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregation/AggregationDetailForm";
import { CardContent, Card, CardHeader, Box, Typography, Button, Breadcrumbs, Link, Pagination, Grid, IconButton } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ItemsTable from '../../components/table/table';
import { Column, Item, PaColumn } from "../../types";
import CreateIcon from '@mui/icons-material/Create';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

/**
 * AggregationDetail page
 * @component
 */
const AggregationDetailPage = ({email}: any) => {
    const { aggregateId } = useParams();
    const isCreate = !aggregateId;

    const navigate = useNavigate();
    const handleClickAggiungi = () => {
        navigate(`/aggregation/add-pa`);
    };

    const handleClickSposta = () => {
       alert("Da implementare");
    };

    const getFormTitle = () => {
        const title = isCreate ? `Crea aggregazione` : `Dettaglio aggregazione`;
        return <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
    }

    const paList = [
        {
            id: "cx1",
            name: "Comune di Milano"
        },
        {
            id: "cx2",
            name: "Comune di Roma"
        }
    ];

    const columns: Array<Column<PaColumn>> = [
        {
            id: 'name',
            label: 'Nome PA',
            width: '100%',
            getCellLabel(value: string) {
                return value;
            },
            onClick(row: Item) {
                return;
            },
        }
    ];

    const rows: Array<Item> = paList.map((n, i) => ({
        ...n,
        id: n.name + i.toString(),
    }));

    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/aggregations">
                        Gestione Aggregazioni ApiKey
                    </Link>
                    <Typography color="text.primary">Dettaglio aggregazione</Typography>
                </Breadcrumbs>
            </Box>

            <Box px={3} mt={2}>
                <Card>
                    <CardHeader sx={{ px: 3, pt: 4, pb: 1 }} avatar={<CreateIcon />} title={getFormTitle()} />
                    <CardContent>
                        <AggregationDetailForm isCreate={isCreate} />
                    </CardContent>
                </Card>
            </Box>

            {!isCreate && <Box px={3} mt={2}>
                <Card>
                    <CardHeader 
                        sx={{ px: 3, pt: 4, pb: 1 }} 
                        avatar={<BusinessIcon />} 
                        title={
                            <Typography gutterBottom variant="h5" component="div">
                                PA Associate
                            </Typography>
                        } 
                        action={
                            <Grid container> 
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        size="small"
                                        onClick={handleClickSposta}
                                        startIcon={<ArrowRightAltIcon />}
                                    >
                                        Sposta PA
                                    </Button>
                                </Grid>
                                <Grid item ml={2}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        size="small"
                                        onClick={handleClickAggiungi}
                                        startIcon={<DomainAddIcon />}
                                    >
                                        Associa PA
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        }
                    />
                    <CardContent>
                        <ItemsTable columns={columns} rows={rows} />
                        <Pagination count={1} />
                    </CardContent>
                </Card>
            </Box>
            }
        </MainLayout>
    );
}
export default AggregationDetailPage;