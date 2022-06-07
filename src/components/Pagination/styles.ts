import { Styles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";
export const PaginationStyles: Styles<Theme, {}, string> = {
  Button: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&.buttonPrev": {
      transform: "rotate(180deg)",
    },
    "& svg circle, & svg line, & svg path": {
      transition: "0.2s all ease",
      stroke: "var(--secondary-color-main)",
    },
    "&:hover": {
      "& svg circle, & svg line, & svg path": {
        stroke: "var(--accent-color)",
      },
    },
    "&.disabled": {
      pointerEvents: "none",
      "& svg circle, & svg line, & svg path": {
        stroke: "var(--secondary-color-disable)",
      },
    },
  },
  Page: {
    display: "flex",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 5px",
    color: "var(--secondary-color-default)",
    transition: "0.35s all ease",
    "&:hover": {
      color: "var(--secondary-color-main)",
    },
    "&.active": {
      color: "var(--secondary-color-main)",
    },
  },
  SearchPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--secondary-color-default)",
    userSelect: "none",
    marginBottom: 24,
    "& span": {
      display: "inline-block",
      fontSize: 12,
      marginRight: 4,
    },
    "& input": {
      maxWidth: 80,
      padding: "4px 12px",
      color: "var(--secondary-color-default)",
      borderRadius: 4,
      border: "1px solid var(--secondary-color-default)",
      fontSize: 12,
      transition: "0.35s all ease",
      marginRight: 10,
      "&::placeholder": {
        color: "var(--secondary-color-default)",
      },
      "&:focus::placeholder": {
        color: "transparent",
      },
      "&:focus": {
        color: "var(--secondary-color-main)",
        border: "1px solid #28A138",
      },
    },
  },
  PaginationWrapper: {
    margin: "24px 0",
    padding: "0 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  },
};
