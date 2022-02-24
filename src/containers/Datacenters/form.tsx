import { FC } from 'react';
import { Box } from '@material-ui/core';

import { TextInput, requiredValidate } from '../../components/Inputs';
import { FormProps } from '../../types';


export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <Box display={{ md: 'block', lg: 'flex' }}>
        <Box flex={1} mr={{ xs: 0, lg: '0.5em' }}>
          <TextInput
            source='uid'
            resource={props.resource}
            validate={requiredValidate}
            fullWidth
          />
        </Box>
        <Box flex={1} ml={{ xs: 0, lg: '0.5em' }}>
          <TextInput
            source='name'
            resource={props.resource}
            validate={requiredValidate}
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
};

export default Form;
