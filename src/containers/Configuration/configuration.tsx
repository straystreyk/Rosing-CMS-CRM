import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useTranslate, useLocale, useSetLocale, Title } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import { changeTheme } from "./actions";
import { AppState } from "../../types";
import { useCallback } from "react";

const useStyles = makeStyles({
  label: { width: "10em", display: "inline-block" },
  button: { margin: "1em" },
});

export const Configuration = () => {
  const translate = useTranslate();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const classes = useStyles();
  const theme = useSelector((state: AppState) => state.theme);
  const dispatch = useDispatch();

  const changeLang = useCallback(
    (lang: string) => {
      localStorage.setItem("lang", lang);
      setLocale(lang);
    },
    [setLocale]
  );

  return (
    <Card style={{ padding: 20 }}>
      <Title title={translate("pos.configuration")} />
      <CardContent>
        <div className={classes.label}>{translate("pos.theme.name")}</div>
        <Button
          className={classes.button}
          variant="outlined"
          color={theme === "light" ? "primary" : "default"}
          onClick={() => dispatch(changeTheme("light"))}
        >
          {translate("pos.theme.light")}
        </Button>
        {/*<Button*/}
        {/*  className={classes.button}*/}
        {/*  variant="outlined"*/}
        {/*  color={theme === "dark" ? "primary" : "default"}*/}
        {/*  onClick={() => dispatch(changeTheme("dark"))}*/}
        {/*>*/}
        {/*  {translate("pos.theme.dark")}*/}
        {/*</Button>*/}
      </CardContent>
      <CardContent>
        <div className={classes.label}>{translate("pos.language")}</div>
        <Button
          className={classes.button}
          variant="outlined"
          color={locale === "en" ? "primary" : "default"}
          onClick={() => changeLang("en")}
        >
          en
        </Button>
        {/*<Button*/}
        {/*  className={classes.button}*/}
        {/*  variant='outlined'*/}
        {/*  color={locale === 'ru' ? 'primary' : 'default'}*/}
        {/*  onClick={() => changeLang('ru')}*/}
        {/*>*/}
        {/*  ru*/}
        {/*</Button>*/}
      </CardContent>
    </Card>
  );
};
