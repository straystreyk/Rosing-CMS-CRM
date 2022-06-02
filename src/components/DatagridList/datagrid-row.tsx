import * as React from "react";
import cn from "classnames";
import { Draggable } from "react-beautiful-dnd";
import { TableRow, Checkbox, TableCell, Collapse, makeStyles } from "@material-ui/core";

import { EditForm } from "../ResourceView/FormWithRedirect";
import { DatagridRowProps } from "./custom-datagrid-types";
import { ArrayInputItemArrow, DNDIcon } from "../../constants/icons";

import { TableStyles } from "./styles";

const useStyles = makeStyles(TableStyles);

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
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow className={classes.TableRow} key={id} hover>
        {!offActions && (
          <TableCell
            className={cn(classes.TableCheckbox, classes.TableCell)}
            size="small"
            padding="checkbox"
          >
            <Checkbox
              color="primary"
              checked={selected}
              onClick={(event) => id && onToggleItem && onToggleItem(id, event)}
            />
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
                className={classes.TableCell}
              >
                {React.cloneElement(field as any, {
                  record,
                  basePath,
                  resource,
                })}
                {index === 0 && expandElement && (
                  <button className={classes.ExpandIcon} onClick={() => setOpen(!open)}>
                    <ArrayInputItemArrow color="var(--secondary-color-main)" />
                  </button>
                )}
              </TableCell>
            </>
          );
        })}
      </TableRow>
      {expandElement && (
        <ExpandRow open={open} record={record} resource={resource} expandElement={expandElement} />
      )}
    </>
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
  ids,
}) => {
  const classes = useStyles();

  return (
    <Draggable key={id} draggableId={id!.toString()} index={ids!.indexOf(id as string)}>
      {(provided, snapshot) => (
        <TableRow
          className={classes.DraggableTableRow}
          key={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          hover
        >
          <TableCell className={classes.TableCheckbox} padding="checkbox">
            <div className={cn(classes.DNDIcon, "DNDIcon")} {...provided.dragHandleProps}>
              <DNDIcon />
            </div>
            <Checkbox
              color="primary"
              checked={selected}
              onClick={(event) => id && onToggleItem && onToggleItem(id, event)}
            />
          </TableCell>
          {React.Children.map(children, (field, index) => {
            return (
              <TableCell
                component="th"
                scope="row"
                size="small"
                key={`${id}-${(field as any).props.source}`}
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
