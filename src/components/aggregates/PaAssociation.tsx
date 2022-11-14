import React, { useEffect, useState } from 'react';
import { CardContent, Card, CardHeader, Button, Grid, Typography, Box, Badge, Breadcrumbs, Link, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import PaList from "./PaList";
import PaTable from "./PaTable";
import PaFilterTable from './PaFilterTable';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    useEffect(() => {
        console.log("Render")
    },[handleSelection]);
    
    return (
            <>
            <Box px={2}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/aggregates">
                        Gestione Aggregazioni ApiKey
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/aggregate/1-a"
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
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography variant="h6" component="div">
                                    Riepilogo Aggregazione
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container direction={"column"} spacing={1}>
                                    <Grid item>
                                        <strong>Nome aggregazione:</strong>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Comuni Lombardia</Typography>
                                    </Grid>
                                    <Grid item>
                                        <strong>Descrizione aggregazione:</strong>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Aggregazione dei comuni della regione Lombardia</Typography>
                                    </Grid>
                                    <Grid item>
                                        <strong>Usage plan:</strong>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Medium</Typography>
                                    </Grid>
                                    <Grid item>
                                        <strong>PA Associate:</strong>
                                    </Grid>
                                    <Grid item>
                                        <PaList paList={[{id:"cx100", name:"Comune di Como"}, {id:"cx101", name:"Comune di Bergamo"}]} handleSelection={undefined} />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{marginTop:1}}>
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