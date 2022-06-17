import { CommonInputStyles, formHelperText, labelStyles } from "../../styles";

export const TextInputStyles = {
  backgroundColor: "none !important",
  "& input": {
    ...CommonInputStyles.Input,
    "&:hover": CommonInputStyles.Hover,
    "&:focus": CommonInputStyles.Focus,
    "&.Mui-disabled": CommonInputStyles.Disabled,
  },
  "& .MuiFilledInput-root.Mui-disabled": {
    backgroundColor: "unset",
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    right: 10,
  },
  "& textarea": {
    ...CommonInputStyles.Input,
    "&:focus": CommonInputStyles.Focus,
  },
  "& > p.MuiFormHelperText-root": formHelperText,
  "& label": labelStyles,
  "& div": {
    backgroundColor: "inherit",
    padding: "0 !important",
    "&.Mui-error input": CommonInputStyles.Error,
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
};
