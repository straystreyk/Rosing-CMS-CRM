import * as React from "react";
import { useSubscription } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

import { authClient } from "../../Providers/AuthProvider/client";
import { InformationIcon } from "../../../constants/icons";
import { useTranslate } from "react-admin";
import { MainLoader } from "../../MainLoader";
import { ExportStatusWidgetStyles } from "./styles";
import { useExportStatusWidget } from "./use-export-status-widget";
import { SUBSCRIBE_TO_EXPORT } from "../requests";

const useStyles = makeStyles(ExportStatusWidgetStyles);

const LOADER_SIZE = 12;

export const ExportStatusWidget = React.memo(({ resource }: { resource: string }) => {
  const translate = useTranslate();
  const { data } = useSubscription(SUBSCRIBE_TO_EXPORT, {
    client: authClient,
  });
  const { subscription } = useExportStatusWidget(resource, data);
  const classes = useStyles();

  if (!subscription) return null;

  return (
    <Fade in={!!subscription} unmountOnExit>
      <div className={classes.ExportWidget}>
        <button className={classes.Icon}>
          <InformationIcon color="var(--primary-button-default)" />
        </button>
        <span>
          {subscription.status !== "ready" && (
            <>
              Preparing a list of {translate(["resources", resource, "name"].join("."))} for
              downloading&nbsp;
            </>
          )}
          {subscription.status === "ready" && (
            <>
              File is ready -&nbsp;
              <a target="_blank" rel="noreferrer" href={subscription.file}>
                download
              </a>
            </>
          )}
          {subscription.status === "error" && <>Something went wrong :(</>}
        </span>
        {subscription.status === "in_progress" && (
          <span>
            &nbsp;{subscription.progress}% &nbsp;
            <MainLoader size={LOADER_SIZE} display="inline-block" component="span" />
          </span>
        )}
      </div>
    </Fade>
  );
});
