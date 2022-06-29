export const ExportStatusWidgetStyles = {
  Icon: {
    display: "flex",
    marginRight: 6,
    color: "var(--primary-button-default)",
    "& .icon": {
      width: 20,
    },
  },
  ExportWidget: {
    padding: "8px 24px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "var(--primary-bg)",
    "& .Button": {
      marginLeft: 10,
    },
    "& span.text": {
      color: "var(--primary-button-default)",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      fontSize: 14,
      lineHeight: "20px",
      "& a": {
        marginLeft: 10,
      },
    },
  },
};
