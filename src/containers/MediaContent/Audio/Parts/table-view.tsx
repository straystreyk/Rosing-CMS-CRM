import * as React from "react";
import { makeStyles } from "@material-ui/core";

import { DatagridList } from "../../../../components/DatagridList";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import { FunctionField } from "react-admin";
import { Record as RecordRA } from "ra-core/esm/types";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";
import { ShowProps } from "../../../../types";
import { Link } from "react-router-dom";
import { Toolbar } from "../../Video/Seasons/toolbar";
import { ExpandWrapper } from "../../../../components/DatagridList/expand-wrapper";
import { Form } from "./form";

const useStyles = makeStyles(TableFieldsStyles);

const PartExpand: React.FC<{ resource: string }> = ({ resource, ...props }) => {
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
        toolbar={Toolbar}
        empty={<EmptyTablePage />}
        expand={<PartExpand resource={props.resource} />}
        datagridWrapperClassName={classes.DatagridWrapperWithoutScroll}
        isDependentModel
        optimized
        offDescription
      >
        <FunctionField
          label="Name"
          render={(record?: RecordRA) => (
            <Link className={classes.NameField} to={`${props.basePath}/${record?.id}/show`}>
              {record?.name}
            </Link>
          )}
        />
        <FunctionField
          label=""
          render={(record?: RecordRA) => (
            <div className={classes.MoreActions}>
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
