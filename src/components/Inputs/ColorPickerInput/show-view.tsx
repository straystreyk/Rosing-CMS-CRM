import * as React from "react";
import { EditInputComponent } from "../FastEditInput";
import { makeStyles } from "@material-ui/core";
import { ColorPickerInputOrigin, ColorPickerInputProps } from "./color-picker-input";
import { useFormState } from "react-final-form";
import { ColorPickerStyles } from "./styles";

const useStyles = makeStyles({
  ...ColorPickerStyles,
  PaletteShow: {
    display: "inline-block",
    border: "0.5px solid var(--secondary-color-disable)",
    borderRadius: "50%",
    width: 16,
    height: 16,
    marginRight: 10,
  },
  ShowViewWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    color: "var(--primary-text-default)",
  },
});

const ShowView: React.FC<{ label: string; source: string }> = ({ label, source, ...rest }) => {
  const { values } = useFormState();
  const classes = useStyles();

  return (
    <div>
      <label className={classes.Label}>{label}</label>
      <div className={classes.ShowViewWrapper}>
        <span className={classes.PaletteShow} style={{ backgroundColor: values[source] }}></span>
        <span>{values[source]}</span>
      </div>
    </div>
  );
};

export const ColorPickerShow: React.FC<ColorPickerInputProps> = (props) => (
  <EditInputComponent ComponentInput={ColorPickerInputOrigin} ComponentShow={ShowView} {...props} />
);
