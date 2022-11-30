import { memo } from 'react'
import { FormField, FieldsProps } from '../../formFields/FormFields';
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, FormHelperText } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

type Props = {
    fields: Array<FieldsProps>,
    onFiltersSubmit: (data: any) => void
};

const FilterTable = memo(({ fields, onFiltersSubmit }: Props) => {

    const setDefaultValues = (): { [key: string]: any } => {
        return fields.reduce((res, f) => ({ ...res, [f.name]: "" }), {});
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
            <Grid display={"flex"} justifyContent={'space-between'} gap={'10px'} marginBottom={'20px'}>
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
                <Grid item display={'flex'} gap={'10px'}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            type="submit"
                            style={{ height: '100%', display: 'flex', gap: '10px' }}
                        >
                            Filtra <FilterAltIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={clearFilters}
                            type="submit"
                            disabled={!isFilterApplied}
                            style={{ height: '100%' }}
                        >
                            <FilterAltOffIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>

    )
})

export default FilterTable;