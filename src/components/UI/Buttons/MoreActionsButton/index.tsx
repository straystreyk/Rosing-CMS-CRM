import * as React from "react";
import { Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { IconProps } from "../../../../constants/icons";
import cn from "classnames";

const useStyles = makeStyles({
  MoreActionsButton: {
    borderRadius: "50%",
    cursor: "pointer",
    width: 16,
    height: 16,
    backgroundColor: "var(--primary-bg)",
    transition: "0.35s all ease",
    "& svg": {
      verticalAlign: "middle",
    },
  },
  MoreActionButtonChild: {
    marginBottom: 5,
    "& > a, & > button ": {
      width: "100%",
      padding: "4px 6px",
      justifyContent: "flex-start",
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
});

const MoreActionsButtonIcon = ({ color }: IconProps) => (
  <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.00032" cy="2.0002" r="1.05" fill={color} />
    <circle cx="1.9001" cy="2.0002" r="1.05" fill={color} />
    <circle cx="10.1003" cy="2.0002" r="1.05" fill={color} />
  </svg>
);

export const MoreActionsButton: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        <MoreActionsButtonIcon color="var(--primary-button-default)" />
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
