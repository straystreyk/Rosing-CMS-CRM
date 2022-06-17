import { formHelperText, labelStyles } from "../../styles";
import { ChipStyles } from "../styles";
import { CommonInputStyles } from "../../styles";

export const AutoCompleteInputStyles = {
  "& .MuiInputBase-root": {
    ...CommonInputStyles.Input,
    backgroundColor: "#fff !important",
    "& > div": {
      margin: 0,
    },
    "&.Mui-error": CommonInputStyles.Error,
    "& .MuiSvgIcon-root path": {
      color: "var(--accent-color)",
    },
    "&:hover": CommonInputStyles.Hover,
    "&:focus": CommonInputStyles.Focus,
    "& .MuiChip-root": ChipStyles,
  },
  "& input": {
    ...CommonInputStyles.Input,
    border: "none",
  },
  "& > p.MuiFormHelperText-root": formHelperText,
  "& label": labelStyles,
  "& div": {
    backgroundColor: "#fff !important",
    padding: "0 4px !important",
    ...CommonInputStyles.OffRAStyles,
  },
  "& div.AutoCompleteShow": {
    padding: "0 !important",
  },
};
