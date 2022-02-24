import * as React from "react";
import { SaveButton as SaveButtonRA, SaveButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  SaveButton: {
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
    },
    "& span": {
      fontSize: 14,
    },
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
});

export const SaveButton: React.FC<SaveButtonProps> = ({
  startIcon,
  icon,
  label,
  basePath,
  endIcon,
  ...props
}) => {
  const classes = useStyles();

  return (
    <SaveButtonRA
      className={classes.SaveButton}
      endIcon={endIcon}
      startIcon={startIcon}
      basePath={basePath}
      label={label}
      icon={icon}
      {...props}
    />
  );
};
