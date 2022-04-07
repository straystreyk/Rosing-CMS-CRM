import * as React from "react";
import { Datagrid, DatagridBody } from "react-admin";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

const MyDatagridRow: React.FC<any> = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
}) => (
  <TableRow key={id} hover>
    <TableCell size="small" padding="checkbox">
      <Checkbox color="primary" checked={selected} onClick={(event) => onToggleItem(id, event)} />
    </TableCell>
    {React.Children.map(children, (field, index) => {
      return (
        <TableCell
          component="th"
          scope="row"
          width={150}
          size="small"
          key={`${id}-${field.props.source}`}
        >
          {React.cloneElement(field, {
            record,
            basePath,
            resource,
          })}
        </TableCell>
      );
    })}
  </TableRow>
);

const MyDatagridBody = (props: any) => <DatagridBody {...props} row={<MyDatagridRow />} />;
export const DatagridList = (props: any) => <Datagrid {...props} body={<MyDatagridBody />} />;
