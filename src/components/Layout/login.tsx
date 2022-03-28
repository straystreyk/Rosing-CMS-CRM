import * as React from "react";
import { withTypes } from "react-final-form";
import { useHistory, useLocation } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Notification } from "react-admin";
import { useTranslate, useLogin, useNotify } from "ra-core";
import { Link } from "ra-ui-materialui";

import { lightTheme } from "../Themes";
import { BooleanInput, TextInput, isEmail } from "../Inputs";
import { ButtonPrimary } from "../UI/Buttons";
import {
  actionsStyles,
  actionsWrapperStyles,
  annotationStyles,
  annotationWrapperStyles,
  authBgStyles,
  cardStyles,
  cardButtonStyles,
  formStyles,
  formWrapperStyles,
  linkStyles,
  linkHelpStyles,
  logoStyles,
  mainStyles,
  titleStyles,
} from "./styles";
import {
  AnnotationIcon,
  BackIcon,
  InformationIcon,
  LoginIcon,
  ResetIcon,
  RosingLogo,
} from "../../constants/icons";
import { PasswordInput } from "../Inputs/StandatdInputs/password-input";

const useStyles = makeStyles((theme) => ({
  mainStyles,
  cardStyles,
  authBgStyles,
  logoStyles,
  titleStyles,
  annotationWrapperStyles,
  annotationStyles,
  formWrapperStyles,
  formStyles,
  actionsWrapperStyles,
  actions: { ...actionsStyles, justifyContent: "space-between" },
  linkStyles,
  linkHelpStyles,
  cardButton: { ...cardButtonStyles, marginTop: 15 },
}));

interface FormValues {
  email?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const Login: React.FC<{ isResetPage?: boolean }> = ({ isResetPage }) => {
  const [loading, setLoading] = React.useState(false);
  const translate = useTranslate();
  const classes = useStyles();
  const notify = useNotify();
  const login = useLogin();
  const history = useHistory();
  const location = useLocation<{ nextPathname: string } | null>();

  if (localStorage.getItem("token") && !isResetPage) {
    history.push("/");
  }

  const handleSubmit = (auth: FormValues) => {
    if (!isResetPage) {
      setLoading(true);
      login(auth, location.state ? location.state?.nextPathname : "/").catch((error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
          "warning"
        );
      });
    } else {
      notify("actions.resetSuccess", { type: "success" });
    }
  };

  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    if (values.email && !isEmail(values.email)) {
      errors.email = translate("validation.form.email");
    }
    if (!values.email) {
      errors.email = translate("validation.form.empty");
    }
    if (!values.password && !isResetPage) {
      errors.password = translate("validation.form.empty");
    }
    return errors;
  };

  return (
    <>
      <div className={classes.mainStyles}>
        <div className={classes.authBgStyles}>
          <div className={classes.logoStyles}>
            <RosingLogo color={""} />
          </div>
        </div>
        <div className={classes.formWrapperStyles}>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate className={classes.formStyles}>
                <Card className={classes.cardStyles}>
                  <div className={classes.titleStyles}>
                    {!isResetPage ? "Авторизация" : "Восстановление пароля"}
                    <div className={classes.annotationWrapperStyles}>
                      <InformationIcon color="var(--secondary-color-main)" />
                      <div className={classes.annotationStyles}>
                        В целях безопасности используемый для авторизации email должен быть
                        добавлен админом в список пользователей. Если система не узнает email,
                        обратитесь к админу.
                      </div>
                    </div>
                  </div>
                  <TextInput
                    fullWidth
                    label="Email"
                    source="email"
                    required
                    placeholder="example@example.com"
                  />
                  {!isResetPage && <PasswordInput source="password" required fullWidth />}
                  <CardActions className={classes.actions}>
                    {!isResetPage ? (
                      <>
                        <div className={classes.actionsWrapperStyles}>
                          <label htmlFor="remember">Stay logged in</label>
                          <BooleanInput source="remember" label={""} />
                        </div>
                        <Link className={classes.linkStyles} to={"/login/reset"}>
                          <AnnotationIcon color="#005AA3" />
                          Forgot password
                        </Link>
                      </>
                    ) : (
                      <Link className={classes.linkStyles} to={"/login"}>
                        <BackIcon color="#005AA3" />I remember the password
                      </Link>
                    )}
                  </CardActions>
                  <ButtonPrimary
                    className={classes.cardButton}
                    startIcon={
                      !isResetPage ? <LoginIcon color="#ffffff" /> : <ResetIcon color="#ffffff" />
                    }
                    disabled={loading}
                    type="submit"
                    text={translate(!isResetPage ? "actions.login" : "actions.reset")}
                  />
                </Card>
                <Notification />
              </form>
            )}
          />
          {/*<a href="#" className={classes.linkHelp}>*/}
          {/*  <AlertIcon color="#005AA3" />*/}
          {/*  Написать в поддержку*/}
          {/*</a>*/}
        </div>
      </div>
    </>
  );
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
export const LoginWithTheme = (props: any) => (
  <ThemeProvider theme={createTheme(lightTheme)}>
    <Login {...props} />
  </ThemeProvider>
);
