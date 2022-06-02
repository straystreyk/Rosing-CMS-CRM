import { FC } from "react";

import {
  TextInput,
  requiredValidate,
  BooleanInput,
  NumberInput,
  formatFromArrayOfString,
  parseToArrayOfString,
} from "../../components/Inputs";

import { FormProps } from "../../types";

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <TextInput
        source="questionTemplate"
        label="Question"
        resource={props.resource}
        validate={requiredValidate}
        rows={4}
        fullWidth
        multiline
      />
      <TextInput
        source="answerTemplate"
        label="Answer"
        resource={props.resource}
        validate={requiredValidate}
        rows={4}
        fullWidth
        multiline
      />
      <TextInput source="section" resource={props.resource} fullWidth />
      <NumberInput inputType={props.type} source="position" resource={props.resource} />
      <TextInput
        source="tags"
        resource={props.resource}
        fullWidth
        helperText="example: tag1, tag2, tag3 "
        format={formatFromArrayOfString}
        parse={parseToArrayOfString}
      />
      <BooleanInput source="published" />
    </>
  );
};

export default Form;
