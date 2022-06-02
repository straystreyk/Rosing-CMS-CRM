import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { SwitchInputOrigin } from "./index";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";
import { TextInputShowValue } from "../styles";
import { useFormState } from "react-final-form";
import { ShowInputViewProps } from "../input-types";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue,
});

const ShowView: React.FC<ShowInputViewProps> = ({ label, source }) => {
  const classes = useStyles();
  const { values } = useFormState();

  return (
    <div className={classes.TextInputStyles}>
      <label>{label}</label>
      <div className={classes.TextInputShowValue}>{values[source] ? "Allowed" : "Disallowed"}</div>
    </div>
  );
};

export const SwitchInputShow: React.FC = (props) => {
  return (
    <EditInputComponent ComponentInput={SwitchInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
