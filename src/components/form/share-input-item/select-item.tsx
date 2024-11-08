import { FormItem } from '../form-item';
import { SelectItems } from '../../select/share-select';

export const SelectItem = ({ ...props }): JSX.Element => (
  <FormItem name={props.name} style={props?.style?.formStyle ?? {}}>
    <SelectItems {...props} />
  </FormItem>
);
