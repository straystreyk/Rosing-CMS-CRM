import { outlineStyles, scrollBarStyles } from "./main-styles";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";

export const darkTheme = {
  palette: {
    primary: {
      main: "#8084cb",
      light: "#829321",
    },
    secondary: {
      main: "#af2c2c",
    },
    default: {
      main: "#444",
    },
    type: "dark",
  },
  overrides: {
    MuiAppBar: {
      colorSecondary: {
        backgroundColor: "#4f3cc9",
      },
    },
    MuiPaper: {
      root: {
        border: "none",
        backgroundClip: "padding-box",
      },
      elevation8: {
        backgroundColor: "red",
      },
    },
    RaMenuItemLink: {
      active: {
        borderRight: "4px solid #4f3cc9",
        background: "rgba(79,60,201,0.4)",
        color: "#fff",
      },
    },
    RaToolbar: {
      desktopToolbar: {
        background: "#393939",
      },
    },
  },
};

export const lightTheme = {
  palette: {
    primary: {
      main: "#00A991",
      contrastText: "#D21C1C",
    },
    secondary: {
      main: "#005AA3",
    },
    background: {
      default: "#fff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: "var(--secondary-color-main)",
      },
      arrow: {
        color: "var(--secondary-color-main)",
      },
    },
    RaCreate: {
      noActions: {
        "@media (min-width: 600px)": {
          marginTop: 0,
        },
      },
    },
    MuiSelect: {
      icon: {
        color: "#DDDFDF",
      },
    },
    RaList: {
      bulkActionsDisplayed: {
        marginTop: 0,
      },
    },
    RaFormInput: {
      input: {
        width: "100%",
      },
    },
    RaFilterForm: {
      form: {
        minHeight: "auto",
        marginTop: "unset",
      },
    },
    RaListToolbar: {
      toolbar: {
        "@media (min-width: 0px)": {
          paddingLeft: 24,
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 8,
        marginBottom: 8,
      },
    },

    RaNotification: {
      success: {
        color: "#fff",
        backgroundColor: "var(--accent-color)",
      },
    },
    RaMenuItemLink: {
      root: {
        color: "#fff",
        overflow: "visible",
        "&:hover": {
          background: "#2D3D44",
        },
        "&.Mui-focusVisible": {
          background: "#2D3D44",
          ...outlineStyles,
        },
      },
      active: {
        color: "#fff",
        backgroundColor: "var(--accent-color)",
        position: "relative",
        fontWeight: 500,
        "&:focus": {
          ...outlineStyles,
        },
        "&:hover": {
          backgroundColor: "var(--accent-color-hover)",
        },
        "&.userMenu": {
          background: "var(--primary-bg)",
          color: "var(--primary-focus)",
          borderLeft: "none",
          "& .MuiListItemIcon-root": {
            color: "var(--primary-focus)",
          },
        },
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: "#D21C1C",
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "var(--primary-bg)",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "var(--primary-text-default)",
        fontWeight: 600,
      },
    },
    MuiListItem: {
      root: {
        color: "#fff",
        "&.userMenu .MuiListItemIcon-root": {
          color: "var(--secondary-color-main)",
        },
      },
    },
    MuiTab: {
      root: {
        color: "var(--secondary-color-main)",
        fontSize: 14,
        fontFamily: "inherit",
        "@media (min-width: 600px)": {
          minWidth: "unset",
        },
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "var(--secondary-color-main)",
        height: 3,
      },
    },
    MuiCheckbox: {
      root: {
        color: "#A5AFBB",
      },
    },
    MuiTypography: {
      body2: {
        fontFamily: "unset",
        color: "var(--primary-text-default)",
      },
    },
    RaDeleteWithUndoButton: {
      deleteButton: {
        background: "none",
      },
    },
    RaAutocompleteSuggestionList: {
      suggestionsPaper: {
        background: "#fff",
        padding: "8px 0px",
        boxShadow:
          "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
        "& .MuiListItem-root": {
          fontSize: 14,
          borderRadius: 4,
          fontWeight: 400,
          color: "var(--primary-text-default)",
          lineHeight: "20px",
          transition: "0.35s color ease, 0.35s background-color ease",
          margin: "4px 16px",
          "&:hover": {
            color: "var(--primary-focus)",
            backgroundColor: "var(--primary-bg)",
          },
        },
      },
    },
    RaAutocompleteSuggestionItem: {
      suggestion: {
        color: "var(--primary-text-default)",
      },
    },
    RaBulkDeleteWithUndoButton: {
      deleteButton: {
        background: "none",
      },
    },
    RaDatagrid: {
      headerCell: {},
      table: {
        userSelect: "unset",
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "unset",
      },
      body: {
        fontFamily: "unset",
      },
      sizeSmall: {
        padding: "11px 24px 11px 16px",
      },
    },
    RaSaveButton: {
      button: {
        color: "#fff",
      },
    },
    RaLogout: {
      menuItem: {
        color: "#fff",
      },
      icon: {
        color: "var(--secondary-color-main)",
      },
    },
    RaLayout: {
      content: {
        zIndex: 0,
        "@media (min-width: 576px)": {
          padding: 0,
        },
      },
      appFrame: {
        "@media (min-width: 0px)": {
          marginTop: 65,
        },
      },
      contentWithSidebar: {
        backgroundColor: "var(--secondary-color-main)",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        boxShadow:
          "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
        ...scrollBarStyles,
      },
    },
    RaSidebar: {
      root: {
        height: "calc(100vh - 65px)",
        [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
          height: "100vh",
        },
      },
      drawerPaper: {
        "@media (min-width: 0)": {
          backgroundColor: "var(--secondary-color-main)",
        },
      },
      fixed: {
        padding: "0 9.5px",
        display: "flex",
        flexDirection: "column",
        width: 216,
        "@media (min-width: 0)": {
          backgroundColor: "var(--secondary-color-main)",
        },
      },
    },
    MuiCardContent: {
      root: { padding: 0 },
    },
    MuiButton: {
      contained: {
        backgroundColor: "#fff",
        color: "#00A991",
        boxShadow: "none",
      },
      containedPrimary: {
        color: "#fff",
      },
      outlined: {
        borderColor: "#f5f5f5",
      },
      textPrimary: {
        color: "#fff",
        backgroundColor: "#00A991",
        "&:hover": {
          backgroundColor: "#009481",
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#fff",
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: "unset",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
      },
    },
    MuiPopover: {
      paper: {
        boxShadow:
          "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
        "&::-webkit-scrollbar": {
          width: 15,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
          borderRadius: 7,
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#E7E9E9",
          backgroundClip: "padding-box",
          borderRadius: 20,
          border: "4px solid transparent",
        },
      },
    },
    MuiMenu: {
      list: {
        borderRadius: 4,
        padding: "8px 16px",
        "& .MuiListItem-root": {
          fontSize: 14,
          borderRadius: 4,
          color: "var(--primary-text-default)",
          fontWeight: 400,
          lineHeight: "20px",
          transition: "0.35s color ease, 0.35s background-color ease",
          margin: "8px 0",
          overflow: "visible",
          "&:last-child": {
            marginBottom: 0,
          },
          "&.Mui-selected": {
            ...outlineStyles,
            color: "var(--primary-focus)",
            backgroundColor: "var(--primary-bg)",
          },
          "&.Mui-selected:hover": {
            color: "var(--primary-focus)",
            backgroundColor: "var(--primary-bg)",
          },
          "&:hover": {
            color: "var(--primary-focus)",
            backgroundColor: "var(--primary-bg)",
          },
        },
      },
    },
    // for loaders in table
    RaPlaceholder: {
      root: {
        background: "var(--secondary-gradient)",
      },
    },
    MuiAppBar: {
      colorSecondary: {
        backgroundColor: "var(--secondary-color-main)",
        borderColor: "var(--secondary-color-main)",
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: "#f5f5f5",
      },
      barColorPrimary: {
        backgroundColor: "#d7d7d7",
      },
    },
  },
};
