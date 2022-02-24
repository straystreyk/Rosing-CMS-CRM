import { FC } from 'react';
import { NumberInput, ReferenceInput, SelectInput, TextInput } from 'react-admin';

import { requiredValidate, parseTimeInput, formatTimeInput } from '../../components/Inputs';
import { INPUT_LABEL_PROPS } from '../../constants/forms-constants';
import { FormProps } from '../../types';

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <TextInput
        fullWidth
        source='name'
        resource={props.resource}
        validate={requiredValidate}
      />
      <TextInput
        fullWidth
        source='originalName'
        resource={props.resource}
        validate={requiredValidate}
      />
      <TextInput
        fullWidth
        source='slug'
        resource={props.resource}
        validate={requiredValidate}
      />
      <TextInput
        multiline
        fullWidth
        source='description'
        resource={props.resource}
        rows={4}
      />
      <TextInput
        fullWidthx
        source='markers'
        resource={props.resource}
        validate={requiredValidate}
        helperText='Content UI labels: new - blue, popular - red, free - yellow, featured - green'
      />
      <NumberInput
        fullWidth
        source='number'
        resource={props.resource}
        validate={requiredValidate}
      />
      <TextInput
        source='duration'
        resource={props.resource}
        type='time'
        validate={requiredValidate}
        parse={parseTimeInput}
        format={formatTimeInput}
        InputLabelProps={INPUT_LABEL_PROPS}
      />
      <NumberInput
        fullWidth
        source='productionYear'
        resource={props.resource}
        validate={requiredValidate}
      />
      <ReferenceInput
        label='Stream source'
        source='streamSourceId'
        reference='video_files'
      >
        <SelectInput
          fullWidth
          optionText='name'
        />
      </ReferenceInput>
      <ReferenceInput
        label='Seasons'
        source='seasonId'
        reference='seasons'
        validate={requiredValidate}
      >
        <SelectInput
          fullWidth
          optionText='name'
        />
      </ReferenceInput>
    </>
  );
};