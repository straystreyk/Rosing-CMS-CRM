import * as React from "react";
import { FunctionField, Record, Record as RecordRA } from "react-admin";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { DatagridList } from "../../../../components/DatagridList";
import { ShowProps } from "../../../../types";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { Toolbar } from "../Seasons/toolbar";
import { PublishedIcons, UnPublishedIcons } from "../../../../constants/icons";
import { ExpandWrapper } from "../../../../components/DatagridList/expand-wrapper";
import { Form } from "./form";
import cn from "classnames";

const useStyles = makeStyles(TableFieldsStyles);

const EpisodesExpand: React.FC<{ resource: string }> = ({ resource, ...props }) => {
  return (
    <ExpandWrapper>
      <Form resource={resource} type="show" />
    </ExpandWrapper>
  );
};

export const TableView: React.FC<ShowProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <DatagridList
        {...props}
        optimized
        toolbar={Toolbar}
        basePath={props.basePath}
        expand={<EpisodesExpand resource={props.resource} />}
        empty={<EmptyTablePage />}
        datagridWrapperClassName={classes.DatagridWrapperWithoutScroll}
        isDependentModel
        offDescription
      >
        <FunctionField
          label="Name"
          source="name"
          render={(record?: RecordRA) => (
            <Link
              className={cn(classes.NameField, "Expand")}
              to={`${props.basePath}/${record?.id}/show`}
            >
              {record?.name}
            </Link>
          )}
        />
        <FunctionField
          label=""
          render={(record?: Record) => (
            <div className={classes.MoreActions}>
              {record?.published ? (
                <button>
                  <PublishedIcons />
                </button>
              ) : (
                <button>
                  <UnPublishedIcons />
                </button>
              )}
              <MoreActionsButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          )}
        />
      </DatagridList>
    </>
  );
};
