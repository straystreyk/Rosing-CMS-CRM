import { FC } from "react";
import { AppBar, UserMenu, MenuItemLink, useTranslate } from "react-admin";
import { AppBarProps, UserMenuProps as UserMenuPropsMUI } from "ra-ui-materialui";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import { Logo } from "./logo";
import { GlobalSearch } from "../GlobalSearch/global-search";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";

interface UserMenuProps extends UserMenuPropsMUI {
  onClick?: () => void;
}

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginLeft: 10,
    fontWeight: 600,
    display: "inline",
  },
  spacer: {
    flex: 1,
  },
  AppBar: {
    zIndex: 0,
    boxShadow: "unset",
  },
  FixedContainer: {
    display: "flex",
    position: "fixed",
    zIndex: 2,
  },
});

const FixedContainer: FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.FixedContainer}>{children}</div>;
};

const CustomUserMenu: FC<UserMenuProps> = (props) => {
  const translate = useTranslate();
  return (
    <UserMenu {...props}>
      <MenuItemLink
        className="userMenu"
        to="/configuration"
        primaryText={translate("pos.configuration")}
        leftIcon={<SettingsIcon />}
        onClick={props.onClick}
      />
    </UserMenu>
  );
};

export const CustomAppBar: FC<AppBarProps> = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`);
  return (
    <AppBar
      className={classes.AppBar}
      container={FixedContainer}
      userMenu={<CustomUserMenu />}
      {...props}
    >
      <Logo />
      {!isMobile && <span className={classes.title}>SPB TV Russia</span>}
      <span className={classes.spacer} />
      <GlobalSearch />
    </AppBar>
  );
};
