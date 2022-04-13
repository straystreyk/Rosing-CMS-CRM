export const SearchFiltersInputStyles = {
  SearchFilterInputWrapper: {
    display: "flex",
    paddingBottom: 16,
    borderBottom: "1px solid var(--secondary-color-disable)",
  },
  SearchFilterInput: {
    width: "100%",
    border: "1px solid var(--secondary-color-default)",
    fontFamily: "Gilroy, sans-serif",
    fontSize: 14,
    borderRadius: 4,
    padding: "8px 12px",
    "&::placeholder": {
      color: "var(--secondary-color-default)",
    },
  },
};
