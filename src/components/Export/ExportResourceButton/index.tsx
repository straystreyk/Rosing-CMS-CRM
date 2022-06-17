import * as React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { useSubscription } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

import { StandardButton } from "../../UI/Buttons/StandardButton/standard-button";
import { ArrayInputItemArrow } from "../../../constants/icons";
import { authClient } from "../../Providers/AuthProvider/client";
import { SUBSCRIBE_TO_EXPORT } from "../requests";
import { ExportIcon } from "../constants";
import { useExportButton } from "./use-export-button";
import { ExportButtonStyles } from "./styles";
import { useExportStatusWidget } from "../ExportStatusWidget/use-export-status-widget";

const useStyles = makeStyles(ExportButtonStyles);

const FORMATS_OF_EXPORT: { [p: string]: string } = {
  xlsx: "XLSX",
  csv: "CSV",
};

export const ExportResourceButton: React.FC<{ resource: string }> = React.memo(({ resource }) => {
  const classes = useStyles();
  const { data } = useSubscription(SUBSCRIBE_TO_EXPORT, {
    client: authClient,
    variables: {},
  });
  const { handleItem, handleClick, isLoading, handleClose, open, anchorEl } = useExportButton(
    resource,
    data
  );
  const { subscription } = useExportStatusWidget(resource, data);

  return (
    <>
      <StandardButton
        onClick={handleClick}
        variant="icon"
        buttonType="secondary"
        className={classes.ExportButton}
      >
        <ExportIcon />
        <ArrayInputItemArrow color="var(--primary-text-default)" />
      </StandardButton>
      <Menu
        id="download-basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "download-basic-button",
        }}
      >
        {Object.keys(FORMATS_OF_EXPORT).map((format, index) => {
          return (
            <MenuItem
              key={format + index}
              disabled={isLoading || !!(subscription && subscription.status === "in_progress")}
              onClick={handleItem}
              value={format}
            >
              {FORMATS_OF_EXPORT[format]}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
