import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    TextField, Grid,
} from "@material-ui/core";
import {Stack} from "@mui/material";

interface Tender{
    nameRace: string,
    startDate: string,
    endDate: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            "& > *": {
                margin: theme.spacing(2),
            },
            flexGrow: 1
        },
        textField: {
            // padding: 5,
        }
    })
);

export default function TenderBox() {
    const [nameRace, setNameRace] = React.useState('id');
    const [startDate, setStartDate] = React.useState('dd/mm/yyyy');
    const [endDate, setEndDate] = React.useState('dd/mm/yyyy');

    const classes = useStyles();
    return (
        <>
            <Box className={classes.root}>
                <Card>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div">
                            Informazione sulla Gara
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/*
                        <Stack spacing={2}>
                            <Stack direction="row">
                                <TextField
                                    id="idNameRace"
                                    label="Identificativo"
                                    margin="dense"
                                    variant="outlined"
                                    required={true}
                                    value={nameRace}
                                    onChange={(e) => setNameRace(e.target.value)}
                                    error={!nameRace}
                                    helperText={!nameRace ? 'Id obbligatorio' : ''}
                                />
                            </Stack>
                            <Stack direction="row" spacing={3}>
                                <TextField
                                    id="idStartDate"
                                    label="Data inizio"
                                    type="date"
                                    margin="dense"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true
                                    }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    error={!startDate}
                                    helperText={!startDate ? 'Data obbligatoria' : ''}
                                />
                                <TextField
                                    id="idEndDate"
                                    label="Data fine"
                                    type="date"
                                    margin="dense"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true
                                    }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    error={!endDate}
                                    helperText={!endDate ? 'Data obbligatoria' : ''}
                                />
                            </Stack>
                        </Stack>
*/}
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <TextField
                                    id="idNameRace"
                                    label="Identificativo"
                                    margin="dense"
                                    variant="outlined"
                                    required={true}
                                    value={nameRace}
                                    onChange={(e) => setNameRace(e.target.value)}
                                    error={!nameRace}
                                    helperText={!nameRace ? 'Id obbligatorio' : ''}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    id="idStartDate"
                                    label="Data inizio"
                                    type="date"
                                    margin="dense"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true
                                    }}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    error={!startDate}
                                    helperText={!startDate ? 'Data obbligatoria' : ''}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    id="idEndDate"
                                    label="Data fine"
                                    type="date"
                                    margin="dense"
                                    variant="outlined"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true
                                    }}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    error={!endDate}
                                    helperText={!endDate ? 'Data obbligatoria' : ''}
                                />
                            </Grid>
                        </Grid>

                    </CardActions>
                </Card>
            </Box>
        </>
    );
}