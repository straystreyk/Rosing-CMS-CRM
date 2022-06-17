import * as React from "react";
import { NumberInput as NumberInputInner } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { NumberInputShow } from "./show-view";
import { InputProps } from "../../input-types";
import { NumberInputStyles } from "./styles";

const useStyles = makeStyles({ NumberInputStyles });

export const NumberInputOrigin: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  return (
    <>
      <NumberInputInner
        {...props}
        fullWidth
        placeholder="Not filled in"
        helperText={props.helperText ?? false}
        className={classes.NumberInputStyles}
      />
    </>
  );
};

export const NumberInput: React.FC<InputProps> = React.memo(({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <NumberInputShow inputType={inputType} {...rest} />
  ) : (
    <NumberInputOrigin inputType={inputType} {...rest} />
  );
});
