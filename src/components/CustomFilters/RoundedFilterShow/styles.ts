export const DefaultRoundedFilterStyles = {
  RoundedFilter: {
    backgroundColor: "var(--primary-bg)",
    lineHeight: "20px",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: 50,
    "& button": {
      color: "var(--primary-focus)",
      fontSize: 14,
      fontWeight: 500,
      "& span.label + svg": {
        marginLeft: 10,
      },
    },
    "& svg": {
      verticalAlign: "middle",
    },
    "& .deleteButton": {
      marginLeft: 10,
    },
  },
  RoundedFilterActive: {
    backgroundColor: "var(--primary-bg-1)",
    "& button": {
      color: "var(--primary-button-default)",
    },
  },
};
