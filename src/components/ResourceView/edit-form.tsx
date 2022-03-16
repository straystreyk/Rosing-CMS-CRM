import * as React from "react";
import cn from "classnames";
import { Toolbar as ToolbarRA, FormWithRedirect } from "react-admin";
import { Box, Card, CardContent, makeStyles } from "@material-ui/core";

import { SaveButton } from "../UI/RA/save-button";
import { AcceptFilterIcon, CancelFilterIcon, DeleteIcon, PlusIcon } from "../../constants/icons";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import { ResourceTitle } from "./resource-title";
import { SecondaryButton } from "../UI/Buttons";
import { useHistory } from "react-router-dom";
import { useTranslate } from "ra-core";

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
  CustomToolbar?: React.FC;
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
  const translate = useTranslate();

  const cancel = () => {
    history.push(props.basePath);
  };

  React.useEffect(() => {
    if (currentExist) {
      setMounted(true);
    }
  }, [toolbar.current, currentExist]);

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
          redirect={props.redirect}
          icon={<AcceptFilterIcon color="#fff" />}
          label="Save"
        />
        <SaveButton
          redirect={() => props.basePath + "/create"}
          label={`Save and add another one ${translate(
            "resources." + props.resource + ".name"
          ).toLowerCase()}`}
          icon={<PlusIcon color="#fff" />}
        />
      </ToolbarRA>
    </div>
  );
};

export const EditForm: React.FC<EditFormProps> = ({ offToolbar, offTitle, form, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <FormWithRedirect
        {...props}
        redirect={props.redirect ?? "list"}
        render={(formProps: any) => {
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
                      saving={formProps.saving}
                      redirect={props.redirect}
                      resource={props.resource}
                    />
                  )}
                </form>
              </Card>
            </>
          );
        }}
      />
    </>
  );
};
