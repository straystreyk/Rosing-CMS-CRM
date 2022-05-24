import * as React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";

interface StandardButtonProps extends Omit<ButtonProps, "variant"> {
  customColor?: string;
  variant?: "text" | "outlined" | "contained" | "textWithBg" | "icon" | undefined;
  component?: any;
  to?: string;
}

const useStyles = makeStyles({
  StandardButton: {
    padding: "8px 20px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "var(--font-family)",
    lineHeight: "20px",
    "& .MuiButton-label > .MuiButton-startIcon": {
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
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{ color: customColor ? customColor : "", ...style }}
      className={cn(
        classes.StandardButton,
        "StandardButton",
        variant === "text" && classes.TextButton,
        variant === "textWithBg" && classes.TextWithBG,
        variant === "icon" && classes.IconStyle,
        className && className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
