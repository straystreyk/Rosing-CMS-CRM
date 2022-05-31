import { scrollBarStyles } from "../Themes/main-styles";
import { Styles } from "@material-ui/core/styles/withStyles";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";
import { Theme } from "@material-ui/core";

export const ModalStyles: Styles<Theme, {}, string> = {
  Modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Paper: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 548,
    maxHeight: "60vh",
    padding: 24,
    boxShadow: "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
    transition: "0.35s all ease",
    overflow: "auto",
    position: "relative",
    outline: "none",
    ...scrollBarStyles,
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
      width: "100vw",
      maxHeight: "100vh",
    },
  },
  PaperContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  ExitIcon: {
    position: "absolute",
    top: 24,
    right: 24,
  },
  ModalTitleWrapper: {
    paddingBottom: 16,
    borderBottom: "1px solid var(--secondary-color-disable)",
  },
  ModalTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  ModalDescription: {
    color: "var(--primary-text-default)",
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
  },
};
