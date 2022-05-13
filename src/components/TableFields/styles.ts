export const TableFieldsStyles: any = {
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
      marginLeft: 15,
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
  IDField: { wordBreak: "break-all" },
};
