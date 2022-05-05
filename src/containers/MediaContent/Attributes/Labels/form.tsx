import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { FormProps } from "../../../../types";
import { requiredValidate, TextInput } from "../../../../components/Inputs";
import { ColorPickerInput } from "../../../../components/Inputs/color-picker-input";

const useStyles = makeStyles({
  LabelExample: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 4,
    margin: "8px 0",
    "& span": {
      fontSize: 16,
    },
  },
});

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  const classes = useStyles();
  const { values } = useFormState();

  return (
    <>
      <TextInput
        resource={resource}
        inputType={type}
        label="Type of the label"
        validate={requiredValidate}
        source="labelType"
        helperText="Type of the label"
        fullWidth
      />
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Text on the label"
        source="name"
        fullWidth
        helperText="The name of the label that users will see in any sections of the application"
      />
      <ColorPickerInput
        inputType={type}
        label="Text color"
        source="textColor"
        errorSource="bgColor"
      />
      <ColorPickerInput
        inputType={type}
        label="Background color"
        source="bgColor"
        errorSource="textColor"
      />
      <div
        style={{
          backgroundColor: values.bgColor,
          border: !values.bgColor ? "1px dashed var(--secondary-color-default)" : "",
        }}
        className={classes.LabelExample}
      >
        <span style={{ color: values.textColor }}>Label text</span>
      </div>
    </>
  );
};
