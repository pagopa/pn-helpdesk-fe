import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import AggregationDetailForm from "../../components/aggregates/AggregateDetailForm";
import { CardContent, Card, CardHeader, Box, Typography, Button, Link, Pagination, Grid, IconButton } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ItemsTable from '../../components/table/table';
import { Column, Item, PaColumn } from "../../types";
import CreateIcon from '@mui/icons-material/Create';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import apiRequests from "../../api/apiRequests";
import * as routes from '../../navigation/routes';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

/**
 * AggregateDetail page
 * @component
 */
const AggregateDetailPage = ({ email }: any) => {
    const { idAggregate } = useParams();
    const isCreate = !idAggregate;
    const [agg, setAgg]: any = useState(undefined)
    const [pas, setPas]: any = useState(undefined)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isCreate) {
            let request = apiRequests.getAggregateDetails(idAggregate)
            if (request) {
                request
                    .then(res => {
                        setAgg(res);
                    })
                    .catch(err => {
                        console.log("Errore: ", err)
                    })
            }
            getAssociatedPas(idAggregate);
        }
    }, []);

    const handleClickAggiungi = () => {
        navigate(routes.GET_ADD_PA_PATH(idAggregate!));
    };

    const handleClickSposta = () => {
        navigate(routes.TRANSFER_PA, { state: { agg: { id: idAggregate, name: agg?.name } } });
    };

    const getFormTitle = () => {
        const title = isCreate ? `Crea aggregazione` : `Dettaglio aggregazione`;
        return <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
    }

    const getAssociatedPas = (idAggregate: string) => {
        let request = apiRequests.getAssociatedPaList(idAggregate)
        if (request) {
            request
                .then(res => {
                    setPas(res.items);
                })
                .catch(err => {
                    console.log("Errore: ", err)
                })
        }
    }

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

    const breadcrumbsLinks = [
        {
            linkLabel: 'Gestione Aggregazioni ApiKey',
            linkRoute: routes.AGGREGATES
        }
    ]

    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Breadcrumbs currentLocationLabel="Dettaglio aggregazione" links={breadcrumbsLinks} />
            </Box>

            <Box px={3} mt={2}>
                <Card>
                    <CardHeader sx={{ px: 3, pt: 4, pb: 1 }} avatar={<CreateIcon />} title={getFormTitle()} />
                    <CardContent>
                        <AggregationDetailForm isCreate={isCreate} agg={agg} />
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
                            <>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                    onClick={handleClickSposta}
                                    startIcon={<ArrowRightAltIcon />}
                                >
                                    Trasferisci PA
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                    onClick={handleClickAggiungi}
                                    startIcon={<DomainAddIcon />}
                                    sx={{ ml: 2 }}
                                >
                                    Associa PA
                                </Button>
                            </>
                        }
                    />
                    <CardContent>
                        <ItemsTable columns={columns} rows={pas || []} />
                        <Pagination count={1} />
                    </CardContent>
                </Card>
            </Box>
            }
        </MainLayout>
    );
}
export default AggregateDetailPage;