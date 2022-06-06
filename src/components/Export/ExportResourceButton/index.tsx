import * as React from "react";
import { StandardButton } from "../../UI/Buttons/standard-button";
import { ArrayInputItemArrow } from "../../../constants/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { authClient } from "../../Providers/AuthProvider/client";
import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_EXPORT } from "../requests";
import { ExportIcon } from "../constants";
import { useExportButton } from "./use-export-button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  ExportButton: { "& .MuiButton-label svg:first-child": { marginRight: 4 } },
});

export const ExportResourceButton: React.FC<{ resource: string }> = ({ resource }) => {
  const classes = useStyles();
  const { data } = useSubscription(SUBSCRIBE_TO_EXPORT, {
    client: authClient,
    variables: {},
  });
  const { handleItem, handleClick, isLoading, handleClose, open, anchorEl } = useExportButton(
    resource,
    data
  );

  return (
    <>
      <StandardButton
        onClick={handleClick}
        variant="icon"
        customColor="var(--primary-button-default)"
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
        <MenuItem disabled={isLoading} onClick={handleItem}>
          Take the data (づ ◕‿◕ )づ
        </MenuItem>
      </Menu>
    </>
  );
};
