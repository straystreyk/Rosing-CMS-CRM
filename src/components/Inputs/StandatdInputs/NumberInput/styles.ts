import { formHelperText, CommonInputStyles, labelStyles } from "../../styles";

export const NumberInputStyles: any = {
  backgroundColor: "none !important",
  fontFamily: "var(--font-family)",
  "& .Mui-error": {
    "& input": {
      ...CommonInputStyles.Error,
    },
  },
  "& input": {
    ...CommonInputStyles.Input,
    "&:focus": CommonInputStyles.Focus,
    "&:hover": CommonInputStyles.Hover,
  },
  "& > p.MuiFormHelperText-root": formHelperText,
  "& label": labelStyles,
  "& div": {
    backgroundColor: "inherit",
    padding: "0 !important",
    ...CommonInputStyles.OffRAStyles,
  },
};
