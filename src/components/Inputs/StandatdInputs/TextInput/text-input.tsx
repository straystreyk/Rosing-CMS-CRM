import * as React from "react";
import { TextInput as TextInputInner } from "react-admin";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { TextInputShow } from "./show-view";
import { TextInputStyles } from "./styles";

const useStyles = makeStyles({ TextInputStyles });

interface TextInputProps extends InputProps {
  offFastEdit?: boolean;
}

export const TextInputOrigin: React.FC<InputProps> = ({ inputType, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <TextInputInner
        {...props}
        fullWidth={props.fullWidth ?? false}
        helperText={props.helperText ?? false}
        resettable={props.resettable ?? true}
        className={classes.TextInputStyles}
        disabled={(inputType !== "create" && props.source === "slug") || props.disabled}
      />
    </>
  );
};

export const TextInput: React.FC<TextInputProps> = React.memo(
  ({ inputType, offFastEdit, ...rest }) => {
    return inputType === "show" ? (
      <TextInputShow offFastEdit={offFastEdit} {...rest} />
    ) : (
      <TextInputOrigin inputType={inputType} {...rest} />
    );
  }
);
