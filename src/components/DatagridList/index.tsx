import * as React from "react";
import { Datagrid, DatagridBody, useListContext, useMutation, useRefresh } from "react-admin";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

import { DatagridWrapper } from "./datagrid-wrapper";
import { TableHead } from "@material-ui/core";
import { SortIcon } from "../../constants/icons";
import { CustomDatagridProps } from "./custom-datagrid-types";
import { useNotify } from "ra-core";

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

export const DatagridHeader: React.FC<any> = ({ children, ...props }) => {
  const { currentSort, setSort, onSelect, ids, selectedIds, onUnselectItems } = useListContext();

  const sort = (source: string) => {
    setSort(source, source === currentSort.field ? inverseOrder(currentSort.order) : "ASC");
  };

  const checkedAll = React.useCallback(() => {
    if (selectedIds !== ids) {
      onSelect(ids);
    } else {
      onUnselectItems();
    }
  }, [selectedIds, onSelect, onUnselectItems, ids]);

  return (
    <TableHead>
      <TableRow>
        <TableCell size="small" padding="checkbox">
          <Checkbox color="primary" checked={selectedIds === ids} onClick={checkedAll} />
        </TableCell>
        {React.Children.map(children, (child: any) => (
          <TableCell width={200} key={child.props.source}>
            {child.props.label}&nbsp;
            {child.props.label && (
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
}) => {
  return (
    <TableRow key={id} hover>
      <TableCell size="small" padding="checkbox">
        <Checkbox
          color="primary"
          checked={selected}
          onClick={(event) => id && onToggleItem(id, event)}
        />
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
};

const MyDatagridRowWithDnd: React.FC<any> = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
  ids,
}) => {
  return (
    <Draggable key={id} draggableId={id} index={ids.indexOf(id)}>
      {(provided, snapshot) => (
        <TableRow key={id} hover ref={provided.innerRef} {...provided.draggableProps}>
          <TableCell size="small" padding="checkbox" {...provided.dragHandleProps}>
            <Checkbox
              color="primary"
              checked={selected}
              onClick={(event) => id && onToggleItem(id, event)}
            />
          </TableCell>
          {React.Children.map(children, (field, index) => {
            return (
              <TableCell
                component="th"
                scope="row"
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
      )}
    </Draggable>
  );
};

const MyDatagridBody = (props: any) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const { perPage, page } = useListContext();
  const [mutate, { error, data }] = useMutation();

  React.useEffect(() => {
    if (data && !error) {
      notify(`resources.${props.resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });
      refresh();
    }
    if (error) {
      notify(`resources.${props.resource}.mutations.list.error`, {
        type: "error",
        messageArgs: { error },
      });
      refresh();
    }
  }, [refresh, notify, data, error]);

  const approve = React.useCallback(
    (payload: { id: string; data: Record<string, any> }) => {
      try {
        mutate({
          type: "update",
          resource: props.resource,
          payload: payload,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    },
    [props.resource, mutate]
  );

  const onDragEnd = React.useCallback(
    (result) => {
      if (result.destination) {
        const skip = !!((page - 1) * perPage) ? (page - 1) * perPage : 0;
        const destination = result.destination.index + 1 + skip;
        const id = result.draggableId;
        const data = props.data[id];
        const payload = { id, data: { ...data, position: destination } };

        approve(payload);
      }
    },
    [perPage, page, props.data, approve]
  );

  if (props.draggable) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${props.basePath}`} type={props.basePath}>
          {(provided, snapshot) => (
            <>
              <DatagridBody
                {...props}
                row={<MyDatagridRowWithDnd ids={props.ids} />}
                ref={provided.innerRef}
                {...provided.droppableProps}
              />
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return <DatagridBody {...props} row={<MyDatagridRow />} />;
};
export const DatagridList = (props: CustomDatagridProps) => (
  <DatagridWrapper filters={props.filters}>
    <Datagrid
      header={props.header ?? <DatagridHeader />}
      {...props}
      body={<MyDatagridBody draggable={props.draggable} />}
    />
  </DatagridWrapper>
);
