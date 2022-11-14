import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button, Tooltip, InputAdornment, OutlinedInput, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type Props = { isCreate:boolean };

const AggregationDetailForm = ({isCreate} : Props) => {

    const emptyValues = {
        aggregationName: "",
        aggregationDescription: "",
        usagePlan: "",
        quota: "",
        rate: "",
        burst: ""
    };

    const validationSchema = yup.object({
        aggregationName: yup.string(),
        aggregationDescription: yup.string(),
        AWSApiKey: yup.string(),
        usagePlan: yup.string()
    });

    const initialValues = (aggregation:any) => {
        if(!aggregation)
            return emptyValues;
        
        return {
            aggregationName: aggregation.aggregationName,
            aggregationDescription: aggregation.aggregationDescription,
            AWSApiKey: aggregation.AWSApiKey,
            usagePlan: aggregation.usagePlan,
            quota: aggregation.quota,
            rate: aggregation.rate,
            burst: aggregation.burst
        }
    }

    const mockAggregation = {
        aggregationName: "Comuni Lombardia",
        aggregationDescription: "Aggregazione dei comuni della regione Lombardia",
        usagePlan: "Medium",
        quota: 5000,
        rate: 1000,
        burst: 300
    }

    const formik = useFormik({
        initialValues: initialValues(isCreate ? null : mockAggregation),
        validationSchema,
        /** onSubmit populates filters */
        onSubmit: (values: any) => {
          
        },
    });

    const usagePlanList = [
        {
            name: "Small",
            quota: 1000,
            rate: 100,
            burst: 30
        },
        {
            name: "Medium",
            quota: 5000,
            rate: 1000,
            burst: 300
        },
        {
            name: "Large",
            quota: 10000,
            rate: 2000,
            burst: 600
        }
    ]

    const handleChangeUsagePlan = async (evt:any) => {
        const {value, name} = evt.target;
        let indexUsagePlan = usagePlanList.findIndex(item => item.name === value);

        await formik.setFieldValue("quota", usagePlanList[indexUsagePlan].quota);
        await formik.setFieldValue("burst", usagePlanList[indexUsagePlan].burst);
        await formik.setFieldValue("rate", usagePlanList[indexUsagePlan].rate);
        await formik.setFieldValue(name, value);
    }

    const CreateButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        disabled={!formik.isValid}
    >
        Crea
    </Button>

    const UpdateButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        disabled={!formik.isValid}
    >
        Salva
    </Button>

    const DeleteButton = <Button
        variant="outlined"
        type="submit"
        size="small"
        color="error"
        disabled={!formik.isValid}
    >
        Elimina
    </Button>

    const IconWithTooltip = ({title} : any) => (
        <Tooltip title={title}>
            <HelpOutlineIcon  />
        </Tooltip>
    );
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing="2" direction="column">
                <Grid container item spacing="3">
                    <Grid item xs={4}>
                        <TextField
                            id="aggregationName"
                            value={formik.values.aggregationName}
                            onChange={formik.handleChange}
                            label={"Nome aggregazione"}
                            name="aggregationName"
                            error={formik.touched.aggregationName && Boolean(formik.errors.aggregationName)}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id="aggregationDescription"
                            value={formik.values.aggregationDescription}
                            onChange={formik.handleChange}
                            label={"Descrizione aggregazione"}
                            name="aggregationDescription"
                            error={formik.touched.aggregationDescription && Boolean(formik.errors.aggregationDescription)}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="usage-plan-label">Usage plan</InputLabel>
                            <Select
                                labelId="usage-plan-label"
                                id="usagePlan"
                                name="usagePlan"
                                value={formik.values.usagePlan}
                                label="Usage plan"
                                onChange={(evt) => handleChangeUsagePlan(evt)}
                                size="small"
                            >
                                {usagePlanList.map((item, index) => {
                                    return <MenuItem key={`${item.name}-${index}`} value={item.name}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="quota">Quota</InputLabel>

                            <OutlinedInput
                                id="quota"
                                value={formik.values.quota}
                                onChange={formik.handleChange}
                                label="Quota"
                                name="quota"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse al mese" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="rate">Rate</InputLabel>

                            <OutlinedInput
                                id="rate"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                                label="Rate"
                                name="rate"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse al secondo" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="burst">Burst</InputLabel>

                            <OutlinedInput
                                id="burst"
                                value={formik.values.burst}
                                onChange={formik.handleChange}
                                label="Burst"
                                name="burst"
                                fullWidth
                                size="small"
                                disabled={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconWithTooltip title="Numero di richieste permesse in concorrenza" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item spacing={1}>
                    {isCreate ? (
                        <Grid item>
                            {CreateButton}
                        </Grid>
                    ) : (
                        <>
                            <Grid item>
                                {UpdateButton}
                            </Grid>
                            <Grid item>
                                {DeleteButton}
                            </Grid>
                        </>
                    )}
                    
                </Grid>
            </Grid>
            
            
        </form>
    )
}

export default AggregationDetailForm;
