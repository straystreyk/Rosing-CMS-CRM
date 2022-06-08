import * as React from "react";
import { Datagrid } from "react-admin";

import { DatagridWrapper } from "./datagrid-wrapper";
import { CustomDatagridProps } from "./custom-datagrid-types";
import { BulkActions } from "../BulkActions";
import { DatagridHeader } from "./datagrid-header";
import { MyDatagridBody } from "./datagrid-body";

export const DatagridList: React.FC<CustomDatagridProps> = ({
  listText,
  offDescription,
  toolbar,
  datagridWrapperClassName,
  offActions,
  expand,
  isDependentModel,
  header,
  resource,
  offRowToggle,
  ...props
}) => {
  return (
    <DatagridWrapper
      toolbar={toolbar}
      resource={resource}
      basePath={props.basePath}
      offDescription={offDescription}
      filters={props.filters}
      listText={listText}
      datagridWrapperClassName={datagridWrapperClassName}
    >
      <BulkActions />
      <Datagrid
        {...props}
        resource={resource}
        header={
          header ?? <DatagridHeader isDependentModel={isDependentModel} offActions={offActions} />
        }
        body={
          <MyDatagridBody
            data={props.data}
            resource={resource}
            expandElement={expand}
            offActions={offActions}
            draggable={props.draggable}
            offRowToggle={offRowToggle}
          />
        }
      />
    </DatagridWrapper>
  );
};
