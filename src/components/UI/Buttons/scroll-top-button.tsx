import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { StandardButton } from "./standard-button";

const MIN_PX_TO_SHOW = 150;

const useStyles = makeStyles({
  ScrollButton: {
    padding: 10,
    position: "fixed",
    zIndex: 11,
    bottom: "5vh",
    right: 24,
    background: "linear-gradient(90.33deg, #00FFD9 2.27%, #00C0FF 68.93%, #008DFF 99.69%)",
    boxShadow: "0px 3px 12px -1px rgba(28, 52, 84, 0.1), 0px 2px 4px -1px rgba(28, 55, 90, 0.05)",
    borderRadius: 200,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "none",
    fontFamily: "var(--font-family)",
    transition: "0.35s opacity ease",
    minWidth: "auto",
    "& .MuiButton-label": {
      "& > span:first-child": {
        margin: 0,
      },
      "& > span:last-child": {
        padding: 0,
      },
    },
  },
});

const ScrollTopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.35" transform="rotate(-90 8 8)" stroke="white" strokeWidth="1.3" />
    <line
      x1="5.38281"
      y1="7.15303"
      x2="7.99911"
      y2="4.53673"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <line
      x1="0.65"
      y1="-0.65"
      x2="4.35"
      y2="-0.65"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10.6152 8.07227)"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path d="M8 11.5469L8 4.54688" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const ScrollTopButton: React.FC = () => {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);

  const checkButton = () => {
    if (window.scrollY > MIN_PX_TO_SHOW && !visible) {
      setVisible(true);
    } else if (window.scrollY <= MIN_PX_TO_SHOW && visible) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", checkButton);

    return () => {
      window.removeEventListener("scroll", checkButton);
    };
  }, [checkButton]);

  return (
    <StandardButton
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={classes.ScrollButton}
    >
      <ScrollTopIcon />
    </StandardButton>
  );
};
