import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@material-ui/core";

interface RadiButtonsGroupProps extends RadioGroupProps {
  initialValue: string;
  formType: string;
}

export const RadiButtonsGroup: React.FC<RadiButtonsGroupProps> = ({
  initialValue,
  formType,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <>
      {formType !== "show" && (
        <FormControl>
          <RadioGroup
            {...props}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={initialValue}
          >
            {React.Children.map(props.children, (child: any, index) => {
              return (
                <>
                  <div>
                    <FormControlLabel
                      value={child.props.source}
                      control={<Radio color="primary" size="small" />}
                      label={child.props.label}
                      key={index}
                    />
                  </div>
                  <div>{child}</div>
                </>
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </>
  );
};
