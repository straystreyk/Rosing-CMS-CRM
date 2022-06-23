import * as React from "react";

import { Record as RecordRA, TextField, FunctionField, ReferenceArrayField } from "react-admin";
import { makeStyles, Tooltip } from "@material-ui/core";
import { ShowProps } from "../../../../types";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { UrlField } from "../../../../components/TableFields/url-field";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { SingleFieldList } from "../../../../components/TableFields/single-field-list";
import { AcceptFilterIcon } from "../../../../constants/icons";

const useStyles = makeStyles({
  ...TableFieldsStyles,
  Icon: {
    color: "var(--accent-color)",
    width: 20,
    height: 20,
    verticalAlign: "middle",
    marginLeft: 10,
    cursor: "help",
    display: "inline-block",
  },
  Tooltip: {
    "& > div": {
      fontSize: 11,
    },
    maxWidth: 200,
  },
});

const FiltersField: React.FC<{ record?: { id: string; name: string } }> = ({ record }) => {
  return <span>{record && record.name},&nbsp;</span>;
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      {...props}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      optimized
      draggable
    >
      <FunctionField
        label="Name"
        render={(record?: RecordRA) => (
          <>
            <UrlField to={`/${props.resource}/${record?.id}/show`} name={record?.name} />
            {record?.default && (
              <Tooltip
                arrow
                placement="bottom"
                title="A group of filters that will be returned to the client when requesting filters without specifying an ID"
                classes={{ popper: classes.Tooltip }}
              >
                <span className={classes.Icon}>
                  <AcceptFilterIcon />
                </span>
              </Tooltip>
            )}
          </>
        )}
      />
      <TextField className={classes.IDField} label="id" source="id" />
      <ReferenceArrayField label="Filters" reference="search_filters" source="searchFilterIds">
        <SingleFieldList linkType={false}>
          <FiltersField />
        </SingleFieldList>
      </ReferenceArrayField>
      <FunctionField
        label=""
        render={(record?: RecordRA) => {
          return (
            <div className={classes.MoreActions}>
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          );
        }}
      />
    </DatagridList>
  );
};
