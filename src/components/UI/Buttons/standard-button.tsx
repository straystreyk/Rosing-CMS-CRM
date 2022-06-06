import * as React from "react";
import cn from "classnames";

import { Button, ButtonProps, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";

interface StandardButtonProps extends Omit<ButtonProps, "variant"> {
  customColor?: string;
  variant?: "text" | "outlined" | "contained" | "textWithBg" | "icon" | undefined;
  component?: any;
  to?: string;
  target?: "_blank" | "_parent" | "_self";
  text?: string;
  onMobileView?: boolean;
}

const useStyles = makeStyles({
  StandardButton: {
    padding: "8px 16px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "var(--font-family)",
    lineHeight: "20px",
    "&.MuiButton-textPrimary": {
      "&:hover": {
        backgroundColor: "var(--accent-color-hover)",
      },
    },
    "& .MuiButton-label": {
      fontWeight: 500,
      "& > .MuiButton-startIcon": {
        marginRight: 6,
        marginLeft: 0,
        display: "flex",
        width: 20,
        height: 20,
        alignItems: "center",
        "& svg": {
          width: "100%",
        },
      },
      "&:focus": {
        outline: "2px solid #7FC5FF",
        outlineOffset: "2px",
      },
      "& > .MuiButton-endIcon": {
        marginRight: 0,
      },
    },
  },
  TextButton: {
    padding: "4px 6px",
    backgroundColor: "unset !important",
  },
  TextWithBG: {
    padding: "4px 6px",
  },
  IconStyle: {
    padding: "4px 6px",
    minWidth: "unset",
  },
  MobileView: {
    minWidth: "unset",
    "& .MuiButton-label > .MuiButton-startIcon": {
      margin: 0,
    },
  },
  OutlineStyle: {
    padding: "5px 16px",
  },
});

export const StandardButton: React.FC<StandardButtonProps> = ({
  children,
  color,
  customColor,
  variant,
  startIcon,
  onClick,
  endIcon,
  className,
  style,
  text,
  onMobileView,
  ...props
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`);

  return (
    <Button
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{
        color: customColor ? customColor : "",
        border: variant === "outlined" ? `1px solid ${customColor}` : "",
        ...style,
      }}
      className={cn(
        classes.StandardButton,
        "StandardButton",
        variant === "text" && classes.TextButton,
        variant === "textWithBg" && classes.TextWithBG,
        variant === "icon" && classes.IconStyle,
        variant === "outlined" && classes.OutlineStyle,
        isMobile && onMobileView && classes.MobileView,
        className && className
      )}
      {...props}
    >
      {isMobile && onMobileView ? null : text}
      {children}
    </Button>
  );
};
