import * as React from "react";
import { EditButton as EditButtonRA, EditButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { EditIcon } from "../../../constants/icons";

const useStyles = makeStyles({
  EditButton: {
    color: "#005AA3",
    padding: "2px 5px",
    minWidth: "auto",
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
      justifyContent: "flex-start",
      fontFamily: "Gilroy, sans-serif",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
});

export const EditButton: React.FC<EditButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <EditButtonRA
      {...props}
      icon={<EditIcon color="#005AA3" />}
      className={classes.EditButton}
      label="Edit"
    />
  );
};
