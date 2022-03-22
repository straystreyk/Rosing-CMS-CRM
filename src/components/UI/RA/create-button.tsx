import * as React from "react";
import { CreateButton as CreateButtonRA, CreateButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  CreateButton: {
    padding: "8px 16px",
    fontFamily: "Gilroy, sans-serif",
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
    },
    "& span": {
      fontSize: 14,
      padding: 0,
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

export const CreateButton: React.FC<CreateButtonProps> = ({
  basePath,
  endIcon,
  startIcon,
  label,
  icon,
}) => {
  const classes = useStyles();

  return (
    <CreateButtonRA
      icon={icon}
      endIcon={endIcon}
      className={classes.CreateButton}
      basePath={basePath}
      startIcon={startIcon}
      label={label}
    />
  );
};
