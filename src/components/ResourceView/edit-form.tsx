import * as React from "react";
import cn from "classnames";
import { Toolbar as ToolbarRA, FormWithRedirect } from "react-admin";
import { FormWithRedirectProps } from "ra-core";
import { Box, Card, CardContent, makeStyles } from "@material-ui/core";

import { SaveButton } from "../UI/RA/save-button";
import { AcceptFilterIcon, CancelFilterIcon, PlusIcon } from "../../constants/icons";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import { ResourceTitle } from "./resource-title";
import { SecondaryButton } from "../UI/Buttons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  FixedToolBar: {
    position: "fixed",
    bottom: 0,
    width: "calc(100% - 240px)",
    zIndex: 10,
    backgroundColor: "#fff",
    display: "flex",
    padding: 0,
    justifyContent: "center",
    "& button": {
      marginLeft: 16,
      "&:first-child": {
        marginLeft: 0,
      },
    },
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },
  Transition: {
    transition: "0.35s all ease",
  },
  FixedToolBarClosed: {
    width: "100%",
  },
  StaticToolbar: {
    position: "static",
    width: "100%",
  },
  offToolbar: {
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
});

interface EditFormProps {
  resource: string;
  redirect?: string;
  offToolbar?: boolean;
  onSuccess?: (data: any) => void;
  onSuccessWithRedirect?: (data: any) => void;
  onFailure?: (error: Error) => void;
  redirectButtonLabel?: string;
  redirectButtonIcon?: React.ReactElement;
  CustomToolbar?: React.FC;
  offRedirectButton?: boolean;
  form?: string;
  offTitle?: boolean;
}

export const Toolbar = (props: any) => {
  const classes = useStyles();
  const [mounted, setMounted] = React.useState(false);
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const toolbar = React.useRef(null);
  const currentExist = !!toolbar.current;
  const history = useHistory();

  const cancel = React.useCallback(() => {
    history.goBack();
  }, [history]);

  React.useEffect(() => {
    if (currentExist) {
      setMounted(true);
    }
  }, [toolbar, currentExist]);

  return (
    <div ref={toolbar}>
      <ToolbarRA
        record={props.record}
        basePath={props.basePath}
        invalid={props.invalid}
        handleSubmit={props.handleSubmit}
        handleSubmitWithRedirect={props.handleSubmitWithRedirect}
        saving={props.saving}
        resource={props.resource}
        className={cn(
          classes.FixedToolBar,
          !open && classes.FixedToolBarClosed,
          mounted && classes.Transition
        )}
      >
        <SecondaryButton
          startIcon={<CancelFilterIcon color="#005AA3" />}
          text="Cancel"
          onClick={cancel}
        />
        <SaveButton
          icon={<AcceptFilterIcon color="#fff" />}
          label="Save"
          onSuccess={props.onSuccess}
          onFailure={props.onFailure}
        />
        {props.formType !== "edit" && !props.offRedirectButton ? (
          <SaveButton
            label={props.redirectButtonLabel ?? `Save and add another one`}
            icon={props.redirectButtonIcon ?? <PlusIcon color="#fff" />}
            onSuccess={props.onSuccessWithRedirect ?? props.onSuccess}
            onFailure={props.onFailure}
          />
        ) : null}
      </ToolbarRA>
    </div>
  );
};

export const EditForm: React.FC<EditFormProps> = React.memo(
  ({ offToolbar, offTitle, form, offRedirectButton, ...props }) => {
    const classes = useStyles();
    return (
      <>
        <FormWithRedirect
          {...props}
          render={React.useCallback(
            (formProps: FormWithRedirectProps) => {
              return (
                <>
                  {!offTitle && <ResourceTitle {...props} name={props.resource} form={form} />}
                  <Card
                    className={cn(offToolbar && classes.offToolbar)}
                    style={{ overflow: "visible" }}
                  >
                    <form>
                      <CardContent>
                        <Box display={{ md: "block", lg: "flex" }}>
                          <Box flex={1}>{props.children}</Box>
                        </Box>
                      </CardContent>
                      {!offToolbar && (
                        <Toolbar
                          record={formProps.record}
                          basePath={formProps.basePath}
                          invalid={formProps.invalid}
                          handleSubmit={formProps.handleSubmit}
                          handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                          onSuccessWithRedirect={props.onSuccessWithRedirect}
                          redirectButtonIcon={props.redirectButtonIcon}
                          redirectButtonLabel={props.redirectButtonLabel}
                          onSuccess={props.onSuccess}
                          onFailure={props.onFailure}
                          saving={formProps.saving}
                          formType={form}
                          redirect={props.redirect}
                          resource={props.resource}
                          offRedirectButton={offRedirectButton}
                        />
                      )}
                    </form>
                  </Card>
                </>
              );
            },
            [classes.offToolbar, form, offTitle, offToolbar, props]
          )}
        />
      </>
    );
  }
);
