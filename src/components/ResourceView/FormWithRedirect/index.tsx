import * as React from "react";
import cn from "classnames";
import { FormWithRedirect } from "react-admin";
import { ResourceTitle } from "../resource-title";
import { Box, Card, CardContent } from "@material-ui/core";
import { Toolbar } from "./tool-bar";
import { makeStyles } from "@material-ui/core";
import { EditFormProps, FormWithRedirectProps } from "./types";
import { EditFormStyles } from "./styles";

const useStyles = makeStyles(EditFormStyles);

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
            [classes.offToolbar, offRedirectButton, form, offTitle, offToolbar, props]
          )}
        />
      </>
    );
  }
);
