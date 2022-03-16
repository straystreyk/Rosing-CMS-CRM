import * as React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";

interface StandardButtonProps extends ButtonProps {
  customColor?: string;
}

const useStyles = makeStyles({
  StandardButton: {
    padding: "8px 20px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Gilroy, sans-serif",
    lineHeight: "20px",
    "& .MuiButton-label > .MuiButton-startIcon": {
      marginRight: 6,
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
});

export const StandardButton: React.FC<StandardButtonProps> = ({
  children,
  color,
  customColor,
  variant,
  startIcon,
  onClick,
  endIcon,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      color={color}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{ color: customColor ? customColor : "" }}
      className={cn(
        classes.StandardButton,
        "StandardButton",
        variant === "text" && classes.TextButton
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
