import { Styles } from "@material-ui/core/styles/withStyles";
import { scrollBarStyles } from "../Themes/main-styles";
import { Theme } from "@material-ui/core";
import { MEDIA_QUERIES_BREAKPOINTS, TopToolBar } from "../../constants/style-constants";

const TableRow = {
  height: 62,
  borderBottom: "1px solid var(--secondary-color-disable)",
  "&.MuiTableRow-root.MuiTableRow-hover:hover": {
    backgroundColor: "var(--primary-bg)",
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
    minWidth: 150,
    "& .MuiTypography-root, & .MuiTypography-root a": {
      overflow: "hidden",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 2,
    },
    "& .MuiTypography-root": {
      display: "-webkit-box",
      verticalAlign: "middle",
    },
    "& .MuiTypography-root a": {
      display: "-webkit-inline-box",
      verticalAlign: "middle",
      "&.MuiButtonBase-root": {
        display: "inline-flex",
      },
      "&:focus-visible": {
        color: "var(--primary-focus)",
        outline: "none",
      },
    },
  },
};

export const DatagridStyles: any = {
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
      marginRight: 11,
      display: "inline-block",
      fontSize: 18,
      color: "var(--secondary-color-main)",
      fontWeight: 600,
    },
  },
  TopToolBar,
};

export const TableStyles: Styles<Theme, {}, string> = {
  TableCheckbox: {
    borderBottom: "none",
    minWidth: "unset !important",
    "&.MuiTableCell-paddingCheckbox": {
      padding: "0 12px 0 24px",
    },
    position: "relative",
  },
  TableCell: {
    border: "none",
    position: "relative",
  },
  TableRow,
  DraggableTableRow: {
    ...TableRow,
    "& .DNDIcon": {
      height: 30,
      "& svg": {
        height: "100%",
      },
    },
    "&:hover .DNDIcon": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  DNDIcon: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    opacity: 0,
    pointerEvents: "none",
    transition: "0.35s all ease",
  },
  TableCellHeader: {
    borderBottom: "none",
    "& button": {
      color: "var(--primary-text-default)",
      fontWeight: 500,
      textAlign: "left",
      fontSize: 14,
      transition: "0.35s all ease",
      "& svg": {
        width: 20,
      },
      "&:hover": {
        color: "var(--primary-focus)",
      },
    },
    "&.active button": {
      color: "var(--primary-focus)",
    },
  },
};
