import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Grid, Button, FormHelperText } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FormField, FieldsProps } from '../../formFields/FormFields';

type Props = {
  fields: Array<FieldsProps>;
  onFiltersSubmit: (data: any) => void;
  applyFilterText?: string;
};

const FilterTable = memo(({ fields, onFiltersSubmit, applyFilterText = 'Filtra' }: Props) => {
  const setDefaultValues = (): { [key: string]: any } =>
    fields.reduce((res, f) => ({ ...res, [f.name]: '' }), {});

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: setDefaultValues(),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: any) => {
    onFiltersSubmit(data);
  };

  const clearFilters = () => {
    onFiltersSubmit(setDefaultValues());
    reset(setDefaultValues());
  };

  const isFilterApplied = isDirty;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid display={'flex'} justifyContent={'space-between'} gap={'10px'} marginBottom={'20px'}>
        {fields.map((field: FieldsProps) => (
          <Controller
            key={field.name}
            control={control}
            name={field.name}
            rules={field.rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <FormField
                  error={error}
                  key={field.name}
                  field={field}
                  onChange={onChange}
                  value={value}
                />
                <FormHelperText error>
                  {errors[field.name] ? (errors[field.name]?.message as string) : ' '}
                </FormHelperText>
              </>
            )}
          />
        ))}
        <Grid item display={'flex'} gap={'6px'}>
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              style={{ height: '100%', display: 'flex', gap: '10px' }}
              data-testid="apply-filters"
            >
              {applyFilterText} <FilterAltIcon aria-label="applica filtri" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={clearFilters}
              type="submit"
              disabled={!isFilterApplied}
              style={{ height: '100%' }}
              data-testid="clear-filters"
            >
              <FilterAltOffIcon aria-label="rimuovi filtri" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
});

export default FilterTable;
