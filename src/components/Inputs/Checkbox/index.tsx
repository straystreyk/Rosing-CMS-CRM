import * as React from "react";
import { Checkbox, FormControlLabel, FormHelperText } from "@material-ui/core";
import { useField, Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { labelStyles } from "../styles";

const useStyles = makeStyles({
  Checkbox: {
    margin: "8px 0",
    "& .label": {
      marginBottom: 8,
      "& > span": labelStyles,
    },
    "& label": {
      marginLeft: -2,
      "& span.MuiButtonBase-root": {
        padding: 0,
        height: "unset",
      },
      "& span.MuiTypography-root": {
        fontFamily: "Gilroy, sans-serif",
        fontSize: 14,
        lineHeight: "20px",
        color: "var(--primary-text-default)",
        marginLeft: 6,
      },
    },
    "& p.MuiFormHelperText-root": {
      color: "var(--secondary-color-default)",
      fontSize: 12,
      marginTop: 5,
      fontFamily: "Gilroy, sans-serif",
    },
  },
});

export const CheckBox: React.FC<{
  helperText?: string;
  source: string;
  checkboxLabel?: string;
  label?: string;
  initialValue?: boolean;
}> = ({ helperText, source, checkboxLabel, label, initialValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.Checkbox}>
      <Field name={source} type="checkbox" initialValue={initialValue}>
        {({ input, meta, ...rest }) => {
          return (
            <>
              <div className="label">
                <span>{label}</span>
              </div>
              <FormControlLabel
                control={<Checkbox color="primary" size="small" {...input} />}
                label={checkboxLabel}
              />
              {helperText && <FormHelperText>{helperText}</FormHelperText>}
              {/*{meta.error && meta.touched && <span>{meta.error}</span>}*/}
            </>
          );
        }}
      </Field>
    </div>
  );
};
