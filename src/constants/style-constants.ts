export const MEDIA_QUERIES_BREAKPOINTS = {
  xs: "599px",
  sm: "768px",
  md: "1024px",
  lg: "1200px",
  xl: "1400px",
  xxl: "1600px",
};

export const TopToolBar = {
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  "& button": {
    marginLeft: 10,
  },
  [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
};
