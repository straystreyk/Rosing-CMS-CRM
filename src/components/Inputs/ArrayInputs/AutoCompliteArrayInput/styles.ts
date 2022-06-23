import { formHelperText, labelStyles } from "../../styles";
import { ChipStyles } from "../styles";
import { CommonInputStyles } from "../../styles";

export const AutoCompleteInputStyles = {
  "& .MuiInputBase-root": {
    ...CommonInputStyles.Input,
    padding: 1,
    backgroundColor: "#fff !important",
    "& > div": {
      margin: 0,
      padding: "0px 8px",
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
    ...CommonInputStyles.OffRAStyles,
  },
  "& div.AutoCompleteShow": {
    padding: "0 !important",
  },
};
