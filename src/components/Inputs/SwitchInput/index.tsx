import * as React from "react";
import { FormControlLabel, FormHelperText } from "@material-ui/core";
import { Field } from "react-final-form";
import { CheckboxProps } from "../Checkbox";
import { Switch } from "../../UI/MaterialUI/switch";
import { makeStyles } from "@material-ui/core/styles";
import { labelStyles } from "../styles";

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
    "& p.MuiFormHelperText-root": {
      color: "var(--secondary-color-default)",
      fontSize: 12,
      marginTop: 2,
      fontFamily: "Gilroy, sans-serif",
    },
  },
});

export const SwitchInput: React.FC<SwitchProps> = ({
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
