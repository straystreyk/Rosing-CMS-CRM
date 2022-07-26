import * as React from "react";
import cn from "classnames";
import { Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { useMediaQuery, Theme, TooltipProps } from "@material-ui/core";
import { useTranslate, MenuItemLink } from "react-admin";
import { makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import { ExpandMenu } from "../ExpandMenu/expand-menu";
import { AppState } from "../../types";

import { UserVariables as users } from "../../containers/Users";
import { LineCloseStyles, LineStyles, MenuItemLinkStyles, MenuItemLinkCloseStyles } from "./styles";
import {
  DashboardIcon,
  MediaContentIcon,
  PagesAndAttributesIcon,
  PaymentIcon,
  PromocodeIcon,
  PushCopmaniesIcon,
  SettingsMenuIcon,
  TariffIcon,
} from "../../constants/icons";

interface MenuProps {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const tooltipProps: (title: string, arrow?: boolean) => TooltipProps = (title, arrow = true) => ({
  arrow,
  title,
  children: <Tooltip />,
});

const useStyles = makeStyles({
  LineStyles,
  LineCloseStyles,
  MenuItemLinkStyles,
  MenuItemLinkCloseStyles,
});

const redirectAdmin = (url: string) => {
  window.location.href = url;
};

const Line = React.memo(() => {
  const classes = useStyles();
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  return <div className={cn(classes.LineStyles, !open && classes.LineCloseStyles)} />;
});

export const Menu: React.FC<MenuProps> = ({ onMenuClick, dense, logout, ...props }) => {
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const classes = useStyles();

  return (
    <>
      <MenuItemLink
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        to={"/dashboard"}
        primaryText={"Dashboard"}
        leftIcon={<DashboardIcon />}
        onClick={React.useCallback(
          () => redirectAdmin("https://dev-admin.spbtv.com/admin/dashboard"),
          []
        )}
        tooltipProps={tooltipProps("Dashboard")}
        sidebarIsOpen={open}
        dense={dense}
      />
      <Line />
      <MenuItemLink
        to={`/admin_users`}
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText={translate(`resources.admin_users.name`, {
          smart_count: 2,
        })}
        leftIcon={<users.icon />}
        tooltipProps={tooltipProps(translate(`resources.admin_users.name`))}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/payments`}
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText={"Payments"}
        leftIcon={<PaymentIcon />}
        onClick={React.useCallback(
          () => redirectAdmin("https://dev-admin.spbtv.com/admin/payments"),
          []
        )}
        tooltipProps={tooltipProps("Payments")}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/tarrif_plans"
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText="Tariff plans"
        leftIcon={<TariffIcon />}
        onClick={React.useCallback(
          () => redirectAdmin("https://dev-admin.spbtv.com/admin/subscriptions_rent_plans"),
          []
        )}
        tooltipProps={tooltipProps("Tariff plans")}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/promocodes"
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText="Promocode"
        leftIcon={<PromocodeIcon />}
        onClick={React.useCallback(
          () => redirectAdmin("https://dev-admin.spbtv.com/admin/subscriptions_promo_codes"),
          []
        )}
        tooltipProps={tooltipProps("Promocode")}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/push_campaigns`}
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText="Push campaigns"
        leftIcon={<PushCopmaniesIcon />}
        onClick={React.useCallback(
          () =>
            redirectAdmin("https://dev-admin.spbtv.com/admin/push_notifications_push_campaigns"),
          []
        )}
        tooltipProps={tooltipProps("Push campaigns")}
        sidebarIsOpen={open}
        dense={dense}
      />
      <Line />
      <MenuItemLink
        to={`/pages_and_attributes`}
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText={"Pages and attributes"}
        leftIcon={<PagesAndAttributesIcon />}
        tooltipProps={tooltipProps("Pages and attributes")}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <ExpandMenu
        links={["/media_content"]}
        title={translate(`pos.expandMenu.mediaContent`)}
        icon={<MediaContentIcon />}
      >
        <MenuItemLink
          to={`/media_content/video`}
          primaryText={translate(`resources.media_content/video/movies.menu_name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/media_content/tv`}
          primaryText={translate(`resources.media_content/tv/channels/channels.menu_name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/media_content/audio`}
          primaryText={translate("resources.media_content/audio/audio_shows.menu_name", {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/media_content/news`}
          primaryText={translate(`resources.media_content/news.name`, {
            smart_count: 2,
          })}
          className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
          tooltipProps={tooltipProps(translate("resources.media_content/news.name"))}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/media_content/radio`}
          primaryText={translate(`resources.media_content/radio/radio_stations.menu_name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/media_content/attributes`}
          primaryText="Attributes"
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      </ExpandMenu>
      {/*<MenuItemLink*/}
      {/*  to={`/streaming`}*/}
      {/*  primaryText={"Streaming"}*/}
      {/*  className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*  leftIcon={<StreamingIcon color="#fff" />}*/}
      {/*  onClick={React.useCallback(*/}
      {/*    () => redirectAdmin("https://dev-admin.spbtv.com/admin/content_stream_params_rules"),*/}
      {/*    []*/}
      {/*  )}*/}
      {/*  tooltipProps={tooltipProps("Streaming")}*/}
      {/*  sidebarIsOpen={open}*/}
      {/*  dense={dense}*/}
      {/*/>*/}
      <Line />
      <MenuItemLink
        to={`/media_content/environment_settings`}
        className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}
        primaryText="Environment settings"
        leftIcon={<SettingsMenuIcon />}
        tooltipProps={tooltipProps("Environment settings")}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {/*<ExpandMenu*/}
      {/*  links={[*/}
      {/*    "/api_clients",*/}
      {/*    "/api_clients_configs",*/}
      {/*    "/content_platforms",*/}
      {/*    "/email_templates",*/}
      {/*    "/geo_rewrites",*/}
      {/*    "/internet_service_providers",*/}
      {/*    "/iptv_networks",*/}
      {/*  ]}*/}
      {/*  title={"Environment settings"}*/}
      {/*  icon={<SettingsMenuIcon color={"#fff"} />}*/}
      {/*>*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/api_clients`}*/}
      {/*    primaryText={"Api clients"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () =>*/}
      {/*        redirectAdmin(*/}
      {/*          "https://dev-admin.spbtv.com/admin/api_client_authentication_api_client_active_records"*/}
      {/*        ),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/api_clients_configs`}*/}
      {/*    primaryText={"Api clients configs"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/content_client_configs"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/content_platforms`}*/}
      {/*    primaryText={"Content platforms"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/content_platforms"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/email_templates`}*/}
      {/*    primaryText={"Email templates"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/email_templates"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/geo_rewrites`}*/}
      {/*    primaryText={"Geo rewrites"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/geo_rewrites"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/internet_service_providers`}*/}
      {/*    primaryText={"Internet service providers"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/isp_internet_service_providers"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/iptv_networks`}*/}
      {/*    primaryText={"IPTV Networks"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/iptv_networks"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/publishing_rules`}*/}
      {/*    primaryText={"Publishing rules"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/publishing_rules"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*  <MenuItemLink*/}
      {/*    to={`/stopwords`}*/}
      {/*    primaryText={"Stopwords"}*/}
      {/*    className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*    onClick={React.useCallback(*/}
      {/*      () => redirectAdmin("https://dev-admin.spbtv.com/admin/content_stopwords"),*/}
      {/*      []*/}
      {/*    )}*/}
      {/*    sidebarIsOpen={open}*/}
      {/*    dense={dense}*/}
      {/*  />*/}
      {/*</ExpandMenu>*/}
      {/*<MenuItemLink*/}
      {/*  to={`/questions`}*/}
      {/*  primaryText={translate(`resources.questions.name`, {*/}
      {/*    smart_count: 2,*/}
      {/*  })}*/}
      {/*  className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*  leftIcon={<questions.icon />}*/}
      {/*  tooltipProps={tooltipProps(translate("resources.questions.name"))}*/}
      {/*  onClick={onMenuClick}*/}
      {/*  sidebarIsOpen={open}*/}
      {/*  dense={dense}*/}
      {/*/>*/}
      {/*<MenuItemLink*/}
      {/*  to={`/datacenters`}*/}
      {/*  className={cn(classes.MenuItemLinkStyles, !open && classes.MenuItemLinkCloseStyles)}*/}
      {/*  primaryText={translate(`resources.datacenters.name`, {*/}
      {/*    smart_count: 2,*/}
      {/*  })}*/}
      {/*  leftIcon={<datacenters.icon />}*/}
      {/*  tooltipProps={tooltipProps(translate("resources.datacenters.name"))}*/}
      {/*  onClick={onMenuClick}*/}
      {/*  sidebarIsOpen={open}*/}
      {/*  dense={dense}*/}
      {/*/>*/}
      {isXSmall && (
        <MenuItemLink
          to="/configuration"
          primaryText={translate("pos.configuration")}
          leftIcon={<SettingsIcon />}
          tooltipProps={tooltipProps(translate("pos.configuration"))}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      )}
      {isXSmall && logout}
    </>
  );
};
