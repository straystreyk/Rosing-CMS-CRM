import * as React from "react";
import * as Redux from "react-redux";
import { Layout, Sidebar, Notification } from "react-admin";
import { LayoutProps } from "ra-ui-materialui";

import { CustomAppBar } from "./app-bar";
import { Menu } from "../Menu";
import { darkTheme, lightTheme } from "../Themes";
import { AppState } from "../../types";

export const LayoutEditor: React.FC<LayoutProps> = (props) => {
  const theme = Redux.useSelector((state: AppState) =>
    state.theme === "dark" ? darkTheme : lightTheme
  );
  return (
    <Layout
      {...props}
      appBar={CustomAppBar}
      notification={Notification}
      sidebar={Sidebar}
      menu={Menu}
      theme={theme}
    />
  );
};
