import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "./styles";
import { useFormState } from "react-final-form";
import { TextInputOrigin } from "./text-input";
import { formatTimeInput } from "../../index";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& span.empty": {
      color: "var(--secondary-color-default)",
    },
    "& img": {
      width: "100%",
    },
  },
});

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "duration":
        return values[props.source] ? (
          formatTimeInput(values[props.source])
        ) : (
          <span className="empty">Not filled in</span>
        );
      default:
        return values[props.source] ? (
          <div dangerouslySetInnerHTML={{ __html: values[props.source] }} />
        ) : (
          <span className="empty">Not filled in</span>
        );
    }
  };

  return (
    <div className={classes.TextInputStyles}>
      <label>{props.label}</label>
      <div className={classes.TextInputShowValue}>
        <p>{getValue(props.source)}</p>
      </div>
    </div>
  );
};

export const TextInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={props.ComponentInput ?? TextInputOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
