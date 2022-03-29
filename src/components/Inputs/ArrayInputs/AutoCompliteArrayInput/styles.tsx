import { labelStyles } from "../../styles";

export const AutoCompleteInputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "#fff !important",
    border: "1px solid var(--secondary-color-default)",
    borderRadius: 4,
    "& > div": {
      margin: 0,
    },
    "&.Mui-error": {
      borderColor: "#D21C1C",
    },
    "& .MuiChip-root": {
      background: "#F2FDFB",
      border: "1px solid var(--accent-color)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--accent-color)",
      borderRadius: 4,
    },
    "& .MuiSvgIcon-root path": {
      color: "var(--accent-color)",
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
    color: "var(--secondary-color-default)",
  },
  "& > p.MuiFormHelperText-root.Mui-error": {
    color: "#D21C1C",
  },
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
