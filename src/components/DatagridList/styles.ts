import { Styles } from "@material-ui/core/styles/withStyles";
import { scrollBarStyles } from "../Themes/main-styles";
import { Theme } from "@material-ui/core";
import { TopToolBar } from "../../constants/style-constants";

export const DatagridStyles: Styles<Theme, {}, string> = {
  List: {
    "@media (max-width: 599px)": {
      paddingBottom: 50,
    },
  },
  DataGridWrapper: {
    position: "relative",
    width: "calc(100vw - 72px)",
    overflowX: "scroll",
    transition: "0.3s width ease",
    ...scrollBarStyles,
    "& tbody": {
      userSelect: "unset",
    },
    "& table": {
      minWidth: 1100,
    },
    "@media (max-width: 599px)": {
      width: "100vw",
    },
    "@media (min-width: 600px)": {
      "&.active": {
        width: "calc(100vw - 260px)",
      },
    },
  },
  LoaderWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 200,
    top: 0,
    left: 0,
  },
  TopToolBarWrapper: {
    marginTop: 16,
    padding: "0px 20px 0 24px",
    "& .description": {
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--secondary-color-main)",
      marginTop: 8,
    },
  },
  TopToolBarName: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& .title": {
      marginRight: 16,
      display: "inline-block",
      fontSize: 18,
      color: "var(--secondary-color-main)",
      fontWeight: 600,
    },
  },
  TopToolBar,
};
