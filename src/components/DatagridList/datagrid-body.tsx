import * as React from "react";
import { useNotify } from "ra-core";
import { DatagridBody, useListContext, useMutation, useRefresh } from "react-admin";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MyDatagridRow, MyDatagridRowWithDnd } from "./datagrid-row";

export const MyDatagridBody: React.FC<any> = ({
  offActions,
  expandElement,
  isDependentModel,
  ...props
}) => {
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
                row={
                  <MyDatagridRowWithDnd
                    isDependentModel={isDependentModel}
                    expandElement={expandElement}
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
          isDependentModel={isDependentModel}
          expandElement={expandElement}
          offActions={offActions}
          ids={props.ids}
        />
      }
    />
  );
};
