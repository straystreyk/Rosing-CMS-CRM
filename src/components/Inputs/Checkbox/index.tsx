import * as React from "react";
import { Checkbox as CheckboxMUI, FormControlLabel, FormHelperText } from "@material-ui/core";
import { Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { labelStyles } from "../styles";
import { CheckboxShow } from "./show-view";

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
        fontFamily: "var(--font-family)",
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
      fontFamily: "var(--font-family)",
    },
  },
});

export interface CheckboxProps {
  helperText?: string;
  source: string;
  checkboxLabel?: string;
  label?: string;
  initialValue?: boolean;
  inputType?: string;
}

export const CheckboxOrigin: React.FC<CheckboxProps> = ({
  helperText,
  source,
  checkboxLabel,
  label,
  initialValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.Checkbox}>
      <Field type="checkbox" name={source} defaultValue={initialValue}>
        {({ input, meta, ...rest }) => {
          return (
            <>
              <div className="label">
                <span>{label}</span>
              </div>
              <FormControlLabel
                control={<CheckboxMUI color="primary" size="small" {...input} />}
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

export const Checkbox: React.FC<CheckboxProps> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <CheckboxShow inputType={inputType} {...rest} />
  ) : (
    <CheckboxOrigin inputType={inputType} {...rest} />
  );
};
