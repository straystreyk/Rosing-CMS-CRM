export const ResourceTitleStyles: any = {
  titleWrapper: {
    backgroundColor: "var(--primary-bg-3)",
    padding: "16px 24px",
  },
  ButtonsShow: {
    flexShrink: 0,
    "& button, & a": {
      marginLeft: 10,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    display: "flex",
    lineHeight: "32px",
    justifyContent: "space-between",
  },
  topTitleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
    "& .time": {
      color: "var(--primary-button-default)",
      fontSize: 14,
      fontWeight: 500,
      "& svg": {
        verticalAlign: "middle",
        marginRight: 4,
      },
    },
  },
  help: {
    lineHeight: 1,
    color: "var(--accent-color)",
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: 5,
    },
  },
  backIcon: {
    marginRight: 10,
    cursor: "pointer",
  },
};
