import * as React from "react";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../types";
import { NumberInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { FormSection } from "../../../../components/FormSection";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <FormSection formType={type}>
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          helperText="hint"
          fullWidth
        />
        <NumberInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Position"
          source="position"
          helperText="hint"
          fullWidth
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
