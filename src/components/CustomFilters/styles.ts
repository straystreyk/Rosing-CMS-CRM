export const CustomFiltersWrapperStyles: any = {
  CustomFiltersWrapper: {
    padding: "0 20px 0 24px",
    marginTop: 20,
  },
  RoundedFiltersWrapper: {
    marginBottom: 16,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "15px 8px",
    "& .filterButton": {
      padding: "0 !important",
      "&:hover": {
        "& svg path": {
          fill: "unset !important",
        },
      },
      "&.deleteButton": {
        marginLeft: 15,
        "&:hover": {
          "& svg path": {
            fill: "var(--additional-red-hover ) !important",
            stroke: "unset !important",
          },
        },
      },
    },
  },
};
