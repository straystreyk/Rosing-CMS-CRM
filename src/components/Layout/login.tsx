import * as React from "react";
import PropTypes from "prop-types";
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
  actions,
  actionsWrapper,
  annotation,
  annotationWrapper,
  authBg,
  card,
  cardButton,
  form,
  formWrapper,
  link,
  linkHelp,
  logo,
  main,
  title,
} from "./styles";
import {
  AlertIcon,
  AnnotationIcon,
  InformationIcon,
  LoginIcon,
  RosingLogo,
} from "../../constants/icons";
import { PasswordInput } from "../Inputs/password-input";

const useStyles = makeStyles((theme) => ({
  main,
  card,
  authBg,
  logo,
  title,
  annotationWrapper,
  annotation,
  formWrapper,
  form,
  actionsWrapper,
  actions: { ...actions, justifyContent: "space-between" },
  link,
  linkHelp,
  cardButton: { ...cardButton, marginTop: 15 },
}));

interface FormValues {
  email?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const translate = useTranslate();
  const classes = useStyles();
  const notify = useNotify();
  const login = useLogin();
  const history = useHistory();
  const location = useLocation<{ nextPathname: string } | null>();

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  const handleSubmit = (auth: FormValues) => {
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
  };

  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    if (values.email && !isEmail(values.email)) {
      errors.email = translate("validation.form.email");
    }
    if (!values.email) {
      errors.email = translate("validation.form.empty");
    }
    if (!values.password) {
      errors.password = translate("validation.form.empty");
    }
    return errors;
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.authBg}>
          <div className={classes.logo}>
            <RosingLogo color={""} />
          </div>
        </div>
        <div className={classes.formWrapper}>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate className={classes.form}>
                <Card className={classes.card}>
                  <div className={classes.title}>
                    Авторизация
                    <div className={classes.annotationWrapper}>
                      <InformationIcon color="#0F1F26" />
                      <div className={classes.annotation}>
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
                  <PasswordInput source="password" required fullWidth />
                  <CardActions className={classes.actions}>
                    <div className={classes.actionsWrapper}>
                      <label htmlFor="remember">Stay logged in</label>
                      <BooleanInput source="remember" label={""} />
                    </div>
                    <Link className={classes.link} to={"/login/reset"}>
                      <AnnotationIcon color="#005AA3" />
                      Forgot password
                    </Link>
                  </CardActions>
                  <ButtonPrimary
                    className={classes.cardButton}
                    startIcon={<LoginIcon color="#ffffff" />}
                    disabled={loading}
                    type="submit"
                    text={translate("actions.login")}
                  />
                </Card>
                <Notification />
              </form>
            )}
          />
          <a href="#" className={classes.linkHelp}>
            <AlertIcon color="#005AA3" />
            Написать в поддержку
          </a>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
  <ThemeProvider theme={createTheme(lightTheme)}>
    <Login {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;
