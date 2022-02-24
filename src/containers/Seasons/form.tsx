import { FC } from 'react';
import { AutocompleteArrayInput, NumberInput, ReferenceInput, SelectInput, TextInput } from 'react-admin';

import { requiredValidate, getYearsChoices } from '../../components/Inputs';
import { SELECT_MARKERS } from '../../constants/forms-constants';
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
        fullWidth
        multiline
        source='description'
        resource={props.resource}
        rows={4}
      />
      <AutocompleteArrayInput
        source='markers'
        helperText='Content UI labels: new - blue, popular - red, free - yellow, featured - green'
        choices={SELECT_MARKERS}
      />
      <NumberInput
        fullWidth
        source='number'
        resource={props.resource}
        validate={requiredValidate}
      />
      <SelectInput
        fullWidth
        source='productionYear'
        resource={props.resource}
        choices={getYearsChoices()}
      />
      <ReferenceInput
        label='Series'
        source='seriesId'
        reference='series'
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