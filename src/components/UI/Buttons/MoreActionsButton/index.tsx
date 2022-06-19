import * as React from "react";
import cn from "classnames";

import { Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { IconProps } from "../../../../constants/icons";
import { MoreActionsButtonStyles } from "./styles";

const useStyles = makeStyles(MoreActionsButtonStyles);

const MoreActionsButtonIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.00032" cy="2.0002" r="1.05" fill="currentColor" />
    <circle cx="1.9001" cy="2.0002" r="1.05" fill="currentColor" />
    <circle cx="10.1003" cy="2.0002" r="1.05" fill="currentColor" />
  </svg>
);

export const MoreActionsButton: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <button
        id="basic-button-more-actions"
        aria-controls={open ? "basic-menu-more-actions" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={cn(classes.MoreActionsButton, "MoreActionsButton")}
      >
        <MoreActionsButtonIcon />
      </button>
      <Menu
        id="basic-menu-more-actions"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button-more-actions",
        }}
      >
        {React.Children.map(children, (child) => {
          return (
            <div className={classes.MoreActionButtonChild} onClick={handleClose}>
              {child}
            </div>
          );
        })}
      </Menu>
    </>
  );
};
