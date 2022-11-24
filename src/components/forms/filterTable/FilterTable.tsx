import { useEffect } from 'react' 
import { FormField, FieldsProps } from '../../formFields/FormFields';
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, FormHelperText } from "@mui/material";

type Props = {
    fields: Array<FieldsProps>,
    onFiltersSubmit: (data: any) => void
};

const FilterTable = ({fields, onFiltersSubmit} : Props) => {

    const setDefaultValues = () : {[key: string]: any} => {
        return fields.reduce((res, f) => ({...res, [f.name] : ""}), {});
    }

    const { handleSubmit, control, formState: { errors, isDirty }, reset } = useForm({
        defaultValues: setDefaultValues(),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const onSubmit = (data: any) => {
        onFiltersSubmit(data);
    }

    const clearFilters = () => {
        onFiltersSubmit(setDefaultValues());
        reset(setDefaultValues());
    };

    const isFilterApplied = isDirty;

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
                            onClick={clearFilters}
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