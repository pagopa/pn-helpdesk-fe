import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const AggregationDetailForm = () => {

    const emptyValues = {
        aggregationName: "",
        aggregationDescription: "",
        AWSApiKey: "",
        usagePlan: "",
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
        }
    }
    const formik = useFormik({
        initialValues: initialValues(null),
        validationSchema,
        /** onSubmit populates filters */
        onSubmit: (values: any) => {
          
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container direction={"column"} spacing="2">
                <Grid item xs={4} lg={4} xl={4}>
                    <TextField
                        id="aggregationName"
                        value={formik.values.aggregationName}
                        onChange={formik.handleChange}
                        label={"Nome aggregazione"}
                        name="aggregationName"
                        error={formik.touched.aggregationName && Boolean(formik.errors.aggregationName)}
                        fullWidth
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
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="usage-plan-label">Usage plan</InputLabel>
                        <Select
                            labelId="usage-plan-label"
                            id="usagePlan"
                            name="usagePlan"
                            value={formik.values.usagePlan}
                            label="Usage plan"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"low"}>Low</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"high"}>High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
        </form>
    )
}

export default AggregationDetailForm;
