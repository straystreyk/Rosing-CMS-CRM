import * as React from "react";
import cn from "classnames";
import { FunctionField } from "react-admin";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { ArrayInputItemArrow, PlusIcon } from "../../../../../constants/icons";

const useStyles = makeStyles(TableFieldsStyles);

const EPG_SOURCE_LINKS = [
  {
    name: "STV",
    href: "/media_content/tv/tv_shows/epg_sources/stv/create",
  },
  {
    name: "EPG Service",
    href: "/media_content/tv/tv_shows/epg_sources/epg_service/create",
  },
  {
    name: "SPBTV Internal",
    href: "/media_content/tv/tv_shows/epg_sources/spbtv_internal/create",
  },
  {
    name: "SPB",
    href: "/media_content/tv/tv_shows/epg_sources/spb/create",
  },
  {
    name: "XMLTV URL",
    href: "/media_content/tv/tv_shows/epg_sources/xmltv_url/create",
  },
  {
    name: "Pixellot",
    href: "/media_content/tv/tv_shows/epg_sources/pixellot/create",
  },
];

const Toolbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StandardButton
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<PlusIcon color="#fff" />}
        endIcon={<ArrayInputItemArrow color="#fff" />}
      >
        Create EPG source
      </StandardButton>
      <Menu
        id="create-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-haspopup="true"
        inputMode="text"
      >
        {EPG_SOURCE_LINKS.map((link) => {
          return (
            <MenuItem key={link.href} component={Link} to={link.href}>
              {link.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      toolbar={Toolbar}
      optimized
      {...props}
    >
      <FunctionField
        label="id"
        source="id"
        render={(record?: RecordRA) => (
          <Link
            className={cn(classes.NameField, classes.IDField)}
            to={`/${props.resource}/${record?.id}/show`}
          >
            {record?.id}
          </Link>
        )}
      />
    </DatagridList>
  );
};
