import * as React from "react";
import { makeStyles } from "@material-ui/core";

interface MainLoaderProps {
  size: number | string;
  centered?: boolean;
  flex?: boolean;
  component?: React.ElementType;
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

export const MainLoader: React.FC<MainLoaderProps> = ({
  size,
  centered,
  flex,
  component = "div",
}) => {
  const classes = useStyles();

  return (
    <div style={{ display: flex ? "flex" : "inherit", margin: centered ? "0 auto" : "5px 0px" }}>
      <div
        style={{
          width: size,
          height: size,
        }}
        className={classes.MainLoader}
      >
        <svg
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.3114 1.41097C6.14642 0.883904 6.43947 0.317605 6.98037 0.206063C8.5024 -0.107802 10.0815 -0.0634995 11.5913 0.341577C13.4241 0.833307 15.0792 1.83637 16.3632 3.23361C17.6472 4.63086 18.5071 6.36459 18.8425 8.23233C19.178 10.1001 18.975 12.0247 18.2575 13.7814C17.5399 15.5381 16.3373 17.0544 14.7902 18.1531C13.243 19.2519 11.4152 19.8878 9.52014 19.9865C7.62509 20.0852 5.74108 19.6426 4.08815 18.7106C2.72651 17.9427 1.56799 16.8688 0.70097 15.5791C0.392847 15.1207 0.580083 14.5112 1.0669 14.2504C1.55371 13.9896 2.15493 14.1773 2.47442 14.6278C3.1543 15.5865 4.03965 16.3871 5.07052 16.9684C6.39286 17.7141 7.90007 18.0681 9.41611 17.9892C10.9321 17.9102 12.3944 17.4015 13.6321 16.5225C14.8699 15.6435 15.8319 14.4305 16.406 13.0251C16.98 11.6197 17.1424 10.08 16.874 8.58586C16.6057 7.09168 15.9177 5.70469 14.8905 4.58689C13.8633 3.4691 12.5393 2.66665 11.073 2.27326C9.92999 1.96659 8.73731 1.91839 7.58065 2.12691C7.03713 2.2249 6.47639 1.93804 6.3114 1.41097Z"
            fill="url(#paint0_linear_2932_8890)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2932_8890"
              x1="-0.593496"
              y1="8.77193"
              x2="19.0024"
              y2="8.88497"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00FFD9" />
              <stop offset="0.684233" stopColor="#00C0FF" />
              <stop offset="1" stopColor="#008DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
