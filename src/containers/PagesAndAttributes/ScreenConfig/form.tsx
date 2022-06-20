import * as React from "react";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../types";
import { requiredValidate, TextInput } from "../../../components/Inputs";
import { INPUT_LABEL_PROPS } from "../../../constants/forms-constants";
import { GroupInputsOrigin } from "../../../components/GroupInputs";
import { FormSection } from "../../../components/FormSection";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <FormSection id="" text="" title="" formType={type}>
      {type !== "create" && (
        <TextInput
          resource={resource}
          offFastEdit
          label="ID"
          source="id"
          inputType={type}
          fullWidth
        />
      )}
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name of the screen"
        source="screen"
        fullWidth
        helperText="Hint text or error message"
      />
      <GroupInputsOrigin label="Configurations for cards" inputType={type}></GroupInputsOrigin>
      <ScrollTopButton />
    </FormSection>
  );
};
