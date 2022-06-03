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
  TopCircleAnimate: {
    animation: `$myEffect 2000ms linear  infinite`,
  },
  TopCircleSvgAnimate: {
    animation: `$rotate 1200ms linear infinite`,
    display: "block",
  },
  BottomCircle: {
    stroke: "var(--secondary-color-default)",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
  "@keyframes myEffect": {
    "0%": {
      strokeDasharray: "0px, 200px",
      strokeDashoffset: 0,
    },
    "50%": {
      strokeDasharray: "100px, 200px",
      strokeDashoffset: "-15px",
    },
    "100%": {
      strokeDasharray: "200px, 200px",
      strokeDashoffset: "-125px",
    },
  },
  "@keyframes rotate": {
    "0% ": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

const Loader = ({ size = 22 }: { size?: number }) => {
  const classes = useStyles();
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox="22 22 44 44" className={classes.TopCircleSvgAnimate}>
        <defs>
          <linearGradient id="R_MAIN_GRADIENT">
            <stop offset="2.27%" stopColor="#00FFD9" />
            <stop offset="68.93%" stopColor="#00C0FF" />
            <stop offset="99.69%" stopColor="#008DFF" />
          </linearGradient>
        </defs>
        <circle
          style={{ stroke: "url(#R_MAIN_GRADIENT)" }}
          className={classes.TopCircleAnimate}
          cx="44"
          cy="44"
          r="20"
          fill="none"
          strokeWidth="4"
        ></circle>
      </svg>
      <svg viewBox="22 22 44 44" className={classes.BottomCircle}>
        <circle cx="44" cy="44" r="20" fill="none" strokeWidth="4"></circle>
      </svg>
    </div>
  );
};

export const MainLoader: React.FC<MainLoaderProps> = ({
  size,
  centered,
  flex,
  display = "inherit",
  component: Component = "div",
}) => {
  return (
    <>
      <Component
        style={{ display: flex ? "flex" : display, margin: centered ? "0 auto" : "5px 0px" }}
      >
        <Loader size={+size} />
      </Component>
    </>
  );
};
