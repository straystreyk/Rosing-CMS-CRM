import * as React from "react";
import { FormControlLabel, FormHelperText } from "@material-ui/core";
import { Field } from "react-final-form";
import { CheckboxProps } from "../Checkbox";
import { Switch } from "../../UI/Buttons/switch";
import { makeStyles } from "@material-ui/core/styles";
import { formHelperText, labelStyles } from "../styles";
import { InputProps } from "../input-types";
import { SwitchInputShow } from "./show-view";

interface SwitchProps extends CheckboxProps {
  labelPlacement?: "start" | "end" | "top" | "bottom" | undefined;
}

const useStyles = makeStyles({
  SwitchInput: {
    paddingTop: 8,
    marginBottom: 8,
    "& label": {
      margin: 0,
      "& span.MuiTypography-root": { ...labelStyles, marginBottom: 0, marginRight: 8 },
    },
    "& p.MuiFormHelperText-root": formHelperText,
  },
});

export const SwitchInputOrigin: React.FC<SwitchProps> = ({
  source,
  initialValue,
  helperText,
  label,
  labelPlacement,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.SwitchInput}>
      <Field type="checkbox" name={source} defaultValue={initialValue}>
        {({ input, meta }) => {
          return (
            <>
              <FormControlLabel
                labelPlacement={labelPlacement ?? "start"}
                control={<Switch {...input} />}
                label={label}
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

export const SwitchInput: React.FC<InputProps> = React.memo(
  ({ inputType, offFastEdit, ...rest }) => {
    return inputType === "show" ? (
      <SwitchInputShow inputType={inputType} {...rest} />
    ) : (
      <SwitchInputOrigin inputType={inputType} {...rest} />
    );
  }
);
