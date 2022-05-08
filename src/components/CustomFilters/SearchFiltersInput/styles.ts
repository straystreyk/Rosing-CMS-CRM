export const SearchFiltersInputStyles: any = {
  SearchFilterInputWrapper: {
    display: "flex",
    paddingBottom: 16,
    position: "relative",
    borderBottom: "1px solid var(--secondary-color-disable)",
  },
  SearchFilterInput: {
    width: "100%",
    border: "1px solid var(--secondary-color-default)",
    fontFamily: "var(--font-family)",
    fontSize: 14,
    borderRadius: 4,
    padding: "8px 30px 8px 12px",
    "&::placeholder": {
      color: "var(--secondary-color-default)",
    },
  },
  LoopIcon: {
    position: "absolute",
    top: "calc(50% - 6px);",
    right: 8,
    transform: "translateY(-50%)",
  },
};
