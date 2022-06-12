import { formHelperText, labelStyles } from "../../styles";
import { ChipStyles } from "../styles";

export const AutoCompleteInputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "#fff !important",
    border: "1px solid var(--secondary-color-default)",
    borderRadius: 4,
    "& > div": {
      margin: 0,
    },
    "&.Mui-error": {
      borderColor: "var(--accent-color)",
    },
    "& .MuiSvgIcon-root path": {
      color: "var(--accent-color)",
    },
    "& .MuiChip-root": ChipStyles,
  },
  "& input": {
    padding: "8px 12px",
  },
  "& > p.MuiFormHelperText-root": formHelperText,
  "& label": labelStyles,
  "& div": {
    backgroundColor: "#fff !important",
    padding: "0 4px !important",
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
  "& div.AutoCompleteShow": {
    padding: "0 !important",
  },
};
