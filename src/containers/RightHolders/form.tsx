import { TextInput, requiredValidate } from '../../components/Inputs';
import { FormProps } from '../../types';


export const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <TextInput
        fullWidth
        source='name'
        resource={props.resource}
        validate={requiredValidate}
      />
    </>
  );
};

export default Form;
