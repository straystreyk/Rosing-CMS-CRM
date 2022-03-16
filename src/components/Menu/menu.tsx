import { FC } from "react";
import { useSelector } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import { useMediaQuery, Theme } from "@material-ui/core";
import { useTranslate, MenuItemLink } from "react-admin";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

import { ExpandMenu } from "../ExpandMenu/expand-menu";
import { AppState } from "../../types";

import { UserVariables as users } from "../../containers/Users";
import { DatacentersVariables as datacenters } from "../../containers/Datacenters";
import { RightHoldersVariables as rightHolders } from "../../containers/RightHolders";
import { QuestionsVariables as questions } from "../../containers/Questions";
import { NewsVariables as news } from "../../containers/News";
import {
  DashboardIcon,
  MediaContentIcon,
  PagesAndAttributesIcon,
  PaymentIcon,
  PromocodeIcon,
  PushCopmaniesIcon,
  SettingsMenuIcon,
  StreamingIcon,
  TariffIcon,
} from "../../constants/icons";

interface MenuProps {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const useStyles = makeStyles({
  Line: {
    margin: "5px 0 8px 0",
    height: 1,
    backgroundColor: "#27353C",
  },
  LineClose: {
    maxWidth: 34,
  },
  MenuItemLink: {
    maxHeight: 28,
    borderRadius: 5,
    padding: "4px 0",
    margin: "4px 0",
    flexShrink: 0,
    minHeight: "auto",
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      marginRight: 6,
      padding: "4px 8px",
      height: 20,
      maxWidth: 20,
      borderRadius: 4,
      transition: "0.35s all ease",
      "& svg": {
        width: "100%",
        height: "auto",
      },
    },
  },
  MenuItemLinkClose: {
    color: "#0f1f26",
    maxWidth: 45,
    "& .MuiTouchRipple-root": {
      display: "none",
    },
    "& .MuiListItemIcon-root:hover": {
      background: "#2D3D44",
    },
    "&:hover": {
      background: "none",
    },
    '&[class*="RaMenuItemLink-active"]': {
      backgroundColor: "unset",
    },
    '&[class*="RaMenuItemLink-active"]:focus': {
      outline: "none",
    },
    '&[class*="RaMenuItemLink-active"] .MuiListItemIcon-root': {
      backgroundColor: "#00A991",
    },
    '&[class*="RaMenuItemLink-active"] .MuiListItemIcon-root:hover': {
      backgroundColor: "#00D6B5",
    },
  },
});

const tooltipProps = {
  arrow: true,
};

const Line = () => {
  const classes = useStyles();
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  return <div className={cn(classes.Line, !open && classes.LineClose)} />;
};

const redirectAdmin = (url: string) => {
  window.location.href = url;
};

