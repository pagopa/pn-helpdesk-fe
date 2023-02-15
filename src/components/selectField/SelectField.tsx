import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FieldsProps } from "../formFields/FormFields";

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * value of the field if there is any
   */
  value: string;
  /**
   * function handling the change of the field
   */
  onChange: any;
};

const SelectField = (props: Props) => {
  const { field, value, onChange } = props;

  return (
    <FormControl sx={{ minWidth: 250, width: (field.size) ? "100%" : 250 }}>
      <InputLabel id={field.label}>{field.label}</InputLabel>
      <Select
        data-testid={`select-${field.name}`}
        labelId={field.label}
        id={field.label}
        label={field.label}
        onChange={onChange}
        value={value}
      >
        {
          (field.label !== "Tipo Estrazione") && (<MenuItem key="none" value=""></MenuItem>)
        }
        {field.selectItems?.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
