import * as React from "react";
import { InformationIcon } from "../../../constants/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  InformationWrapper: {
    position: "relative",
    display: "flex",
    "& svg": {
      cursor: "pointer",
      "&:hover + div": {
        opacity: 1,
        transform: "translate(-10%, -50%)",
        pointerEvents: "all",
      },
    },
  },
  Info: {
    position: "absolute",
    top: "50%",
    right: "0",
    color: "#fff",
    background: "#27353C",
    fontWeight: 500,
    zIndex: 2,
    fontSize: 12,
    lineHeight: "16px",
    width: 265,
    opacity: 0,
    pointerEvents: "none",
    transition: "0.35s all ease",
    transform: "translate(-20%, -50%)",
    padding: "8px 12px",
    borderRadius: 4,
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 2,
      transform: "translate(3px, -50%) rotate(45deg)",
      background: "#27353C",
    },
    "@media(max-width: 576px)": {
      width: 200,
      zIndex: 5,
    },
  },
});

export const InfoComponent: React.FC<{ color: string; info: string }> = ({ color, info }) => {
  const classes = useStyles();
  return (
    <span className={classes.InformationWrapper}>
      <InformationIcon color={color} />
      <div className={classes.Info}>{info}</div>
    </span>
  );
};