export const Menu: FC<MenuProps> = ({ onMenuClick, dense, logout, ...props }) => {
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const classes = useStyles();
  useSelector((state: AppState) => state.theme);

  return (
    <>
      <MenuItemLink
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        to={"/dashboard"}
        primaryText={"Dashboard"}
        leftIcon={<DashboardIcon color="#fff" />}
        onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/dashboard")}
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <Line />
      <MenuItemLink
        to={`/admin_users`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={translate(`resources.admin_users.name`, {
          smart_count: 2,
        })}
        leftIcon={<users.icon color="#fff" />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/payments`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={"Payments"}
        leftIcon={<PaymentIcon color="#fff" />}
        onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/payments")}
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/tarrif_plans`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={"Tariff plans"}
        leftIcon={<TariffIcon color="#fff" />}
        onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/subscriptions_rent_plans")}
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/promocodes`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={"Promocode"}
        leftIcon={<PromocodeIcon color="#fff" />}
        onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/subscriptions_promo_codes")}
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/push_campaigns`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={"Push campaigns"}
        leftIcon={<PushCopmaniesIcon color="#fff" />}
        onClick={() =>
          redirectAdmin("https://dev-admin.spbtv.com/admin/push_notifications_push_campaigns")
        }
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <Line />
      <MenuItemLink
        to={`/pages_and_attributes`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={"Pages and attributes"}
        leftIcon={<PagesAndAttributesIcon color="#fff" />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <ExpandMenu
        links={["/media_content", "/channels", "/genres", "/audio_shows"]}
        title={translate(`pos.expandMenu.mediaContent`)}
        icon={<MediaContentIcon color={"#fff"} />}
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
          to={`/media_content/radio`}
          primaryText={translate(`resources.media_content/radio/radio_stations.name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/audio_shows`}
          primaryText={translate(`resources.audio_shows.name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/genres`}
          primaryText={translate(`resources.genres.name`, {
            smart_count: 2,
          })}
          // leftIcon={<genres.icon />}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/channels`}
          primaryText={translate(`resources.channels.name`, {
            smart_count: 2,
          })}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      </ExpandMenu>
      <MenuItemLink
        to={`/streaming`}
        primaryText={"Streaming"}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        leftIcon={<StreamingIcon color="#fff" />}
        onClick={() =>
          redirectAdmin("https://dev-admin.spbtv.com/admin/content_stream_params_rules")
        }
        tooltipProps={tooltipProps}
        sidebarIsOpen={open}
        dense={dense}
      />
      <Line />
      <ExpandMenu
        links={[
          "/api_clients",
          "/api_clients_configs",
          "/content_platforms",
          "/email_templates",
          "/geo_rewrites",
          "/internet_service_providers",
          "/iptv_networks",
        ]}
        title={"Environment settings"}
        icon={<SettingsMenuIcon color={"#fff"} />}
      >
        <MenuItemLink
          to={`/api_clients`}
          primaryText={"Api clients"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() =>
            redirectAdmin(
              "https://dev-admin.spbtv.com/admin/api_client_authentication_api_client_active_records"
            )
          }
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/api_clients_configs`}
          primaryText={"Api clients configs"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/content_client_configs")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/content_platforms`}
          primaryText={"Content platforms"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/content_platforms")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/email_templates`}
          primaryText={"Email templates"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/email_templates")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/geo_rewrites`}
          primaryText={"Geo rewrites"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/geo_rewrites")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/internet_service_providers`}
          primaryText={"Internet service providers"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() =>
            redirectAdmin("https://dev-admin.spbtv.com/admin/isp_internet_service_providers")
          }
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/iptv_networks`}
          primaryText={"IPTV Networks"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/iptv_networks")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/publishing_rules`}
          primaryText={"Publishing rules"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/publishing_rules")}
          sidebarIsOpen={open}
          dense={dense}
        />
        <MenuItemLink
          to={`/stopwords`}
          primaryText={"Stopwords"}
          className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
          onClick={() => redirectAdmin("https://dev-admin.spbtv.com/admin/content_stopwords")}
          sidebarIsOpen={open}
          dense={dense}
        />
      </ExpandMenu>
      <MenuItemLink
        to={`/right_holders`}
        primaryText={translate(`resources.right_holders.name`, {
          smart_count: 2,
        })}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        leftIcon={<rightHolders.icon />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/questions`}
        primaryText={translate(`resources.questions.name`, {
          smart_count: 2,
        })}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        leftIcon={<questions.icon />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/news`}
        primaryText={translate(`resources.news.name`, {
          smart_count: 2,
        })}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        leftIcon={<news.icon />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to={`/datacenters`}
        className={cn(classes.MenuItemLink, !open && classes.MenuItemLinkClose)}
        primaryText={translate(`resources.datacenters.name`, {
          smart_count: 2,
        })}
        leftIcon={<datacenters.icon />}
        tooltipProps={tooltipProps}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {isXSmall && (
        <MenuItemLink
          to="/configuration"
          primaryText={translate("pos.configuration")}
          leftIcon={<SettingsIcon />}
          tooltipProps={tooltipProps}
          onClick={onMenuClick}
          sidebarIsOpen={open}
          dense={dense}
        />
      )}
      {isXSmall && logout}
    </>
  );
};
