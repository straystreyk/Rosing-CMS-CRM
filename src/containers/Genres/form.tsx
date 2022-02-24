import * as React from "react";

import { FormProps } from "../../types";
import { requiredValidate, TextInput } from "../../components/Inputs";

export const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      <TextInput
        source="name"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        source="slug"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
    </>
  );
};
