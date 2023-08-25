import { FormControlLabel, FormControl, Radio, RadioGroup } from '@mui/material';
import { FieldsProps } from '../formFields/FormFields';

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * function handling the change of the field
   */
  onChange: any;
  /**
   * value of the field if there is any
   */
  value: any;
};

/**
 * Generating group of radio buttons with specific properties
 * @component
 * @param {Props} props
 */
const RadioButtonsGroup = (props: Props) => {
  const { options, name } = props.field;

  return (
    <FormControl>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" value={props.value} name={name}>
        {options!.map((option) => (
          <FormControlLabel
            key={option.option}
            onChange={props.onChange}
            value={option.value}
            control={<Radio />}
            label={option.option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
