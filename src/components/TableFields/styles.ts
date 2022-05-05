export const TableFieldsStyles = {
  NameField: {
    textDecoration: "underline",
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
  },
  MoreActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& button": {
      marginLeft: 10,
      "&:first-child": {
        marginLeft: 0,
      },
    },
    "& button > svg": {
      verticalAlign: "middle",
    },
  },
  Empty: {
    color: "var(--secondary-color-default)",
  },
};
