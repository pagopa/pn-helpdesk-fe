import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {FieldsProps} from "../formFields/FormFields";
import {retrieveCaps} from "../../api/paperChannelApi";

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
  const [inputText, setInputText] = useState("");
  const [cap, setCap] = useState<string[]>([]);

  const fetch = useCallback(async ()=>{
    try {
      const response = await retrieveCaps(inputText);
      if (props.field.fsu) {
        setCap(["99999", ...response.content.map(item => item.cap)])
      } else {
        setCap(response.content.map(item => item.cap))
      }
    }catch(e){
      console.error("Error with caps request ", e);
    }
  }, [inputText])

  useEffect(() => {
    fetch();
  }, [fetch])

  const handleOnChange = (event: React.SyntheticEvent, value: string[]) => {
    props.onChange?.(value);
  }


  return <Autocomplete
    multiple
    id="caps-autocomplete"
    data-testid={"caps-autocomplete"}
    options={cap}
    value={props.value}
    fullWidth={true}
    limitTags={3}
    onInputChange={(event, newInputValue) => {
      console.log(event, newInputValue)
      setInputText(newInputValue);
    }}
    onChange={handleOnChange}
    getOptionLabel={(option) => option}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);

      const { inputValue } = params;
      // Suggest the creation of a new value
      if (inputValue === "99999" && !props.field.fsu) return filtered;

      const isExisting = options.some((option) => inputValue === option);
      if (inputValue !== '' && !isExisting) {
        filtered.push(inputValue);
      }

      return filtered;
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        data-testid={"input-text-cap"}
        label={props.field.label}
        placeholder={props.field.placeholder}
      />
    )}
  />
}