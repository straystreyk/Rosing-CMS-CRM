import * as React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core";
import {
  SelectInput as SelectInputInner,
  SelectInputProps as SelectInputPropsRA,
} from "react-admin";
import { SelectInputShow } from "./show-view";
import { formHelperText, labelStyles } from "../../styles";

export interface SelectInputProps extends SelectInputPropsRA {
  inputType: "create" | "edit" | "show";
}

const useStyles = makeStyles({
  SelectInput: {
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-root": {
      padding: "7px 12px",
      color: "var(--primary-text-default)",
      fontFamily: "var(--font-family)",
      border: "1px solid var(--secondary-color-default)",
      borderRadius: 4,
      fontSize: 14,
    },
    "& > p.MuiFormHelperText-root": formHelperText,
    "& label": labelStyles,
    "& div": {
      backgroundColor: "inherit",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "&:hover": {
        background: "none",
      },
      "&:focus": {
        background: "none",
      },
      "&:focus-within": {
        background: "none",
      },
    },
  },
});

export const SelectInputOrigin: React.FC<SelectInputProps> = ({
  inputType,
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <SelectInputInner
        fullWidth
        options={{ className: cn(classes.SelectInput, className) }}
        helperText={props.helperText ?? false}
        {...props}
      />
    </>
  );
};

export const SelectInput: React.FC<SelectInputProps> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <SelectInputShow inputType={inputType} {...rest} />
  ) : (
    <SelectInputOrigin inputType={inputType} {...rest} />
  );
};
