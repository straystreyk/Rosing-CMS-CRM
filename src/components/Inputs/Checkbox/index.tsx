import * as React from "react";
import { Checkbox as CheckboxMUI, FormControlLabel, FormHelperText } from "@material-ui/core";
import { Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { formHelperText, labelStyles } from "../styles";
import { CheckboxShow } from "./show-view";
import { InputProps } from "../input-types";

const useStyles = makeStyles({
  Checkbox: {
    margin: "8px 0",
    "& .label": {
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
    "& p.MuiFormHelperText-root": formHelperText,
  },
});

export interface CheckboxProps extends InputProps {
  checkboxLabel?: string;
  initialValue?: boolean;
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
