import * as React from "react";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../types";
import {
  NumberInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../components/Inputs";
import { RadioButtonGroupInput } from "../../../components/Inputs/RadioButtonGroupInput";
import { PUBLISHED_CHOICES_FORM } from "../../../constants/forms-constants";
import { AutocompleteArrayFreeSolo } from "../../../components/Inputs/ArrayInputs/AutocompleteFreeSolo";
import { FormSection } from "../../../components/FormSection";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <FormSection text="" title="" formType={type} id="">
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
        <TextInput
          source="section"
          resource={resource}
          inputType={type}
          label="Section"
          fullWidth
        />
        <AutocompleteArrayFreeSolo
          source="tags"
          resource={resource}
          inputType={type}
          label="Tags"
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
