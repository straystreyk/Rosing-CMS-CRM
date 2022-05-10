export const outlineStyles = {
  "&::after": {
    position: "absolute",
    content: "''",
    top: -4,
    left: -4,
    width: "calc(100% + 4px)",
    height: "calc(100% + 4px)",
    border: "2px solid #7FC5FF",
    borderRadius: 8,
    zIndex: 1,
  },
};

export const scrollBarStyles = {
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
};
