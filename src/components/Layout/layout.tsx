import * as React from "react";
import * as Redux from "react-redux";
import {
  Layout as LayoutRA,
  Sidebar,
  Notification,
  LayoutProps,
  NotificationProps,
} from "react-admin";

import { CustomAppBar } from "./app-bar";
import { Menu } from "../Menu";
import { darkTheme, lightTheme } from "../Themes";
import { AppState } from "../../types";

export const Layout: React.FC<LayoutProps> = (props) => {
  const theme = Redux.useSelector((state: AppState) =>
    state.theme === "dark" ? darkTheme : lightTheme
  );
  return (
    <LayoutRA
      {...props}
      appBar={CustomAppBar}
      notification={Notification as any}
      sidebar={Sidebar as any}
      menu={Menu as any}
      theme={theme as any}
    />
  );
};
