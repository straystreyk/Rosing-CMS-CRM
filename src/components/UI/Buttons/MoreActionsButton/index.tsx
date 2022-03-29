import * as React from "react";
import cn from "classnames";
import { IconProps } from "../../../../constants/icons";

import classes from "./index.module.css";

const MoreActionsButtonIcon = ({ color }: IconProps) => (
  <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.00032" cy="2.0002" r="1.05" fill={color} />
    <circle cx="1.9001" cy="2.0002" r="1.05" fill={color} />
    <circle cx="10.1003" cy="2.0002" r="1.05" fill={color} />
  </svg>
);

export const MoreActionsButton: React.FC = ({ children }) => {
  const [active, setActive] = React.useState(false);

  const handleClick = React.useCallback((e) => {
    setActive((p) => !p);
  }, []);

  return (
    <div className={cn(classes.MoreActionsButtonWrapper, active && classes.active)}>
      <button onClick={handleClick} className={classes.MoreActionsButton}>
        <MoreActionsButtonIcon color="var(--primary-button-default)" />
      </button>
      <div className={classes.MoreActionsPopup}>
        {React.Children.map(children, (child) => {
          return <div>{child}</div>;
        })}
      </div>
    </div>
  );
};
