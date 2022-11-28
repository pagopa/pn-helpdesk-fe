import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import CreateIcon from '@mui/icons-material/Create';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import apiRequests from "../../api/apiRequests";
import * as routes from '../../navigation/routes';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { useDispatch } from 'react-redux';
import * as snackbarActions from "../../redux/snackbarSlice";
import * as spinnerActions from "../../redux/spinnerSlice";
import CustomCard from '../../components/customCard/CustomCard';
import { CardHeaderType } from '../../components/customCard/types';
import PaTable from "../../components/aggregates/PaTable";
import AggregateForm from "../../components/forms/aggregate/AggregateForm";
import { getAggregateResponse, UsagePlan } from "../../api/apiRequestTypes";

/**
 * AggregateDetail page
 * @component
 */
const AggregateDetailPage = ({ email }: any) => {
    const { idAggregate } = useParams();
    const isCreate = !idAggregate;
    const dispatch = useDispatch();
    const [agg, setAgg]: any = useState(undefined);
    const [pas, setPas]: any = useState([]);
    const [usagePlans, setUsagePlans] = useState<Array<UsagePlan>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        let requestList = [apiRequests.getUsagePlans()];

        if(!isCreate) {
            requestList.push(apiRequests.getAggregateDetails(idAggregate))
            requestList.push(apiRequests.getAssociatedPaList(idAggregate))
        }
        
        dispatch(spinnerActions.updateSpinnerOpened(true));
        Promise.all(requestList)
            .then(responses => {
                setUsagePlans(responses[0].items);
            
                if(!isCreate) {
                    setAgg(responses[1]);
                    setPas(responses[2].items);
                }
            })
            .catch(errors => {
                dispatch(snackbarActions.updateSnackbacrOpened(true));
                dispatch(snackbarActions.updateStatusCode("400"));
                dispatch(snackbarActions.updateMessage(`Errore nel caricamento dei dati`));
                navigate(routes.AGGREGATES);
            })
            .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));

    }, [idAggregate]);

    const handleClickAdd = () => {
        navigate(routes.ADD_PA, { state: { aggregate: {...agg, associatedPa: pas} as getAggregateResponse } });
    };

    const handleClickTransfer = () => {
        navigate(routes.TRANSFER_PA, { state: { agg: { id: idAggregate, name: agg?.name } } });
    };

    const getFormTitle = () => {
        const title = isCreate ? `Crea aggregazione` : `Dettaglio aggregazione`;
        return <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
    }

    const breadcrumbsLinks = [
        {
            linkLabel: 'Gestione Aggregazioni ApiKey',
            linkRoute: routes.AGGREGATES
        }
    ]

    const formCardHeader : CardHeaderType = {
        avatar: <CreateIcon />, 
        title: getFormTitle(),
        sx: { px: 3, pt: 4, pb: 1 }
    };

    const formCardBody = <AggregateForm isCreate={isCreate} agg={agg} usagePlans={usagePlans} />;//<AggregationDetailForm isCreate={isCreate} agg={agg} />;

    const associatedPasCardHeader : CardHeaderType = {
        title: <Typography gutterBottom variant="h5" component="div">
            PA Associate
        </Typography>,
        avatar: <BusinessIcon />,
        action: <>
            <Button
                variant="contained"
                type="submit"
                size="small"
                onClick={handleClickTransfer}
                startIcon={<ArrowRightAltIcon />}
            >
                Trasferisci PA
            </Button>
            <Button
                variant="contained"
                type="submit"
                size="small"
                onClick={handleClickAdd}
                startIcon={<DomainAddIcon />}
                sx={{ ml: 2 }}
            >
                Associa PA
            </Button>
        </>,
        sx: {px: 3, pt: 4, pb: 1}
    }

    const associatedPasCardBody = <PaTable paList={pas} />;

    return (
        <MainLayout email={email}>
            <Box px={3}>
                <Breadcrumbs currentLocationLabel="Dettaglio aggregazione" links={breadcrumbsLinks} />
            </Box>

            <Box px={3} mt={2}>
                <CustomCard 
                    cardId='form-card'
                    cardHeader={formCardHeader}
                    cardBody={formCardBody}
                />
            </Box>

            {!isCreate && <Box px={3} mt={2}>
                <CustomCard
                    cardId='associated-pa-card'
                    cardHeader={associatedPasCardHeader}
                    cardBody={associatedPasCardBody}
                />
            </Box>
            }
        </MainLayout>
    );
}
export default AggregateDetailPage;