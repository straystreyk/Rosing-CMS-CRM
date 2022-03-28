import { labelStyles } from "../../styles";

export const TextInputStyles = {
  backgroundColor: "none !important",
  "& input": {
    color: "var(--primary-text-default)",
    padding: "8px 12px",
    lineHeight: "20px",
    fontSize: 14,
    border: "1px solid #9FA5A8",
    borderRadius: 4,
    transition: "0.35s border ease, 0.35s color ease",
    "&::placeholder": {
      color: "#9FA5A8 !important",
      opacity: "1 !important",
    },
    "&:hover": {
      borderColor: "var(--primary-text-default)",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      borderColor: "#28A138",
      outlineOffset: "2px",
    },
    "&.Mui-disabled": {
      opacity: 0.4,
    },
  },
  "& .MuiFilledInput-root.Mui-disabled": {
    backgroundColor: "unset",
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    right: 10,
  },
  "& textarea": {
    lineHeight: "20px",
    fontSize: 14,
    border: "1px solid #9FA5A8",
    borderRadius: 4,
    transition: "0.35s border ease, 0.35s color ease",
    color: "var(--primary-text-default)",
    padding: "8px 12px",
    "&:focus": {
      outline: "2px solid #7FC5FF",
      borderColor: "#28A138",
      outlineOffset: "2px",
    },
  },
  "& > p.MuiFormHelperText-root": {
    margin: 0,
    marginTop: 5,
    fontSize: 12,
    fontFamily: "Gilroy, sans-serif",
    color: "#9FA5A8",
  },
  "& > p.MuiFormHelperText-root.Mui-error": {
    color: "#D21C1C",
  },
  "& label": labelStyles,
  "& div": {
    backgroundColor: "inherit",
    padding: "0 !important",
    "&.Mui-error input": {
      borderColor: "#D21C1C",
    },
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
