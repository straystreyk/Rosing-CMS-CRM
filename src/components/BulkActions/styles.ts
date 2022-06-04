export const BulkActionsStyles: any = {
  BulkActionsWrapper: {
    backgroundColor: "var(--accent-color-select)",
    display: "flex",
    alignItems: "center",
    height: 0,
    opacity: 0,
    transition: "0.35s all ease",
    overflow: "hidden",
    padding: "0 20px 0 24px",
    "&.active": {
      height: 50,
      zIndex: 1,
      opacity: 1,
    },
    "& span.title": {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--primary-text-default)",
    },
  },
  CheckBox: {
    padding: 0,
    marginRight: 15,
  },
  BulkActions: {
    marginLeft: 15,
  },
  Button: {
    fontSize: 14,
    textTransform: "unset",
    fontFamily: "var(--font-family)",
    "& .MuiButton-label": {
      "& span": {
        paddingLeft: 4,
        lineHeight: "20px",
        verticalAlign: "middle",
      },
    },
    "&.delete": {
      backgroundColor: "unset",
      color: "var(--additional-red-default)",
    },
  },
};
