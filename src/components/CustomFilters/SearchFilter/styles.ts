export const SearchFilterStyles = {
  SearchFilterWrapper: {
    display: "flex",
    marginBottom: 16,
  },
  SearchInput: {
    width: "100%",
    outline: "none",
    border: "1px solid var(--secondary-color-default)",
    borderLeft: "none",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    fontFamily: "Gilroy, sans-serif",
    fontSize: 14,
    padding: "8px 24px 8px 12px",
    "&::placeholder": {
      color: "var(--secondary-color-default)",
    },
  },
  SelectInput: {
    border: "1px solid var(--secondary-color-default)",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: 200,
    "& .MuiInputBase-root": {
      fontSize: 14,
      height: "100%",
      fontFamily: "Gilroy, sans-serif",
      color: "var(--secondary-color-default)",

      "&::before": {
        display: "none",
      },
      "& .MuiSelect-root": {
        padding: "8px 24px 8px 8px",
        "&:focus": {
          backgroundColor: "unset",
        },
      },
      "&::after": {
        display: "none",
      },
    },
  },
};