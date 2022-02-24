import { AutocompleteArrayInput as StandardAutocompleteArrayInput } from "react-admin";
import * as React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core";

interface AutocompleteArrayInputProps {
  source?: string;
  choices?: object[];
  className?: string;
  validate?: any[];
  helperText?: string;
  optionText?: string;
  resource?: string;
}

const useStyles = makeStyles({
  AuoCompleteInput: {
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
      border: "1px solid #9FA5A8",
      borderRadius: 4,
      "& > div": {
        margin: "0 4px",
      },
      "& .MuiChip-root": {
        background: "#F2FDFB",
        border: "1px solid #00A991",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
        color: "#00A991",
        borderRadius: 4,
      },
      "& .MuiSvgIcon-root path": {
        color: "#00A991",
      },
    },
    "& input": {
      padding: "8px 12px",
    },
    "& > p.MuiFormHelperText-root": {
      margin: 0,
      marginTop: 5,
      fontSize: 12,
      fontFamily: "Gilroy, sans-serif",
      color: "#9FA5A8",
    },
    "& > p.MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& label": {
      position: "static",
      transform: "none !important",
      fontSize: 14,
      marginBottom: 5,
      lineHeight: "20px",
      color: "#0F1F26 !important",
    },
    "& div": {
      backgroundColor: "inherit",
      padding: "0 !important",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
      "&:focus-within": {
        background: "none",
      },
    },
  },
});

export const AutocompleteArrayInput: React.FC<AutocompleteArrayInputProps> = ({
  className,
  helperText,
  validate,
  source,
  choices,
  optionText,
  ...props
}) => {
  const classes = useStyles();

  return (
    <StandardAutocompleteArrayInput
      options={{
        className: cn(classes.AuoCompleteInput, className && className),
      }}
      helperText={helperText ? helperText : false}
      validate={validate}
      source={source}
      choices={choices}
      optionText={optionText}
      fullWidth
      {...props}
    />
  );
};
