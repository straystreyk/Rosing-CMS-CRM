import * as React from "react";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../types";
import { NumberInput, RichTextInput } from "../../../components/Inputs";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Question"
        source="questionTemplate"
        helperText="Text"
      />
      <RichTextInput
        resource={resource}
        inputType={type}
        label="Answer"
        source="answerTemplate"
        helperText="Text"
      />
      <NumberInput
        source="position"
        label="Position"
        resource={resource}
        inputType={type}
        helperText="Position"
      />
      <ScrollTopButton />
    </>
  );
};
