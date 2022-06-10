import * as React from "react";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../types";
import { NumberInput, requiredValidate, RichTextInput } from "../../../components/Inputs";
import { RadioButtonGroupInput } from "../../../components/Inputs/RadioButtonGroupInput";
import { PUBLISHED_CHOICES_FORM } from "../../../constants/forms-constants";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Question"
        source="questionTemplate"
        validate={requiredValidate}
      />
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Answer"
        source="answerTemplate"
        validate={requiredValidate}
      />
      <NumberInput
        source="position"
        label="Position"
        resource={resource}
        inputType={type}
        helperText="Position"
      />
      <RadioButtonGroupInput
        source="published"
        label="Publishing"
        initialValue={false}
        inputType={type}
        choices={PUBLISHED_CHOICES_FORM}
      />
      <ScrollTopButton />
    </>
  );
};
