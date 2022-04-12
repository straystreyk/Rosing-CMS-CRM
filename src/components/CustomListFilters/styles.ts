export const RoundedFiltersWrapperStyles: any = {
  RoundedFiltersWrapper: {
    padding: "0 24px",
    marginBottom: 24,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "15px 8px",
    "& .filterButton": {
      padding: 0,
    },
  },
  ListItem: {
    display: "flex",
    alignItems: "center",
    "& span.label": {
      marginLeft: 10,
    },
  },
};

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
