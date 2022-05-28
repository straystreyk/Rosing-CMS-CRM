import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonProps } from "@material-ui/core";
import cn from "classnames";

interface PrimaryButton extends ButtonProps {
  text?: string;
}

const useStyles = makeStyles({
  ButtonPrimary: {
    color: "#fff",
    padding: "8px 20px",
    position: "relative",
    fontSize: "14px",
    textTransform: "none",
    "& .text-custom-btn": {
      lineHeight: "20px",
      fontFamily: "Gilroy, sans-serif",
    },
    "& .MuiButton-label > .MuiButton-startIcon": {
      marginRight: 6,
    },
    "&:hover": {
      backgroundColor: "var(--accent-color-hover)",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
});

export const ButtonPrimary: React.FC<PrimaryButton> = ({
  startIcon,
  endIcon,
  text,
  className,
  children,
  variant,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      variant={variant ?? "contained"}
      startIcon={startIcon}
      endIcon={endIcon}
      className={cn(className && className, classes.ButtonPrimary)}
      {...props}
    >
      <span className="text-custom-btn">{text}</span>
      {children}
    </Button>
  );
};
