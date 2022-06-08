import BG from "../../images/bg-auth.jpg";

export const mainStyles = {
  display: "flex",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "var(--primary-bg-3)",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
};

export const cardStyles = {
  borderRadius: 4,
  overflow: "visible",
};

export const authBgStyles = {
  width: "33%",
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `url(${BG})`,
  "@media (max-width: 768px)": {
    height: 128,
    width: "100%",
  },
};

export const logoStyles = {
  width: 250,
  "& svg": {
    width: "100%",
    height: "auto",
  },
  "@media (max-width: 959px)": {
    width: 220,
  },
  "@media (max-width: 499px)": {
    width: 120,
  },
};

export const titleStyles = {
  fontWeight: 600,
  fontSize: 16,
  color: "var(--secondary-color-main)",
  lineHeight: "22px",
  paddingBottom: 16,
  borderBottom: "1px solid #E7E9E9",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};

export const annotationWrapperStyles: any = {
  position: "relative",
  "& svg": {
    cursor: "pointer",
    "& circle, & path": {
      transition: "0.35s all ease",
    },
    "&:hover circle": {
      stroke: "var(--secondary-menu-2)",
    },
    "&:hover path": {
      fill: "var(--secondary-menu-2)",
    },
    "&:hover + div": {
      opacity: 1,
      transform: "translate(-100%, -54%)",
      pointerEvents: "all",
    },
  },
};

export const annotationStyles: any = {
  position: "absolute",
  top: "50%",
  left: "-12px",
  color: "#fff",
  background: "#27353C",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "16px",
  width: 265,
  opacity: 0,
  pointerEvents: "none",
  transition: "0.35s all ease",
  transform: "translate(-120%, -54%)",
  padding: "8px 12px",
  borderRadius: 4,
  "&:before": {
    content: '""',
    position: "absolute",
    top: "50%",
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 2,
    transform: "translate(3px, -50%) rotate(45deg)",
    background: "#27353C",
  },
  "@media(max-width: 499px)": {
    width: 200,
    zIndex: 5,
  },
};

export const formWrapperStyles = {
  width: 500,
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: 5,
  "@media (max-width: 959px)": {
    width: 450,
  },
  "@media (max-width: 768px)": {
    margin: "auto",
    width: 500,
  },
  "@media (max-width: 499px)": {
    width: "100%",
  },
};

export const formStyles = {
  padding: 24,
  boxShadow: "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
  borderRadius: 5,
  "& label": {
    fontWeight: 500,
    color: "var(--secondary-color-main)",
  },
};

export const actionsWrapperStyles = {
  display: "flex",
  alignItems: "center",
  "& > label": {
    marginRight: 12,
    cursor: "pointer",
    userSelect: "none",
  },
  "@media (max-width: 499px)": {
    width: "100%",
    justifyContent: "space-between",
    "& .MuiFormGroup-root .MuiFormControlLabel-root": {
      margin: 0,
      "& .MuiSwitch-root": {
        paddingRight: 0,
        width: 46,
      },
    },
  },
};

export const actionsStyles: any = {
  padding: 0,
  marginTop: 5,
  fontSize: 14,
  lineHeight: "20px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 499px)": {
    justifyContent: "flex-end",
    "& a": {
      marginLeft: "0 !important",
    },
  },
};

export const linkStyles = {
  color: "#005AA3",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  "& svg": {
    marginRight: 8,
  },
};

export const linkHelpStyles = {
  color: "#005AA3",
  display: "flex",
  textDecoration: "none",
  marginTop: 48,
  justifyContent: "center",
  alignItems: "center",
  "& svg": {
    marginRight: 8,
  },
};

export const cardButtonStyles = {
  display: "flex",
  marginLeft: "auto",
  marginTop: 20,
};

export const AppBarStyles: any = {
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginLeft: 10,
    fontWeight: 600,
    display: "inline",
  },
  spacer: {
    flex: 1,
  },
  AppBar: {
    zIndex: 0,
    boxShadow: "unset",
    top: 17,
    "& .MuiToolbar-root": {
      minHeight: 48,
    },
  },
  FixedContainer: {
    display: "flex",
    position: "fixed",
    zIndex: 2,
  },
  SubHeader: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: 17,
    fontSize: 12,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    padding: "0 calc(0.2em + 15.5px)",
    color: "var(--additional-red-default)",
    backgroundColor: "var(--secondary-menu-2)",
    "& .SubLogo": {
      display: "flex",
      marginRight: 24,
    },
  },
};
