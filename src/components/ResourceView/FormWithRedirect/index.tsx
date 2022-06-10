import * as React from "react";
import cn from "classnames";
import { FormWithRedirect } from "react-admin";
import { ResourceTitle } from "../ResourceTitle";
import { Box, Card, CardContent } from "@material-ui/core";
import { Toolbar } from "./tool-bar";
import { makeStyles } from "@material-ui/core";
import { EditFormProps, FormWithRedirectProps } from "./types";
import { EditFormStyles } from "./styles";

const useStyles = makeStyles(EditFormStyles);

export const EditForm: React.FC<EditFormProps> = React.memo(
  ({ offToolbar, offTitle, form, offRedirectButton, actionButtons, ...props }) => {
    const classes = useStyles();

    return (
      <>
        <FormWithRedirect
          {...props}
          render={React.useCallback(
            ({
              handleSubmitWithRedirect,
              handleSubmit,
              invalid,
              basePath,
              record,
              ...formProps
            }: FormWithRedirectProps) => {
              return (
                <>
                  {!offTitle && (
                    <ResourceTitle
                      {...props}
                      record={record}
                      basePath={basePath}
                      actionButtons={actionButtons}
                      name={props.resource}
                      form={form}
                    />
                  )}
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
                          record={record}
                          basePath={basePath}
                          invalid={invalid}
                          handleSubmit={handleSubmit}
                          handleSubmitWithRedirect={handleSubmitWithRedirect}
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
            [classes.offToolbar, offRedirectButton, form, offTitle, offToolbar, props]
          )}
        />
      </>
    );
  }
);
