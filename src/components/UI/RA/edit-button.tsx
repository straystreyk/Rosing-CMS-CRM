import * as React from "react";
import { EditButton as EditButtonRA, EditButtonProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { EditIcon } from "../../../constants/icons";

const useStyles = makeStyles({
  EditButton: {
    color: "var(--primary-button-default)",
    padding: "2px 5px",
    minWidth: "auto",
    transition: "0.35s color ease, 0.35s background-color ease",
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
      width: 20,
      height: 20,
    },
    "& span": {
      fontSize: 14,
      lineHeight: "20px",
      padding: 0,
    },
    "& .MuiButton-label": {
      textTransform: "none",
      justifyContent: "flex-start",
      fontFamily: "var(--font-family)",
    },
    "&:focus": {
      outline: "2px solid var(--primary-focus-2)",
      outlineOffset: "2px",
    },
    "&:hover": {
      backgroundColor: "var(--primary-bg-2)",
      color: "var(--primary-focus)",
    },
  },
});

export const EditButton: React.FC<EditButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <EditButtonRA {...props} icon={<EditIcon />} className={classes.EditButton} label="Edit" />
  );
};
