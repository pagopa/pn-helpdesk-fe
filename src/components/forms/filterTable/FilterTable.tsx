import React, { useState, useEffect } from 'react' 
import { FieldsProperties, FormField, FieldsProps } from '../../formFields/FormFields';
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, Box, FormHelperText, InputAdornment } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, setFilters } from '../../../redux/aggregateSlice';
import { getAggregateParams } from '../../../api/apiRequestTypes';

const defaultValues : { [key: string]: any } = {
    name: ""
} 

type Props = {
    fields: Array<FieldsProps>,
    onFiltersSubmit: (data: any) => void,
    filters: any
};

const FilterTable = ({fields, onFiltersSubmit, filters} : Props) => {

    const { handleSubmit, control, formState: { errors }, getValues, reset } = useForm({
        defaultValues: defaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const onSubmit = (data: any) => {
        onFiltersSubmit(data);
    }

    useEffect(() => {
        reset(filters);
    }, [filters]);

    const cleanFilters = () => {
        onFiltersSubmit(defaultValues);
    };

    const isFilterApplied = Object.keys(filters).some(key => filters[key]);

    return (
        
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Grid container display={"flex"}>
                {
                    fields.map(
                        (field: FieldsProps) => (
                            <Controller
                                key={field.name}
                                control={control}
                                name={field.name}
                                rules={field.rules}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <>
                                        <FormField error={error} key={field.name} field={field} onChange={onChange} value={value} />
                                        <FormHelperText error>
                                            {errors[field.name] ? errors[field.name].message : " "}
                                        </FormHelperText>
                                    </>
                                )}
                            />
                        )
                    )
                }
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

export default FilterTable;