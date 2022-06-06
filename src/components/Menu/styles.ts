export const LineStyles = {
  margin: "5px 0 8px 0",
  height: 1,
  backgroundColor: "#27353C",
  flexShrink: 0,
};

export const LineCloseStyles = {
  maxWidth: 36,
};

export const MenuItemLinkStyles = {
  maxHeight: 28,
  borderRadius: 5,
  padding: "4px 0",
  margin: "4px 0",
  flexShrink: 0,
  minHeight: "auto",
  "& .MuiListItemIcon-root": {
    minWidth: "auto",
    marginRight: 6,
    padding: "4px 8px",
    height: 20,
    maxWidth: 20,
    borderRadius: 4,
    transition: "0.35s all ease",
    "& svg": {
      width: "100%",
      height: "auto",
    },
  },
};

export const MenuItemLinkCloseStyles = {
  color: "var(--secondary-color-main)",
  maxWidth: 36,
  "& .MuiTouchRipple-root": {
    display: "none",
  },
  "& .MuiListItemIcon-root:hover": {
    background: "#2D3D44",
  },
  "&:hover": {
    background: "none",
  },
  '&[class*="RaMenuItemLink-active"]': {
    backgroundColor: "unset",
  },
  '&[class*="RaMenuItemLink-active"]:focus': {
    outline: "none",
  },
  '&[class*="RaMenuItemLink-active"] .MuiListItemIcon-root': {
    backgroundColor: "var(--accent-color)",
  },
  '&[class*="RaMenuItemLink-active"] .MuiListItemIcon-root:hover': {
    backgroundColor: "var(--accent-color-hover)",
  },
};
