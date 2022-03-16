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
        backgroundColor: "#0F1F26",
      },
      arrow: {
        color: "#0F1F26",
      },
    },
    RaCreate: {
      noActions: {
        "@media (min-width: 600px)": {
          marginTop: 0,
        },
      },
    },
    RaFormInput: {
      input: {
        width: "100%",
      },
    },
    RaListToolbar: {
      toolbar: {
        "@media (min-width: 0px)": {
          paddingLeft: 24,
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
        backgroundColor: "#00A991",
      },
    },
    RaMenuItemLink: {
      root: {
        color: "#fff",
        "&:hover": {
          background: "#2D3D44",
        },
      },
      active: {
        color: "#fff",
        backgroundColor: "#00A991",
        "&:focus": {
          outline: "2px solid #7FC5FF",
          outlineOffset: "2px",
        },
        "&:hover": {
          backgroundColor: "#00D6B5",
        },
        "&.userMenu": {
          background: "#F0F8FF",
          color: "#008DFF",
          borderLeft: "none",
          "& .MuiListItemIcon-root": {
            color: "#008DFF",
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
        backgroundColor: "#F2F7FB",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "#023864",
        fontWeight: 600,
      },
    },
    MuiListItem: {
      root: {
        color: "#fff",
        "&.userMenu .MuiListItemIcon-root": {
          color: "#0f1f26",
        },
      },
    },
    MuiTab: {
      root: {
        color: "#0f1f26",
        fontSize: 14,
        fontFamily: "inherit",
        "@media (min-width: 600px)": {
          minWidth: "unset",
        },
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#0f1f26",
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
        color: "#023864",
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
          color: "#023864",
          lineHeight: "20px",
          transition: "0.35s color ease, 0.35s background-color ease",
          margin: "4px 16px",
          "&:hover": {
            color: "#008DFF",
            backgroundColor: "#F0F8FF",
          },
        },
      },
    },
    RaAutocompleteSuggestionItem: {
      suggestion: {
        color: "#023864",
      },
    },
    RaBulkDeleteWithUndoButton: {
      deleteButton: {
        background: "none",
      },
    },
    RaDatagrid: {
      headerCell: {
        backgroundColor: "#F2F7FB",
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
        color: "#0f1f26",
      },
    },
    RaLayout: {
      content: {
        zIndex: 0,
        "@media (min-width: 576px)": {
          padding: 0,
        },
      },
      contentWithSidebar: {
        backgroundColor: "#0f1f26",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
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
    RaSidebar: {
      drawerPaper: {
        "@media (min-width: 0)": {
          backgroundColor: "#0f1f26",
        },
      },
      fixed: {
        padding: "0 12px",
        display: "flex",
        flexDirection: "column",
        width: 216,
        "@media (min-width: 0)": {
          backgroundColor: "#0f1f26",
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
          color: "#023864",
          lineHeight: "20px",
          transition: "0.35s color ease, 0.35s background-color ease",
          margin: "8px 0",
          "&.Mui-selected": {
            color: "#008DFF",
            backgroundColor: "#F0F8FF",
            outline: "2px solid #7FC5FF",
            outlineOffset: "2px",
          },
          "&.Mui-selected:hover": {
            color: "#008DFF",
            backgroundColor: "#F0F8FF",
          },
          "&:hover": {
            color: "#008DFF",
            backgroundColor: "#F0F8FF",
          },
        },
      },
    },
    MuiAppBar: {
      colorSecondary: {
        backgroundColor: "#0f1f26",
        borderColor: "#0f1f26",
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
    // MuiFilledInput: {
    //   root: {
    //     backgroundColor: 'rgba(35,35,35,0.04)',
    //     '&$disabled': {
    //       backgroundColor: 'rgba(0, 0, 0, 0.04)',
    //     },
    //   },
    // },
  },
};
