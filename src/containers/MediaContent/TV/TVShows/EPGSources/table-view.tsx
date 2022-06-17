import * as React from "react";
import { FunctionField } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { Record as RecordRA } from "ra-core/esm/types";
import { Link } from "react-router-dom";

import { ShowProps } from "../../../../../types";
import { DatagridList } from "../../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../../components/EmptyTablePage";
import { TableFieldsStyles } from "../../../../../components/TableFields/styles";
import { EPGSourceToolbar } from "./toolbar";
import { tableLinks } from "./epg-source-links";
import { MoreActionsButton } from "../../../../../components/UI/Buttons/MoreActionsButton";
import { DeleteButton } from "../../../../../components/UI/RA/delete-button";
import { StandardButton } from "../../../../../components/UI/Buttons/StandardButton/standard-button";
import { EditIcon } from "../../../../../constants/icons";

const useStyles = makeStyles({
  ...TableFieldsStyles,
  BigDatagridList: {
    "& table": {
      minWidth: 1500,
    },
  },
});

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <DatagridList
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      toolbar={EPGSourceToolbar}
      datagridWrapperClassName={classes.BigDatagridList}
      optimized
      {...props}
    >
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link
            className={classes.NameField}
            to={`/${props.resource}/${tableLinks[record?.type.split("::")[2]]}/${record?.id}/show`}
          >
            {record?.name}
          </Link>
        )}
      />
      <FunctionField
        label="Type of EPG source"
        source="type"
        render={(record?: RecordRA) => record?.type}
      />
      <FunctionField
        label="Source channel UID"
        source="sourceChannelUid"
        render={(record?: RecordRA) =>
          record?.sourceChannelUid ?? <span className={classes.Empty}>Empty</span>
        }
      />
      <FunctionField
        label="Imported at"
        source="importedAt"
        render={(record?: RecordRA) =>
          record?.importedAt ? (
            <>
              {new Date(record?.importedAt).toLocaleDateString()},&nbsp;
              {new Date(record?.importedAt).toTimeString()}
            </>
          ) : (
            <span className={classes.Empty}>Empty</span>
          )
        }
      />
      <FunctionField
        label="Count Program Events"
        source="countProgramEvents"
        offsort
        render={(record?: RecordRA) =>
          record?.countProgramEvents ?? <span className={classes.Empty}>Empty</span>
        }
      />
      <FunctionField
        label="Count Serialized Program Events"
        source="countSerializedProgramEvents"
        offsort
        render={(record?: RecordRA) =>
          record?.countSerializedProgramEvents ?? <span className={classes.Empty}>Empty</span>
        }
      />
      <FunctionField
        label=""
        className={classes.MoreActions}
        render={(record?: RecordRA) => (
          <MoreActionsButton>
            <StandardButton
              component={Link}
              startIcon={<EditIcon />}
              variant="text"
              buttonType="secondary"
              to={`/${props.resource}/${tableLinks[record?.type.split("::")[2]]}/${
                record?.id
              }/edit`}
            >
              Edit
            </StandardButton>
            <DeleteButton record={record} basePath={props.basePath} />
          </MoreActionsButton>
        )}
      />
    </DatagridList>
  );
};
