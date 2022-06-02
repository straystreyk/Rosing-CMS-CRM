import * as React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface MainLoaderProps {
  size: number | string;
  centered?: boolean;
  flex?: boolean;
  component?: React.ElementType;
  display?: string;
}

const useStyles = makeStyles({
  bottom: {
    color: "var(--secondary-color-default)",
  },
  top: {
    color: "var(--accent-color)",
    borderRadius: "50%",
    animationDuration: "750ms",
    position: "absolute",
  },
});

export const MainLoader: React.FC<MainLoaderProps> = ({
  size,
  centered,
  flex,
  display = "inherit",
  component: Component = "div",
}) => {
  const classes = useStyles();

  return (
    <Component
      style={{ display: flex ? "flex" : display, margin: centered ? "0 auto" : "5px 0px" }}
    >
      <CircularProgress
        className={classes.bottom}
        variant="determinate"
        size={50}
        thickness={4}
        value={100}
      />
      <CircularProgress variant="indeterminate" className={classes.top} size={50} thickness={4} />
    </Component>
  );
};
