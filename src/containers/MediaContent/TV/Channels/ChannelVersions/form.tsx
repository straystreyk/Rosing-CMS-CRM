import * as React from "react";
import { BooleanInput, ReferenceInput } from "ra-ui-materialui";

import {
  requiredValidate,
  TextInput,
  SelectInput,
  NumberInput,
} from "../../../../../components/Inputs";
import { FormProps } from "../../../../../types";

export const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <TextInput source="name" resource={props.resource} validate={requiredValidate} fullWidth />
      <ReferenceInput label="ChannelID" source="channelId" reference="channels">
        <SelectInput inputType="create" optionText="name" fullWidth />
      </ReferenceInput>
      <NumberInput source="nowWatchingNumber" resource={props.resource} />
      <BooleanInput source="default" resource={props.resource} />
      <BooleanInput source="externalCatchupEnabled" resource={props.resource} />
    </>
  );
};
