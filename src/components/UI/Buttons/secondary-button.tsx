import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

interface ButtonSecondary {
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const useStyles = makeStyles({
  SecondaryButton: {
    color: "#005AA3",
    padding: "8px 20px",
    fontSize: "14px",
    maxHeight: 36,
    textTransform: "none",
    border: "1px solid #005AA3",
    transition: "0.35s color ease, 0.35s border ease",
    "& .text-custom-btn": {
      lineHeight: "20px",
      fontFamily: "var(--font-family)",
    },
    "& .MuiButton-startIcon svg circle": {
      transition: "0.35s all ease",
    },
    "& .MuiButton-startIcon svg line": {
      transition: "0.35s all ease",
    },
    "& .MuiButton-label > .MuiButton-startIcon": {
      marginRight: 6,
    },
    "&:hover": {
      border: "1px solid var(--primary-focus)",
      color: "var(--primary-focus)",
      background: "transparent",
      "& .MuiButton-startIcon svg circle": {
        stroke: "var(--primary-focus)",
      },
      "& .MuiButton-startIcon svg line": {
        stroke: "var(--primary-focus)",
      },
    },
    "&:focus": {
      outline: "2px solid var(--primary-focus-2)",
      outlineOffset: "2px",
    },
  },
});

export const SecondaryButton: React.FC<ButtonSecondary> = ({
  startIcon,
  endIcon,
  text,
  className,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Button
      color="secondary"
      variant="outlined"
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={className ? classes.SecondaryButton + " " + className : classes.SecondaryButton}
    >
      <span className="text-custom-btn">{text}</span>
    </Button>
  );
};
