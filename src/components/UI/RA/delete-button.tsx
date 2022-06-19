import * as React from "react";
import { DeleteButton as DeleteButtonRA, DeleteButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { DeleteIcon } from "../../../constants/icons";
import cn from "classnames";

const useStyles = makeStyles({
  DeleteButton: {
    color: "var(--additional-red-default)",
    padding: "4px 6px",
    transition: "0.35s color ease",
    "& svg": {
      marginLeft: 0,
      marginRight: 4,
      width: 20,
      flexShrink: 0,
    },
    "& span": {
      fontSize: 14,
      lineHeight: "20px",
      padding: 0,
    },
    "& .MuiButton-label": {
      textTransform: "none",
      fontFamily: "var(--font-family)",
      justifyContent: "flex-start",
    },
    "&:focus": {
      outline: "2px solid var(--primary-focus-2)",
      outlineOffset: "2px",
    },
    "&:hover": {
      color: "var(--additional-red-hover)",
      backgroundColor: "transparent",
    },
  },
  TextButton: {
    padding: "4px 6px",
    backgroundColor: "unset !important",
  },
});

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  icon,
  basePath,
  variant,
  ...props
}) => {
  const classes = useStyles();

  return (
    <DeleteButtonRA
      icon={<DeleteIcon />}
      basePath={basePath}
      className={cn(classes.DeleteButton, "DeleteButton", variant === "text" && classes.TextButton)}
      {...props}
    />
  );
};
