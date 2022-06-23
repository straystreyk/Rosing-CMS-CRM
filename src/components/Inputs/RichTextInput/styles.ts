import { CommonInputStyles, labelStyles } from "../styles";

export const RaRichTextInputStyles: any = {
  RaRichTextInput: {
    color: "var(--primary-text-default)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 8,
    paddingTop: 8,
    "& label": {
      ...labelStyles,
      "&.Mui-error + div > .ql-editor": {
        borderColor: "#D21C1C",
      },
    },
    "& .ql-editor": {
      padding: "8px 12px 50px 12px",
      backgroundColor: "#fff",
      border: "1px solid var(--secondary-color-chevron)",
      fontSize: 14,
      borderRadius: 4,
      transition: "0.35s border-color ease",
      "&:hover": {
        borderColor: "var(--primary-text-default)",
      },
      "&:focus": {
        outline: "2px solid var(--primary-focus-2)",
        borderColor: "#28A138",
        outlineOffset: "2px",
      },
    },
    "& .ql-container.ql-snow": {
      border: "none",
    },
    "& .ql-toolbar.ql-snow": {
      order: 2,
      padding: "8px 0px",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      border: "none",
      borderTop: "1px solid var(--secondary-color-chevron)",
      margin: "0px 1px 1px 1px",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 2,
      "&:after": {
        content: "unset",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "var(--secondary-color-default)",
      margin: 0,
      fontSize: 12,
      marginTop: 5,
      fontFamily: "var(--font-family)",
      "&.Mui-error": {
        color: "#D21C1C",
      },
    },
    "& .ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button": {
      padding: 0,
      height: 15,
      width: 15,
      marginLeft: 17,
      "& svg": {
        width: "100%",
      },
      "&.ql-active svg path": {
        fill: "var(--accent-color)",
      },
    },
  },
};
