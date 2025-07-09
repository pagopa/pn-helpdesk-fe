import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldsProps } from '../formFields/FormFields';

type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * value of the field if there is any
   */
  keySelected: string;
  /**
   * function handling the change of the field
   */
  onChange: any;
};

export interface OptionCustom {
  key: string;
  label: string;
}

export default function SelectCustomField(props: Props) {
  const { field, keySelected, onChange } = props;

  return (
    <FormControl sx={{ minWidth: 250, width: field.size ? '100%' : 250 }}>
      <InputLabel id={field.label}>{field.label}</InputLabel>
      <Select
        labelId={field.label}
        id={field.label}
        data-testid={field.name + '-select-custom'}
        label={field.label}
        onChange={onChange}
        defaultValue={keySelected ?? ''}
        value={keySelected ?? ''}
      >
        {field.optionItems?.map((item) => (
          <MenuItem id={item.label} key={item.key} value={item.key}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
