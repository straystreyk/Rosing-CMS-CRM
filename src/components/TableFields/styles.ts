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
    display: "flex !important",
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
    fontSize: 14,
  },
  Expand: {
    "& .expandButton": {
      marginLeft: 8,
      display: "inline-block",
      "& .icon": {
        width: 8,
      },
    },
    "& .title": {
      fontWeight: 500,
      color: "var(--secondary-color-main)",
      cursor: "pointer",
      marginBottom: 4,
      display: "inline-block",
    },
  },
  ButtonCell: {
    "&.MuiTableCell-root": {
      "& .MuiTypography-root": {
        overflow: "visible",
        "& a": {
          padding: "4px 0",
        },
      },
    },
  },
  IDField: { wordBreak: "break-all" },
};
