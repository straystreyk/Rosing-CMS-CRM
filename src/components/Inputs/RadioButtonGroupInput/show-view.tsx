import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { RadioButtonGroupInput } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import { labelStyles } from "../styles";
import { useFormState } from "react-final-form";

interface ShowProps {
  label: string;
  source: string;
}

const useStyles = makeStyles({
  Show: {
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& span.empty": {
      color: "var(--secondary-color-default)",
    },
    "& label": { ...labelStyles, marginBottom: 4, display: "inline-block" },
  },
});

const ShowView: React.FC<ShowProps> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "cmsDistribution":
        return values[props.source] ? (
          values[props.source]
        ) : (
          <span className="empty">Not filled in</span>
        );
      default:
        return values[props.source] !== undefined || values[props.source] !== null ? (
          <>{values[props.source] === true ? "Published" : "Not published"}</>
        ) : (
          <span className="empty">Not filled in</span>
        );
    }
  };

  return (
    <div className={classes.Show}>
      <label>{props.label}</label>
      <div>{getValue(props.source)}</div>
    </div>
  );
};

export const RadioButtonGroupInputShow: React.FC<ShowProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={RadioButtonGroupInput}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
