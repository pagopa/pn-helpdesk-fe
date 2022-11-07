import React, { useState } from 'react';
import { CardContent, Card, CardHeader, Button, Grid, Typography, Box, Badge, Breadcrumbs, Link } from "@mui/material";
import PaList from "./PaList";
import PaTable from "./PaTable";
import PaFilterTable from './PaFilterTable';
import BusinessIcon from '@mui/icons-material/Business';

const PaAssociation = () => {
    const [paList, setPaList] = useState([
        {
            id: "cx1",
            name: "Comune di Milano"
        },
        {
            id: "cx2",
            name: "Comune di Roma"
        },
        {
            id: "cx3",
            name: "Comune di Napoli"
        },
        {
            id: "cx4",
            name: "Comune di Palermo"
        },
        {
            id: "cx5",
            name: "Comune di Firenze"
        },
        {
            id: "cx6",
            name: "Comune di Bologna"
        }
    ]);

    const [paSelectedList, setPaSelectedList] = useState<Array<any>>([]);

    const handleSelection = (pa: any, selected: boolean) => {
        let indexPa = paSelectedList.findIndex((item) => item.id === pa.id);
        let selectedPaListCopy = [...paSelectedList];
        
        if(selected)
            selectedPaListCopy.push(pa);
        else
            selectedPaListCopy.splice(indexPa,1);

            setPaSelectedList(selectedPaListCopy);
    }
    
    return (
            <>
            <Box px={2}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/aggregations">
                        Gestione Aggregazioni ApiKey
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/aggregation/1-a"
                    >
                        Dettaglio aggregazione
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
                    <Grid item xs={3}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Badge color="primary" badgeContent={paSelectedList.length}>
                                        <BusinessIcon />
                                    </Badge>
                                }
                                title={
                                    <Typography variant="h6" component="div">
                                         PA Selezionate
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <PaList paList={paSelectedList} handleSelection={handleSelection} />
                                
                                {paSelectedList.length !== 0 && <Box mt={2} alignSelf="flex-end">
                                    <Button
                                            variant="outlined"
                                            type="submit"
                                            size="small"
                                        >
                                        Salva
                                    </Button>
                                </Box>
                                }
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Card >
                            <CardHeader
                                title={
                                    <Typography variant="h6" component="div">
                                        Lista PA
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <PaFilterTable />
                                <PaTable paList={paList} paSelectedList={paSelectedList} handleSelection={handleSelection} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            
        </>
        
    );
}
export default PaAssociation;