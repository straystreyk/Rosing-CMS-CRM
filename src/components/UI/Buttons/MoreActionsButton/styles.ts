export const MoreActionsButtonStyles = {
  MoreActionsButton: {
    borderRadius: "50%",
    cursor: "pointer",
    width: 16,
    height: 16,
    backgroundColor: "var(--primary-bg)",
    transition: "0.35s all ease",
    "& svg": {
      verticalAlign: "middle",
      width: 12,
    },
  },
  MoreActionButtonChild: {
    marginBottom: 5,
    "& > a, & > button ": {
      width: "100%",
      padding: "4px 6px",
      justifyContent: "flex-start",
    },
    "&:last-child": {
      marginBottom: 0,
    },
    "& .DeleteButton": {
      marginTop: 10,
    },
  },
};
