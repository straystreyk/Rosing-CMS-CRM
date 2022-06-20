import * as React from "react";
import cn from "classnames";
import { SaveButton as SaveButtonRA, SaveButtonProps as SaveButtonPropsRA } from "ra-ui-materialui";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";
import { outlineStyles } from "../../Themes/main-styles";

interface SaveButtonProps extends SaveButtonPropsRA {
  onMobileText?: boolean;
}

const useStyles = makeStyles({
  SaveButton: {
    fontFamily: "var(--font-family)",
    padding: "8px 18px",
    minWidth: "unset",
    "&:hover": {
      backgroundColor: "var(--accent-color-hover)",
      boxShadow: "unset",
    },
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
      width: 20,
    },
    "& span": {
      fontSize: 14,
      lineHeight: "20px",
    },
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:focus": outlineStyles,
  },
  SaveButtonMobile: {
    "& svg": {
      marginRight: 0,
    },
  },
});

export const SaveButton: React.FC<SaveButtonProps> = ({
  startIcon,
  icon,
  label,
  basePath,
  endIcon,
  onMobileText,
  ...props
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`);

  return (
    <SaveButtonRA
      className={cn(classes.SaveButton, !isMobile || onMobileText ? "" : classes.SaveButtonMobile)}
      endIcon={endIcon}
      startIcon={startIcon}
      basePath={basePath}
      label={!isMobile || onMobileText ? label : ""}
      icon={icon}
      {...props}
    />
  );
};
