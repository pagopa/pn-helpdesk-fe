import { createFilterOptions, FilterOptionsState, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextField, TextFieldVariants } from '@mui/material';
import { Autocomplete } from '@pagopa/mui-italia';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldsProps } from '../formFields/FormFields';
import { retrieveCaps } from '../../api/paperChannelApi';

const filter = createFilterOptions<string>();

type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  value: Array<string>;
  required: boolean;
  error: boolean;
  onChange: any;
};

export function CapAutocompleteField(props: Props) {
  const [inputText, setInputText] = useState('');
  const [cap, setCap] = useState<Array<string>>([]);

  const fetch = useCallback(async () => {
    try {
      const response = await retrieveCaps(inputText);
      if (props.field.fsu) {
        setCap(['99999', ...response.content.map((item) => item.cap)]);
      } else {
        setCap(response.content.map((item) => item.cap));
      }
    } catch (e) {
      console.error('Error with caps request ', e);
    }
  }, [inputText, props.field.fsu]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const handleOnChange = (value: Array<string>) => {
    props.onChange?.(value);
  };

  return (
    <Autocomplete
      multiple
      id="caps-autocomplete"
      data-testid={'caps-autocomplete'}
      options={cap}
      value={props.value}
      onInputChange={(event, newInputValue) => {
        setInputText(newInputValue);
      }}
      onChange={handleOnChange}
      getOptionLabel={(option) => option}
      handleFiltering={(options: any[], params: FilterOptionsState<string>) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        if (inputValue === '99999' && !props.field.fsu) {
          return filtered;
        }

        const isExisting = options.some((option: any) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      renderOption={(value, index) => (
        <TextField
          data-testid={'input-text-cap'}
          label={value}
          placeholder={value}
        />
      )}
    />
  );
}
