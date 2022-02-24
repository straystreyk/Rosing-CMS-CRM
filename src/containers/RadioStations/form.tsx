import * as React from "react";
import { ReferenceInput } from "react-admin";

import { FormProps } from "../../types";
import {
  BooleanInput,
  NumberInput,
  requiredValidate,
  TextInput,
  SelectInput,
} from "../../components/Inputs";

export const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <TextInput source="name" resource={props.resource} validate={requiredValidate} fullWidth />
      <TextInput source="description" rows={4} resource={props.resource} fullWidth multiline />
      <TextInput source="number" resource={props.resource} fullWidth />
      <NumberInput source="position" />
      <ReferenceInput label="Stream source" source="streamSourceId" reference="video_files">
        <SelectInput fullWidth optionText="name" />
      </ReferenceInput>
      <BooleanInput source="published" />
    </>
  );
};
