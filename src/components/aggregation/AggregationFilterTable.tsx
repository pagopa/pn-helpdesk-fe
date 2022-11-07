import React from 'react';
import { Grid, TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AggregationFilterTable = () => {

    const emptyValues = {
        aggregationName: "",
        usagePlan: ""
    };

    const validationSchema = yup.object({
        aggregationName: yup.string(),
        usagePlan: yup.string()
    });

    const initialValues = (aggregation:any) => {
        if(!aggregation)
            return emptyValues;
        
        return {
            aggregationName: aggregation.aggregationName,
            usagePlan: aggregation.usagePlan
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
        <Grid container spacing="1">
            <Grid item xs={10}>
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
            <Grid item xs={2}>
                <Button
                    variant="outlined"
                    type="submit"
                    size="small"
                    disabled={!formik.isValid}
                >
                    Filtra
                </Button>
                <Button
                    type="submit"
                    size="small"
                    disabled={!formik.isValid}
                >
                    Rimuovi Filtri
                </Button>
            </Grid>
        </Grid>
    );
    
}
export default AggregationFilterTable; 