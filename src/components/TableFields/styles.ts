export const TableFieldsStyles: any = {
  NameField: {
    textDecoration: "underline",
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    transition: "0.35s all ease",
    "&:hover": {
      color: "var(--primary-focus)",
    },
  },
  MoreActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& button": {
      marginLeft: 25,
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
  DatagridWrapperWithoutScroll: {
    "&.active": {},
    "& table": {
      minWidth: "unset",
    },
  },
};
