import * as React from "react";
import { withTypes } from "react-final-form";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Notification } from "react-admin";
import { useNotify, useTranslate } from "ra-core";
import { Link } from "ra-ui-materialui";

import { lightTheme } from "../Themes";
import { isEmail, TextInput } from "../Inputs";
import { ButtonPrimary } from "../UI/Buttons";
import { AlertIcon, BackIcon, InformationIcon, ResetIcon, RosingLogo } from "../../constants/icons";
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
  actions: { ...actions },
  link,
  linkHelp,
  cardButton,
}));

interface FormValues {
  email?: string;
}

const { Form } = withTypes<FormValues>();

const Reset: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const translate = useTranslate();
  const classes = useStyles();
  const notify = useNotify();

  const handleSubmit = ({ email }: FormValues) => {
    // setLoading(true);
    console.log(email);
    notify("actions.resetSuccess", { type: "success" });
    // notify(
    //   typeof error === "string"
    //     ? error
    //     : typeof error === "undefined" || !error.message
    //       ? "ra.auth.sign_in_error"
    //       : error.message,
    //   "warning"
    // );
  };

  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    if (values.email && !isEmail(values.email)) {
      errors.email = translate("validation.form.email");
    }
    if (!values.email) {
      errors.email = translate("validation.form.empty");
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
                    Восстановление пароля
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
                  <CardActions className={classes.actions}>
                    <Link className={classes.link} to={"/login"}>
                      <BackIcon color="#005AA3" />I remember the password
                    </Link>
                  </CardActions>
                  <ButtonPrimary
                    className={classes.cardButton}
                    startIcon={<ResetIcon color="#ffffff" />}
                    disabled={loading}
                    type="submit"
                    text={translate("actions.reset")}
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

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Reset won't get
// the right theme
const ResetWithThemes = (props: any) => (
  <ThemeProvider theme={createTheme(lightTheme)}>
    <Reset {...props} />
  </ThemeProvider>
);

export default ResetWithThemes;
