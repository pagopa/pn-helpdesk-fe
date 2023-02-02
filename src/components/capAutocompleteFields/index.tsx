import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import React from "react";
import {FieldsProps} from "../formFields/FormFields";

interface Cap {
  value: string
}

const cap : Cap[] = [
  { value:"21048"},
  { value:"21034"},
  { value:"12231"},
  { value:"22233"},
  { value:"22222"},
  { value:"33333"},
  { value:"11111"},
]

const filter = createFilterOptions<Cap>();


type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  value: string[];
  required: boolean;
  error: boolean;
  onChange: any
}

export function CapAutocompleteField(props:Props){


  const handleOnChange = (event: React.SyntheticEvent, value: Cap[]) => {
    console.log(value);
    props.onChange?.(value.map(cap => cap.value));
  }


  return <Autocomplete
    multiple
    id="tags-outlined"
    options={cap}
    fullWidth={true}
    limitTags={3}
    onChange={handleOnChange}
    getOptionLabel={(option) => option.value}
    defaultValue={[cap[2]]}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);

      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option.value);
      if (inputValue !== '' && !isExisting) {
        filtered.push({
          value: `${inputValue}`,
        });
      }

      return filtered;
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label={props.field.label}
        placeholder={props.field.placeholder}
      />
    )}
  />
}