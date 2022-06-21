import * as React from "react";
import { EditInputComponent } from "../FastEditInput";
import { CheckboxOrigin, CheckboxProps } from "./index";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { EmptyInput, labelStyles } from "../styles";
import { UrlField } from "../../TableFields/url-field";

const useStyles = makeStyles({
  CheckboxShowView: {
    "& label": labelStyles,
    "& .value": {
      color: "var(--primary-text-default)",
      marginTop: 4,
      position: "relative",
      display: "inline-block",
      fontSize: 14,
      "&::after": {
        position: "absolute",
        content: "''",
        left: 0,
        bottom: 0,
        height: 1,
        width: "100%",
        backgroundColor: "var(--primary-text-default)",
      },
    },
    "& .empty": {
      color: "var(--secondary-color-default)",
      fontSize: 14,
      marginTop: 4,
    },
  },
});

export const ShowView: React.FC<{ source: string; label: string }> = ({
  source,
  label,
  ...props
}) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "hasSeason":
        return values[source] ? (
          <span className="value">{values.seasons.length}</span>
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      default:
        return values[source] !== undefined || values[source] !== null ? (
          <span className="value">{values[source] ? "Yes" : "No"}</span>
        ) : (
          <EmptyInput emptyText="Empty" />
        );
    }
  };

  return (
    <div className={classes.CheckboxShowView}>
      <label>{label}</label>
      <div>{getValue(source)}</div>
    </div>
  );
};

export const CheckboxShow: React.FC<CheckboxProps> = React.memo((props) => {
  return <EditInputComponent ComponentInput={CheckboxOrigin} ComponentShow={ShowView} {...props} />;
});
