const generateButtonVariantsStyles = (color: string, hoverColor: string, selectColor: string) => ({
  "&.contained": {
    backgroundColor: color,
    "& .MuiButton-label": {
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: hoverColor,
    },
  },
  "&.outlined": {
    border: `1px solid ${color}`,
    "&:hover": {
      color: `${hoverColor}`,
      borderColor: `${hoverColor}`,
      backgroundColor: selectColor,
    },
  },
  "&.text": {
    padding: "4px 6px",
    "&:hover": {
      color: `${hoverColor} `,
      backgroundColor: "unset",
    },
  },
  "&.icon": {
    minWidth: "auto",
    padding: "4px 6px",
    "&:hover": {
      backgroundColor: selectColor,
    },
  },
});

const ALL_BUTTON_TYPES = {
  primary: {
    color: "var(--accent-color)",
    ...generateButtonVariantsStyles(
      "var(--accent-color)",
      "var(--accent-color-hover)",
      "var(--accent-color-select)"
    ),
  },
  secondary: {
    color: "var(--primary-button-default)",
    ...generateButtonVariantsStyles(
      "var(--primary-button-default)",
      "var(--primary-focus)",
      "var(--primary-bg-2)"
    ),
  },
  "additional-red": {
    color: "var(--additional-red-default)",
    ...generateButtonVariantsStyles(
      "var(--additional-red-default)",
      "var(--additional-red-hover)",
      "var(--additional-red-select)"
    ),
  },
};

export const StandardButtonStyles: any = {
  StandardButton: {
    padding: "8px 16px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "var(--font-family)",
    lineHeight: "20px",
    transition: "0.35s color ease, 0.35s border ease, 0.35s background ease",
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
      outline: "2px solid var(--primary-focus-2)",
      outlineOffset: "2px",
    },
  },
  ...ALL_BUTTON_TYPES,
  MobileView: {
    minWidth: "unset",
    "& .MuiButton-label > .MuiButton-startIcon": {
      margin: 0,
    },
  },
};
