import React from "react";
import { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink, useTranslate } from "react-admin";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "./logo";
import { GlobalSearch } from "../GlobalSearch/global-search";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginLeft: 10,
    fontWeight: 800,
    display: "inline",
  },
  spacer: {
    flex: 1,
  },
});

const FixedContainer: React.FC = (props) => {
  return <div style={{ position: "fixed", zIndex: 10 }}>{props.children}</div>;
};

const ConfigurationMenu = forwardRef<any, any>((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
      ref={ref}
      className="userMenu"
      to="/configuration"
      primaryText={translate("pos.configuration")}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props: unknown) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <AppBar {...props} container={FixedContainer} userMenu={<CustomUserMenu />}>
        <Logo />
        <Typography className={classes.title} component="span">
          SPB TV Russia
          {/*<Typography*/}
          {/*  color='inherit'*/}
          {/*  className={classes.title}*/}
          {/*  id='react-admin-title'*/}
          {/*/>*/}
        </Typography>
        <span className={classes.spacer} />
        <GlobalSearch />
      </AppBar>
    </>
  );
};

export default CustomAppBar;
