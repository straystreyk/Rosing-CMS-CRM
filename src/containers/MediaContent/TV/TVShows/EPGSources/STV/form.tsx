import * as React from "react";
import { FormProps } from "../../../../../../types";
import { ScrollTopButton } from "../../../../../../components/UI/Buttons/scroll-top-button";
import { NumberInput, requiredValidate, TextInput } from "../../../../../../components/Inputs";

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      {type !== "create" && <TextInput label="ID" source="id" inputType={type} fullWidth />}
      <TextInput
        style={{ display: "none" }}
        initialValue="STV"
        label="Type"
        source="type"
        inputType={type}
        fullWidth
      />
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
      />
      <TextInput resource={resource} inputType={type} label="Url" source="url" fullWidth />
      <TextInput
        resource={resource}
        inputType={type}
        label="Source channel uid"
        source="sourceChannelUid"
        fullWidth
      />
      <NumberInput
        source="importFrequency"
        label="Import frequency"
        resource={resource}
        inputType={type}
        helperText="EPG source import frequency in minutes. Min value 15 minutes max 1200 minutes. E.g. if value selected 15 that's means EPG source will be importing every 15 minutes"
      />
      <ScrollTopButton />
    </>
  );
};
