import * as React from "react";
import cn from "classnames";

import { Button, ButtonProps, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { MEDIA_QUERIES_BREAKPOINTS } from "../../../../constants/style-constants";
import { StandardButtonStyles } from "./styles";

export interface StandardButtonProps extends Omit<ButtonProps, "variant"> {
  buttonType: "primary" | "secondary" | "additional-red";
  variant?: "text" | "outlined" | "contained" | "textWithBg" | "icon" | undefined;
  component?: any;
  to?: string;
  target?: "_blank" | "_parent" | "_self";
  text?: string;
  onMobileView?: boolean;
}

const useStyles = makeStyles(StandardButtonStyles);

const ALL_BUTTON_COLORS = {
  primary: "var(--accent-color)",
  secondary: "var(--primary-button-default)",
  "additional-red": "var(--additional-red-default)",
};

export const StandardButton: React.FC<StandardButtonProps> = ({
  children,
  color,
  variant,
  startIcon,
  onClick,
  endIcon,
  className,
  style,
  text,
  onMobileView,
  component,
  buttonType,
  ...props
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`);

  return (
    <Button
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{
        color: buttonType ? ALL_BUTTON_COLORS[buttonType] : "",
        ...style,
      }}
      className={cn(
        classes.StandardButton,
        "StandardButton",
        buttonType,
        variant,
        isMobile && onMobileView && classes.MobileView,
        className && className
      )}
      component={component}
      {...props}
    >
      {isMobile && onMobileView ? null : text}
      {children}
    </Button>
  );
};
