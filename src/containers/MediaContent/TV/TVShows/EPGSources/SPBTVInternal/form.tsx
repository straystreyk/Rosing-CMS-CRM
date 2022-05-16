import * as React from "react";
import { FormProps } from "../../../../../../types";
import { ScrollTopButton } from "../../../../../../components/UI/Buttons/scroll-top-button";
import { TextInput } from "../../../../../../components/Inputs";

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  return (
    <>
      {type !== "create" && <TextInput label="ID" source="id" inputType={type} fullWidth />}
      <TextInput initialValue="Spbtv" label="Type" source="type" inputType={type} fullWidth />
      <ScrollTopButton />
    </>
  );
};
