import * as React from "react";
import { useSubscription } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

import { authClient } from "../../Providers/AuthProvider/client";
import { InformationIcon } from "../../../constants/icons";
import { MainLoader } from "../../MainLoader";
import { ExportStatusWidgetStyles } from "./styles";
import { useExportStatusWidget } from "./use-export-status-widget";
import { SUBSCRIBE_TO_EXPORT } from "../requests";
import { StandardButton } from "../../UI/Buttons/StandardButton/standard-button";
import { ExportIcon } from "../constants";

const useStyles = makeStyles(ExportStatusWidgetStyles);

const LOADER_SIZE = 18;

export const ExportStatusWidget = React.memo(({ resource }: { resource: string }) => {
  const { data } = useSubscription(SUBSCRIBE_TO_EXPORT, {
    client: authClient,
  });
  const { subscription, setReport } = useExportStatusWidget(resource, data);
  const classes = useStyles();

  if (!subscription) return null;

  return (
    <Fade in={!!subscription} unmountOnExit>
      <div className={classes.ExportWidget}>
        <button className={classes.Icon}>
          <InformationIcon className="icon" />
        </button>
        <span className="text">
          {subscription.status !== "ready" && (
            <>Preparing a list of {subscription.exportType} for downloading&nbsp; </>
          )}
          {subscription.status === "ready" && (
            <>
              File in the format .{subscription.format} is ready ({subscription.exportType})
              <StandardButton
                component="a"
                target="_blank"
                href={subscription.file}
                startIcon={<ExportIcon />}
                onClick={setReport}
                text="Export"
                className="Button"
                buttonType="secondary"
                variant="text"
                onMobileView
              />
            </>
          )}
          {subscription.status === "error" && <>Something went wrong :(</>}
        </span>
        {subscription.status === "in_progress" && (
          <span className="text">
            &nbsp;{subscription.progress}% &nbsp;
            <MainLoader size={LOADER_SIZE} display="inline-block" component="span" />
          </span>
        )}
      </div>
    </Fade>
  );
});
