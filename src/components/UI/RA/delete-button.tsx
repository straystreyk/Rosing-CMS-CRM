import * as React from "react";
import { DeleteButton as DeleteButtonRA, DeleteButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { DeleteIcon } from "../../../constants/icons";

const useStyles = makeStyles({
  DeleteButton: {
    color: "#D21C1C",
    padding: "2px 5px",
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
      fontFamily: "Gilroy, sans-serif",
      justifyContent: "flex-start",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
});

export const DeleteButton: React.FC<DeleteButtonProps> = ({ icon, basePath, ...props }) => {
  const classes = useStyles();

  return (
    <DeleteButtonRA
      icon={<DeleteIcon color="#D21C1C" />}
      basePath={basePath}
      className={classes.DeleteButton}
      {...props}
    />
  );
};
