import * as React from "react";
import cn from "classnames";

import { Button, ButtonProps, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { MEDIA_QUERIES_BREAKPOINTS } from "../../../../constants/style-constants";
import { StandardButtonStyles } from "./styles";

export type ButtonTypes = "primary" | "secondary" | "additional-red";

export interface StandardButtonProps extends Omit<ButtonProps, "variant"> {
  buttonType: ButtonTypes;
  variant?: "text" | "outlined" | "contained" | "icon";
  component?: any;
  to?: string;
  target?: "_blank" | "_parent" | "_self";
  text?: string;
  onMobileView?: boolean;
}

const useStyles = makeStyles(StandardButtonStyles);

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
  to,
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
        ...style,
      }}
      className={cn(
        classes.StandardButton,
        classes[buttonType],
        variant,
        "StandardButton",
        isMobile && onMobileView && classes.MobileView,
        className && className
      )}
      to={to}
      component={component}
      {...props}
    >
      {isMobile && onMobileView ? null : text}
      {children}
    </Button>
  );
};
