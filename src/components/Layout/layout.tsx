import { useSelector } from "react-redux";
import { Layout, Sidebar } from "react-admin";

import AppBar from "./app-bar";
import { Menu } from "../Menu";
import { darkTheme, lightTheme } from "../Themes";
import { AppState } from "../../types";

const CustomSidebar = (props: any) => {
  return <Sidebar {...props} />;
};

const LayoutEditor = (props: any) => {
  const theme = useSelector((state: AppState) => (state.theme === "dark" ? darkTheme : lightTheme));
  return <Layout {...props} appBar={AppBar} sidebar={CustomSidebar} menu={Menu} theme={theme} />;
};

export default LayoutEditor;
