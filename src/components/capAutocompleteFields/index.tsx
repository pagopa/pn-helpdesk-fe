import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import React from "react";
import {FieldsProps} from "../formFields/FormFields";

const cap : string[] = [
  "21048",
  "21034",
  "12231",
  "22233",
  "22222",
  "33333",
  "11111",
]

const filter = createFilterOptions<string>();


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


  const handleOnChange = (event: React.SyntheticEvent, value: string[]) => {
    props.onChange?.(value);
  }


  return <Autocomplete
    multiple
    id="tags-outlined"
    options={cap}
    value={props.value}
    fullWidth={true}
    limitTags={3}
    onChange={handleOnChange}
    getOptionLabel={(option) => option}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);

      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option);
      if (inputValue !== '' && !isExisting) {
        filtered.push(inputValue);
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