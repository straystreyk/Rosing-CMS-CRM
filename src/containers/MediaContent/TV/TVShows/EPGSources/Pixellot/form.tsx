import * as React from "react";
import { FormProps } from "../../../../../../types";
import { ScrollTopButton } from "../../../../../../components/UI/Buttons/scroll-top-button";
import { NumberInput, requiredValidate, TextInput } from "../../../../../../components/Inputs";
import { ShowEpgInfo } from "../show-epg-info";

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      {type !== "create" && (
        <TextInput offFastEdit label="ID" source="id" inputType={type} fullWidth />
      )}
      <TextInput
        style={{ display: "none" }}
        initialValue="Pixellot"
        label="Type"
        source="type"
        inputType={type}
        offFastEdit
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
      <NumberInput
        source="importFrequency"
        label="Import frequency"
        resource={resource}
        inputType={type}
        helperText="EPG source import frequency in minutes. Min value 15 minutes max 1200 minutes. E.g. if value selected 15 that's means EPG source will be importing every 15 minutes"
      />
      {type === "show" && <ShowEpgInfo inputType={type} />}
      <ScrollTopButton />
    </>
  );
};
