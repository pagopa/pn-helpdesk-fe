import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {FieldsProps} from "../formFields/FormFields";
import {UsageEstimatesAPI} from "../../api/usageEstimates";
import {PaResponse} from "../../model";

const filter = createFilterOptions<string>();


type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  value: PaResponse;
  required: boolean;
  error: boolean;
  onChange: any
}

export function PAAutocompleteField(props:Props){
  const [inputText, setInputText] = useState("");
  const [publicAdministrations, setPublicAdministrations] = useState<PaResponse[]>([]);

  const fetch = useCallback(async ()=>{
    try {
      const response = await UsageEstimatesAPI.autocompletePa(inputText);
      setPublicAdministrations(response);
    }catch(e){
      console.error("Error with all pa request ", e);
    }
  }, [inputText])

  useEffect(() => {
    fetch();
  }, [fetch])

  const handleOnChange = (event: React.SyntheticEvent, value: PaResponse|null) => {
    props.onChange?.(value);
  }


  return <Autocomplete
    id="pa-autocomplete"
    data-testid={"pa-autocomplete"}
    options={publicAdministrations}
    fullWidth={true}
    limitTags={3}
    onInputChange={(event, newInputValue) => {
      // console.log(event, newInputValue)
      setInputText(newInputValue);
    }}
    onChange={handleOnChange}
    getOptionLabel={(option) => option.name}
    renderInput={(params) => (
      <TextField
        {...params}
        data-testid={"input-text-pa-name"}
        label={props.field.label}
        placeholder={props.field.placeholder}
      />
    )}
  />
}