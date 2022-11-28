import MainLayout from "../mainLayout/MainLayout";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import PaAssociation from "../../components/paAssociation/PaAssociation";
import AggregateAccordion from '../../components/aggregates/AggregateAccordion';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import * as routes from '../../navigation/routes';
import { getAggregateResponse } from "../../api/apiRequestTypes";

/**
 * PaAssociationPage
 * @component
 */
const PaAssociationPage = ({email}: any) => {
    const location : any = useLocation();
    const aggregate = location?.state?.aggregate as getAggregateResponse;
    const breadcrumbsLinks = [
        {
            linkLabel: 'Gestione Aggregazioni ApiKey',
            linkRoute: routes.AGGREGATES
        },
        {
            linkLabel: 'Dettaglio Aggregazione',
            linkRoute: routes.GET_UPDATE_AGGREGATE_PATH(aggregate.id!)
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
                        <AggregateAccordion aggregate={aggregate} />
                    </Grid>
                </Grid>

                <PaAssociation idAggregate={aggregate?.id} />
            </Box>
            
        </MainLayout>
    )
}
export default PaAssociationPage;