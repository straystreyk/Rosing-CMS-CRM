export const FormToolBarStyles: any = {
  FixedToolBar: {
    position: "fixed",
    bottom: 0,
    width: "calc(100% - 240px)",
    zIndex: 10,
    backgroundColor: "#fff",
    display: "flex",
    padding: 0,
    justifyContent: "center",
    "& button": {
      marginLeft: 16,
      "&:first-child": {
        marginLeft: 0,
      },
    },
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },
  Transition: {
    transition: "0.35s all ease",
  },
  FixedToolBarClosed: {
    width: "100%",
  },
  StaticToolbar: {
    position: "static",
    width: "100%",
  },
};

export const EditFormStyles = {
  offToolbar: {
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
};

export const ModelFormStyles = {
  ArrayInputItemName: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 16,
    lineHeight: "22px",
    fontWeight: 600,
    cursor: "pointer",
    margin: "5px 0",
  },
};
