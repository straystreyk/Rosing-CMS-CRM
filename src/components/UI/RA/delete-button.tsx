import * as React from "react";
import { DeleteButton as DeleteButtonRA, DeleteButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { DeleteIcon } from "../../../constants/icons";
import cn from "classnames";

const useStyles = makeStyles({
  DeleteButton: {
    color: "#D21C1C",
    padding: "4px 6px",
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
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
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
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
      icon={<DeleteIcon color="#D21C1C" />}
      basePath={basePath}
      className={cn(classes.DeleteButton, "DeleteButton", variant === "text" && classes.TextButton)}
      {...props}
    />
  );
};
