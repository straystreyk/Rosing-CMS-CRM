import * as React from "react";
import { Datagrid, DatagridBody, useListContext } from "react-admin";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { DatagridWrapper } from "./datagrid-wrapper";
import { TableHead } from "@material-ui/core";
import { SortIcon } from "../../constants/icons";

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

export const DatagridHeader: React.FC<any> = ({ children, ...props }) => {
  const { currentSort, setSort, onSelect, perPage, ids, selectedIds, onUnselectItems } =
    useListContext();

  const sort = (source: string) => {
    setSort(source, source === currentSort.field ? inverseOrder(currentSort.order) : "ASC");
  };

  const checkedAll = React.useCallback(() => {
    if (selectedIds !== ids) {
      onSelect(ids);
    } else {
      onUnselectItems();
    }
  }, [selectedIds.length, perPage, onSelect, onUnselectItems, ids]);

  return (
    <TableHead>
      <TableRow>
        <TableCell size="small" padding="checkbox">
          <Checkbox color="primary" checked={selectedIds === ids} onClick={checkedAll} />
        </TableCell>
        {React.Children.map(children, (child: any) => (
          <TableCell width={200} key={child.props.source}>
            {child.props.label}{" "}
            {child.props.source && child.props.label && (
              <button
                style={{
                  verticalAlign: "middle",
                  transformOrigin: "center center",
                  transform:
                    child.props.source === currentSort.field && currentSort.order === "DESC"
                      ? "rotate(180deg)"
                      : "",
                }}
                onClick={() => sort(child.props.source)}
              >
                <SortIcon />
              </button>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

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
        <TableCell component="th" scope="row" size="small" key={`${id}-${field.props.source}`}>
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
export const DatagridList = (props: any) => (
  <DatagridWrapper filters={props.filters}>
    <Datagrid header={props.header ?? <DatagridHeader />} {...props} body={<MyDatagridBody />} />
  </DatagridWrapper>
);
