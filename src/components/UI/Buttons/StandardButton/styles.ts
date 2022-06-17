const generateButtonTypeStyles = (color: string, hoverColor: string, selectColor: string) => ({
  Contained: {
    backgroundColor: color,
    "& .MuiButton-label": {
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: hoverColor,
    },
  },
  Outlined: {
    border: `1px solid ${color}`,
    "& svg path, & svg circle, & svg line": {
      transition: "0.35s all ease",
    },
    "&:hover": {
      color: `${hoverColor} !important`,
      borderColor: `${hoverColor} !important`,
      backgroundColor: selectColor,
    },
  },
  Text: {
    padding: "4px 6px",
    "& svg path, & svg circle, & svg line": {
      transition: "0.35s all ease",
    },
    "&:hover": {
      color: `${hoverColor} !important`,
      backgroundColor: "unset",
    },
  },
  Icon: {
    minWidth: "auto",
    padding: "4px 6px",
    "&:hover": {
      backgroundColor: selectColor,
    },
  },
});

export const StandardButtonStyles: any = {
  StandardButton: {
    padding: "8px 16px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "var(--font-family)",
    lineHeight: "20px",
    transition: "0.35s color ease, 0.35s border ease, 0.35s background ease",
    "&.primary.contained": generateButtonTypeStyles(
      "var(--accent-color)",
      "var(--accent-color-hover)",
      "var(--accent-color-select)"
    ).Contained,
    "&.primary.text": generateButtonTypeStyles(
      "var(--accent-color)",
      "var(--accent-color-hover)",
      "var(--accent-color-select)"
    ).Text,
    "&.primary.outlined": generateButtonTypeStyles(
      "var(--accent-color)",
      "var(--accent-color-hover)",
      "var(--accent-color-select)"
    ).Outlined,
    "&.secondary.contained": generateButtonTypeStyles(
      "var(--primary-button-default)",
      "var(--primary-focus)",
      "var(--primary-bg-2)"
    ).Contained,
    "&.secondary.text": generateButtonTypeStyles(
      "var(--primary-button-default)",
      "var(--primary-focus)",
      "var(--primary-bg-2)"
    ).Text,
    "&.secondary.outlined": generateButtonTypeStyles(
      "var(--primary-button-default)",
      "var(--primary-focus)",
      "var(--primary-bg-2)"
    ).Outlined,
    "&.secondary.icon": generateButtonTypeStyles(
      "var(--primary-button-default)",
      "var(--primary-focus)",
      "var(--primary-bg-2)"
    ).Icon,
    "&.additional-red.contained": generateButtonTypeStyles(
      "var(--additional-red-default)",
      "var(--additional-red-hover)",
      "var(--additional-red-select)"
    ).Contained,
    "&.additional-red.text": generateButtonTypeStyles(
      "var(--additional-red-default)",
      "var(--additional-red-hover)",
      "var(--additional-red-select)"
    ).Text,
    "&.additional-red.outlined": generateButtonTypeStyles(
      "var(--additional-red-default)",
      "var(--additional-red-hover)",
      "var(--additional-red-select)"
    ).Outlined,
    "&.additional-red.icon": generateButtonTypeStyles(
      "var(--additional-red-default)",
      "var(--additional-red-hover)",
      "var(--additional-red-select)"
    ).Icon,
    "& .MuiButton-label": {
      fontWeight: 500,
      "& > .MuiButton-startIcon": {
        marginRight: 4,
        marginLeft: 0,
        display: "flex",
        width: 20,
        height: 20,
        alignItems: "center",
        "& svg": {
          width: "100%",
        },
      },
      "& > .MuiButton-endIcon": {
        marginRight: 0,
      },
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
  MobileView: {
    minWidth: "unset",
    "& .MuiButton-label > .MuiButton-startIcon": {
      margin: 0,
    },
  },
};
