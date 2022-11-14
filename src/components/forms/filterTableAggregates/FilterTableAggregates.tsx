import React, { useState, useEffect } from 'react' 
import { FieldsProperties, FormField } from '../../formFields/FormFields';
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, Box, FormHelperText, InputAdornment } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, setFilters } from '../../../redux/aggregateSlice';
import { getAggregateParams } from '../../../api/apiRequestTypes';

const FilterTableAggregates = () => {
    const dispatch = useDispatch();

    const emptyFormValues =  {
        name : ""
    }

    const filters = useSelector(filtersSelector);

    const { handleSubmit, control, formState: { errors }, getValues, reset } = useForm({
        defaultValues: emptyFormValues,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const onSubmit = (data : getAggregateParams) => {
        dispatch(setFilters(data));
    }

    useEffect(() => {
        reset(filters);
    }, [filters.name]);

    const cleanFilters = () => {
        dispatch(setFilters(emptyFormValues));
    };

    const fieldAggregateName = FieldsProperties["Nome aggregazione"];

    const isFilterApplied = filters.name !== "";

    return (
        
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Grid container display={"flex"}>
                <Controller
                    control={control}
                    name={"name"}
                    rules={fieldAggregateName.rules}
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                    }) => (
                        <>
                            <FormField error={error} key={fieldAggregateName.name} field={fieldAggregateName} onChange={onChange} value={value} />
                            <FormHelperText error>
                                {errors["name"] ? errors["name"].message : " "}
                            </FormHelperText>
                        </>
                    )}
                />
                <Grid container item spacing={1}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            type="submit"
                        >
                            Filtra
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={cleanFilters}
                            type="submit"
                            disabled={!isFilterApplied}
                        >
                            Rimuovi Filtri
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
       
    )
}

export default FilterTableAggregates;