import * as React from "react";
import cn from "classnames";
import { ExportButton as ExportButtonRA, ExportButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  ExportButton: {
    "& .MuiButton-label": {
      "& svg": {
        marginRight: 6,
      },
      "& span": {
        paddingLeft: 0,
        textTransform: "none",
        fontFamily: "var(--font-family)",
      },
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
  ExportButtonText: {
    "&.MuiButtonBase-root": {
      backgroundColor: "unset",
    },
  },
});

export const ExportButton: React.FC<ExportButtonProps> = ({
  label,
  basePath,
  endIcon,
  variant,
  color,
  icon,
}) => {
  const classes = useStyles();

  return (
    <ExportButtonRA
      className={cn(classes.ExportButton, variant === "text" && classes.ExportButtonText)}
      endIcon={endIcon}
      variant={variant}
      color={color}
      basePath={basePath}
      label={label}
      icon={icon}
    />
  );
};
