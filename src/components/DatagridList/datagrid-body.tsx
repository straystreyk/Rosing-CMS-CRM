import * as React from "react";
import { useNotify } from "ra-core";
import { DatagridBody, useListContext, useMutation, useRefresh } from "react-admin";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MyDatagridRow, MyDatagridRowWithDnd } from "./datagrid-row";
import { DatagridBodyProps } from "./custom-datagrid-types";

const useDatagridBody = (resource: string, tableData?: { [p: string]: { [s: string]: any } }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [mutate, { error, data }] = useMutation();
  const { perPage, page } = useListContext();

  React.useEffect(() => {
    if (data && !error) {
      notify(`resources.${resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });
      refresh();
    }
    if (error) {
      notify(`resources.${resource}.mutations.list.error`, {
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
          resource,
          payload,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    },
    [resource, mutate]
  );

  const onDragEnd = React.useCallback(
    (result) => {
      if (result.destination && tableData) {
        const skip = !!((page - 1) * perPage) ? (page - 1) * perPage : 0;
        const destination = result.destination.index + 1 + skip;
        const id = result.draggableId;
        const data = tableData[id];
        const payload = { id, data: { ...data, position: destination } };

        approve(payload);
      }
    },
    [perPage, page, tableData, approve]
  );

  return {
    onDragEnd,
  };
};

export const MyDatagridBody: React.FC<DatagridBodyProps> = ({
  offActions,
  expandElement,
  resource,
  draggable,
  ...props
}) => {
  const { onDragEnd } = useDatagridBody(resource, props.data);

  if (draggable) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${props.basePath}`} type={props.basePath}>
          {(provided, snapshot) => (
            <>
              <DatagridBody
                {...props}
                row={
                  <MyDatagridRowWithDnd
                    onToggleItem={props.onToggleItem}
                    resource={resource}
                    basePath={props.basePath}
                    expandElement={expandElement}
                    offActions={offActions}
                    ids={props.ids}
                  />
                }
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

  return (
    <DatagridBody
      {...props}
      row={
        <MyDatagridRow
          resource={resource}
          onToggleItem={props.onToggleItem}
          expandElement={expandElement}
          offActions={offActions}
          ids={props.ids}
        />
      }
    />
  );
};
