import * as React from "react";
import cn from "classnames";
import { useNotify } from "ra-core";
import { TableHead } from "@material-ui/core";
import { Datagrid, DatagridBody, useListContext, useMutation, useRefresh } from "react-admin";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core";

import { DatagridWrapper } from "./datagrid-wrapper";
import { ActiveSortIcon, DNDIcon, SortIcon } from "../../constants/icons";
import { CustomDatagridProps } from "./custom-datagrid-types";
import { BulkActions } from "../BulkActions";

const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");

const CheckedIcon = () => (
  <svg width="21" height="21" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#00A991" />
    <line
      x1="7"
      y1="12.0049"
      x2="16"
      y2="12.0049"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const useStyles = makeStyles({
  TableCheckbox: {
    "&.MuiTableCell-paddingCheckbox": {
      padding: "0 12px 0 24px",
    },
    position: "relative",
  },
  DraggableTableRow: {
    "& .DNDIcon": {
      height: 30,
      "& svg": {
        height: "100%",
      },
    },
    "&:hover .DNDIcon": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  DNDIcon: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    opacity: 0,
    pointerEvents: "none",
    transition: "0.35s all ease",
  },
  TableCellHeader: {
    "& button": {
      color: "var(--primary-text-default)",
      fontWeight: 600,
      fontSize: 14,
    },
    "&.active button": {
      color: "var(--primary-focus)",
    },
  },
});

export const DatagridHeader: React.FC<any> = ({ children, ...props }) => {
  const { currentSort, setSort, onSelect, ids, selectedIds, onUnselectItems } = useListContext();
  const classes = useStyles();

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
        <TableCell
          className={cn(classes.TableCheckbox, classes.TableCellHeader)}
          padding="checkbox"
        >
          <Checkbox
            checkedIcon={<CheckedIcon />}
            color="primary"
            checked={selectedIds === ids}
            onClick={checkedAll}
          />
        </TableCell>
        {React.Children.map(children, (child: any) => (
          <TableCell
            className={cn(
              classes.TableCellHeader,
              currentSort.field === child.props.source && "active"
            )}
            width={200}
            key={child.props.source}
          >
            {child.props.label && (
              <button onClick={() => sort(child.props.source)}>
                {child.props.label}&nbsp;
                <span
                  style={{
                    verticalAlign: "middle",
                    display: "inline-block",
                    transform:
                      child.props.source === currentSort.field && currentSort.order === "DESC"
                        ? "rotate(180deg) translateY(3px)"
                        : "",
                  }}
                >
                  {child.props.source !== currentSort.field ? <SortIcon /> : <ActiveSortIcon />}
                </span>
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
  const classes = useStyles();

  return (
    <TableRow key={id} hover>
      <TableCell className={classes.TableCheckbox} size="small" padding="checkbox">
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
  const classes = useStyles();

  return (
    <Draggable key={id} draggableId={id} index={ids.indexOf(id)}>
      {(provided, snapshot) => (
        <TableRow
          className={classes.DraggableTableRow}
          key={id}
          hover
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <TableCell className={classes.TableCheckbox} padding="checkbox">
            <div className={cn(classes.DNDIcon, "DNDIcon")} {...provided.dragHandleProps}>
              <DNDIcon />
            </div>
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

  return <DatagridBody {...props} row={<MyDatagridRow ids={props.ids} />} />;
};
export const DatagridList: React.FC<CustomDatagridProps> = ({
  listText,
  offDescription,
  toolbar,
  ...props
}) => (
  <DatagridWrapper
    toolbar={toolbar}
    resource={props.resource}
    basePath={props.basePath}
    offDescription={offDescription}
    filters={props.filters}
    listText={listText}
  >
    <BulkActions />
    <Datagrid
      header={props.header ?? <DatagridHeader />}
      {...props}
      body={<MyDatagridBody draggable={props.draggable} />}
    />
  </DatagridWrapper>
);
