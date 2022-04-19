import * as React from "react";
import {
  CreateButton as CreateButtonRA,
  CreateButtonProps as CreateButtonPropsRA,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

const useStyles = makeStyles({
  CreateButton: {
    "& .MuiButton-label": {
      "& svg": {
        marginRight: 6,
      },
      "& span": {
        paddingLeft: 0,
        textTransform: "none",
        fontFamily: "Gilroy, sans-serif",
        fontSize: 14,
      },
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
  CreateButtonText: {
    padding: "4px 5px",
    "&.MuiButtonBase-root": {
      backgroundColor: "unset",
    },
  },
});

interface CreateButtonProps extends CreateButtonPropsRA {
  customColor?: string;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
  basePath,
  endIcon,
  label,
  to,
  customColor,
  color,
  variant,
  icon,
}) => {
  const classes = useStyles();

  return (
    <CreateButtonRA
      icon={icon}
      endIcon={endIcon}
      className={cn(classes.CreateButton, variant === "text" && classes.CreateButtonText)}
      to={to}
      style={{ color: customColor ?? "" }}
      color={color}
      basePath={basePath}
      label={label}
    />
  );
};
