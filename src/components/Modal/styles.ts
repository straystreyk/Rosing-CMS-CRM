import { scrollBarStyles } from "../Themes/main-styles";

export const ModalStyles = {
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
    ...scrollBarStyles,
  },
};
