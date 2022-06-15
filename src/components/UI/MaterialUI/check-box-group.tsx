import * as React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../../Inputs/styles";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";
import { InputFormType } from "../../Inputs/input-types";

interface CheckBoxGroupProps {
  initialSourceState: string;
  inputType: InputFormType;
}

const useStyles = makeStyles({
  CheckBoxGroup: {
    paddingTop: 8,
  },
  label: {
    marginRight: 25,
    marginLeft: -2,
    "& .MuiRadio-root": {
      padding: 0,
      marginRight: 5,
    },
    "& span.MuiTypography-root": { ...labelStyles, marginBottom: "unset" },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
      marginBottom: 5,
    },
  },
});

export const CheckBoxGroupOrigin: React.FC<Omit<CheckBoxGroupProps, "inputType">> = React.memo(
  ({ children, initialSourceState }) => {
    const [selectedValue, setSelectedValue] = React.useState(initialSourceState);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    const controlProps = React.useCallback(
      (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item },
      }),
      [selectedValue]
    );

    return (
      <div className={classes.CheckBoxGroup}>
        {React.Children.map(children as React.ReactElement[], (child) => {
          return (
            <>
              <FormControlLabel
                className={classes.label}
                value={child.props.source}
                control={
                  <Radio size="small" color="primary" {...controlProps(child.props.source)} />
                }
                label={child.props.checkBoxLabel}
              />
            </>
          );
        })}
        {React.Children.map(children as React.ReactElement[], (child) => {
          return (
            <div
              style={{ display: selectedValue !== child.props.source ? "none" : "block" }}
              id={child.props.source}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
);

export const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ inputType, ...rest }) => (
  <CheckBoxGroupOrigin {...rest} />
);
