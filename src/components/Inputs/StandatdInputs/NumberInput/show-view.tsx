import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import { TextInputStyles } from "../TextInput/styles";
import { NumberInputOrigin } from "./numdber-input";
import { formatTimeInput } from "../../index";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& span.empty": {
      color: "#9FA5A8",
    },
  },
});

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "storageTime":
        return values[props.source] ? (
          values[props.source] + " days"
        ) : (
          <span className="empty">Not filled in</span>
        );
      default:
        return values[props.source] ? (
          values[props.source]
        ) : (
          <span className="empty">Not filled in</span>
        );
    }
  };

  return (
    <div className={classes.TextInputStyles}>
      <label>{props.label}</label>
      <div className={classes.TextInputShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const NumberInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={NumberInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
