import * as React from "react";
import { SaveButton as SaveButtonRA, SaveButtonProps as SaveButtonPropsRA } from "ra-ui-materialui";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";
import cn from "classnames";

interface SaveButtonProps extends SaveButtonPropsRA {
  onMobileText?: boolean;
}

const useStyles = makeStyles({
  SaveButton: {
    fontFamily: "var(--font-family)",
    "& svg": {
      marginLeft: 0,
      marginRight: 6,
    },
    "& span": {
      fontSize: 14,
      lineHeight: "20px",
    },
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
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
