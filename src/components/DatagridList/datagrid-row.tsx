import * as React from "react";
import cn from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { TableRow, Checkbox, TableCell, Collapse, makeStyles } from "@material-ui/core";

import { EditForm } from "../ResourceView/FormWithRedirect";
import { DatagridRowProps } from "./custom-datagrid-types";
import { DNDIcon } from "../../constants/icons";

import { TableStyles } from "./styles";
import { Identifier } from "ra-core";

const useStyles = makeStyles(TableStyles);

const useTableRow = (
  id?: Identifier,
  onToggleItem?: (id: Identifier | undefined, event: React.TouchEvent | React.MouseEvent) => void
) => {
  const onToggleCheckbox = (event: React.MouseEvent) => {
    event.stopPropagation();
    if ((event.target as HTMLLinkElement).href) return;
    id && onToggleItem && onToggleItem(id, event);
  };

  return {
    onToggleCheckbox,
  };
};

const ExpandRow: React.FC<any> = ({ open, record, resource, expandElement }) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell className={classes.TableCell} colSpan={100} padding="none">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <EditForm
            offTitle
            offToolbar
            offRedirectButton
            record={record}
            resource={resource}
            form="show"
          >
            {expandElement}
          </EditForm>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export const ExpandContext = React.createContext<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}>({ open: false, setOpen: () => "" });

export const MyDatagridRow: React.FC<DatagridRowProps> = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
  offActions,
  expandElement,
  offRowToggle,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { onToggleCheckbox } = useTableRow(id, onToggleItem);

  return (
    <ExpandContext.Provider value={{ setOpen, open }}>
      <TableRow
        className={classes.TableRow}
        key={id}
        onClick={!offRowToggle ? onToggleCheckbox : undefined}
        hover
      >
        {!offActions && (
          <TableCell
            className={cn(classes.TableCheckbox, classes.TableCell)}
            size="small"
            padding="checkbox"
          >
            <Checkbox color="primary" checked={selected} onClick={onToggleCheckbox} />
          </TableCell>
        )}
        {React.Children.map(children, (field, index) => {
          return (
            <>
              <TableCell
                component="th"
                scope="row"
                size="small"
                key={`${id}-${(field as any).props.source}`}
                className={cn(classes.TableCell, (field as any).props.className)}
              >
                {React.cloneElement(field as any, {
                  record,
                  basePath,
                  resource,
                })}
              </TableCell>
            </>
          );
        })}
      </TableRow>
      {expandElement && (
        <ExpandRow open={open} record={record} resource={resource} expandElement={expandElement} />
      )}
    </ExpandContext.Provider>
  );
};

export const MyDatagridRowWithDnd: React.FC<DatagridRowProps> = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
  offRowToggle,
  ids,
}) => {
  const classes = useStyles();
  const { onToggleCheckbox } = useTableRow(id, onToggleItem);

  return (
    <Draggable key={id} draggableId={id!.toString()} index={ids!.indexOf(id as string)}>
      {(provided, snapshot) => (
        <TableRow
          className={classes.DraggableTableRow}
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={!offRowToggle ? onToggleCheckbox : undefined}
          key={id}
          hover
        >
          <TableCell className={classes.TableCheckbox} padding="checkbox">
            <div className={cn(classes.DNDIcon, "DNDIcon")} {...provided.dragHandleProps}>
              <DNDIcon />
            </div>
            <Checkbox color="primary" checked={selected} onClick={onToggleCheckbox} />
          </TableCell>
          {React.Children.map(children, (field, index) => {
            return (
              <TableCell
                component="th"
                scope="row"
                size="small"
                key={`${id}-${(field as any).props.source}`}
                className={(field as any).props.className}
              >
                {React.cloneElement(field as any, {
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
