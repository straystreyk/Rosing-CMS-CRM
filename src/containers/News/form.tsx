import { FC } from "react";

import {
  TextInput,
  requiredValidate,
  BooleanInput,
  NumberInput,
  formatFromArrayOfString,
  parseToArrayOfString,
  AutocompleteArrayInput,
} from "../../components/Inputs";

import { FormProps } from "../../types";
import { SELECT_MARKERS } from "../../constants/forms-constants";
import * as React from "react";

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <TextInput source="name" resource={props.resource} validate={requiredValidate} />
      <TextInput source="bodyTemplate" resource={props.resource} rows={4} fullWidth multiline />
      <TextInput source="bodyText" resource={props.resource} rows={4} fullWidth multiline />
      <NumberInput source="cmsDistribution" />
      <NumberInput source="compiledDistribution" />
      <AutocompleteArrayInput source="markers" choices={SELECT_MARKERS} />
      <TextInput source="seoDescription" resource={props.resource} rows={4} fullWidth multiline />
      <TextInput source="seoTime" resource={props.resource} fullWidth />
      <BooleanInput source="published" />
    </>
  );
};

export default Form;
