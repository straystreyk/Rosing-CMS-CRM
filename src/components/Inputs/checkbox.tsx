import * as React from "react";
import { Checkbox as CheckBoxMUI } from "@material-ui/core";
import { useInput } from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  Checkbox: {
    padding: 0,
    "& + label": {
      fontSize: 12,
      lineHeight: "20px",
      paddingLeft: 5,
      cursor: "pointer",
      userSelect: "none",
    },
  },
  CheckboxWrapper: {
    display: "flex",
    alignItems: "center",
  },
});

const BoundedCheckBox = (props: any) => {
  const {
    input: { name, onChange, ...rest },
    isRequired,
  } = useInput(props);
  const classes = useStyles();

  return (
    <div className={classes.CheckboxWrapper}>
      <CheckBoxMUI
        name={name}
        id={name}
        size="small"
        className={classes.Checkbox}
        label={props.label}
        onChange={onChange}
        required={isRequired}
        color="primary"
        {...rest}
      />
      <label htmlFor={name}>{props.label}</label>
    </div>
  );
};

export const Checkbox: React.FC<{ source: string; label?: string }> = ({ source, label }) => {
  return (
    <>
      <BoundedCheckBox type="checkbox" source={source} label={label} />
    </>
  );
};
