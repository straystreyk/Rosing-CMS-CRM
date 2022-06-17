import * as React from "react";
import { TextInput as TextInputInner } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { TextInputShow } from "./show-view";
import { TextInputStyles } from "./styles";
import { InputProps } from "../../input-types";

const useStyles = makeStyles({ TextInputStyles });

export const TextInputOrigin: React.FC<Omit<InputProps, "resource">> = ({
  inputType,
  source,
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      <TextInputInner
        {...props}
        source={source}
        fullWidth={props.fullWidth ?? false}
        helperText={props.helperText ?? false}
        resettable={props.resettable ?? true}
        className={classes.TextInputStyles}
        disabled={(inputType !== "create" && props.source === "slug") || props.disabled}
      />
    </>
  );
};

export const TextInput: React.FC<InputProps> = React.memo(({ inputType, offFastEdit, ...rest }) => {
  return inputType === "show" ? (
    <TextInputShow inputType={inputType} offFastEdit={offFastEdit} {...rest} />
  ) : (
    <TextInputOrigin inputType={inputType} {...rest} />
  );
});
