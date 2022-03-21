import BG from "../../images/bg-auth.jpg";

export const mainStyles = {
  display: "flex",
  alignItems: "center",
  height: "100vh",
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
  "@media (max-width: 900px)": {
    width: 120,
  },
  "@media (max-width: 768px)": {
    width: 240,
  },
  "@media (max-width: 576px)": {
    width: 120,
  },
};

export const titleStyles = {
  fontWeight: 600,
  fontSize: 16,
  color: "#0F1F26",
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
  "@media(max-width: 576px)": {
    width: 200,
    zIndex: 5,
  },
};

export const formWrapperStyles = {
  width: 500,
  margin: "0 auto",
  "@media (max-width: 900px)": {
    width: 450,
  },
  "@media (max-width: 768px)": {
    margin: "auto",
    width: 500,
  },
  "@media (max-width: 576px)": {
    margin: "auto",
    width: 300,
  },
};

export const formStyles = {
  padding: 24,
  boxShadow: "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
  "& label": {
    fontWeight: 500,
    color: "#0F1F26",
  },
};

export const actionsWrapperStyles = {
  display: "flex",
  alignItems: "center",
  "& > label": {
    marginRight: 15,
    cursor: "pointer",
    userSelect: "none",
  },
};

export const actionsStyles = {
  padding: 0,
  marginTop: 5,
  fontSize: 14,
  lineHeight: "20px",
  display: "flex",
  justifyContent: "flex-end",
  "@media (max-width: 576px)": {
    flexDirection: "column",
    alignItems: "flex-start",
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
