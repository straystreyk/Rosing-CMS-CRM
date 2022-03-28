import * as React from "react";
import { makeStyles } from "@material-ui/core";

interface MainLoaderProps {
  size: number;
  centered?: boolean;
  flex?: boolean;
}

const useStyles = makeStyles({
  MainLoader: {
    "& svg": {
      width: "100%",
      height: "auto",
      animation: "circular 1s linear infinite",
    },
  },
});

export const MainLoader: React.FC<MainLoaderProps> = ({ size, centered, flex }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: flex ? "flex" : "inherit",
        width: size,
        height: size,
        margin: centered ? "0 auto" : "5px 0px",
      }}
      className={classes.MainLoader}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.51267 0.456633C8.32363 -0.110247 10.2585 -0.150153 12.0913 0.341577C13.9241 0.833307 15.5792 1.83637 16.8632 3.23361C18.1472 4.63086 19.0071 6.36459 19.3425 8.23233C19.678 10.1001 19.475 12.0247 18.7575 13.7814C18.0399 15.5381 16.8373 17.0544 15.2902 18.1531C13.743 19.2519 11.9152 19.8878 10.0201 19.9865C8.12509 20.0852 6.24108 19.6426 4.58815 18.7106C2.93523 17.7785 1.58162 16.3953 0.685442 14.7227L2.44835 13.7781C3.1653 15.1163 4.24818 16.2228 5.57052 16.9684C6.89286 17.7141 8.40007 18.0681 9.91611 17.9892C11.4321 17.9102 12.8944 17.4015 14.1321 16.5225C15.3699 15.6435 16.3319 14.4305 16.906 13.0251C17.48 11.6197 17.6424 10.08 17.374 8.58586C17.1057 7.09168 16.4177 5.70469 15.3905 4.58689C14.3633 3.4691 13.0393 2.66665 11.573 2.27326C10.1068 1.87988 8.55891 1.9118 7.11014 2.36531L6.51267 0.456633Z"
          fill="url(#paint0_linear_2136_9986)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2136_9986"
            x1="-0.0934959"
            y1="8.77193"
            x2="19.5024"
            y2="8.88497"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFD9" />
            <stop offset="0.684233" stopColor="#00C0FF" />
            <stop offset="1" stopColor="var(--primary-focus)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
