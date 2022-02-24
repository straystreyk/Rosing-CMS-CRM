import * as React from "react";
import { Toolbar as ToolbarRA, FormWithRedirect } from "react-admin";
import { Box, Card, CardContent, makeStyles } from "@material-ui/core";

import { SaveButton } from "../UI/RA/save-button";
import { DeleteButton } from "../UI/RA/delete-button";
import { AcceptFilterIcon, DeleteIcon } from "../../constants/icons";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import cn from "classnames";

const useStyles = makeStyles({
  FixedToolBar: {
    position: "fixed",
    bottom: 0,
    width: "calc(100% - 240px)",
    zIndex: 10,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    padding: "48px 0 48px 0",
    transition: "0.3s all ease",
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },
  FixedToolBarClosed: {
    width: "100%",
  },
  StaticToolbar: {
    position: "static",
    width: "100%",
  },
});

interface EditFormProps {
  resource: string;
  redirect?: string;
  CustomToolbar?: React.FC;
}

export const Toolbar = (props: any) => {
  const classes = useStyles();
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

  return (
    <ToolbarRA
      record={props.record}
      basePath={props.basePath}
      invalid={props.invalid}
      handleSubmit={props.handleSubmit}
      handleSubmitWithRedirect={props.handleSubmitWithRedirect}
      saving={props.saving}
      resource={props.resource}
      className={cn(classes.FixedToolBar, !open && classes.FixedToolBarClosed)}
    >
      <SaveButton
        redirect={props.redirect}
        submitOnEnter={true}
        icon={<AcceptFilterIcon color="#fff" />}
      />
      <DeleteButton
        resource={props.resource}
        basePath={props.basePath}
        icon={<DeleteIcon color="#D21C1C" />}
      />
    </ToolbarRA>
  );
};

export const EditForm: React.FC<EditFormProps> = ({ CustomToolbar, ...props }) => {
  return (
    <FormWithRedirect
      {...props}
      redirect={props.redirect ?? "list"}
      render={(formProps: any) => {
        return (
          <Card style={{ overflow: "visible" }}>
            <form>
              <CardContent>
                <Box display={{ md: "block", lg: "flex" }}>
                  <Box flex={1}>{props.children}</Box>
                </Box>
              </CardContent>
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
            </form>
          </Card>
        );
      }}
    />
  );
};
