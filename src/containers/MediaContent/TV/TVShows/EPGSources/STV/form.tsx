import * as React from "react";
import { FormProps } from "../../../../../../types";
import { ScrollTopButton } from "../../../../../../components/UI/Buttons/scroll-top-button";
import { requiredValidate, TextInput } from "../../../../../../components/Inputs";

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      {type !== "create" && <TextInput label="ID" source="id" inputType={type} fullWidth />}
      <TextInput initialValue="stv" label="Type" source="type" inputType={type} fullWidth />
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
      />
      <TextInput resource={resource} inputType={type} label="Url" source="url" fullWidth />
      <ScrollTopButton />
    </>
  );
};
