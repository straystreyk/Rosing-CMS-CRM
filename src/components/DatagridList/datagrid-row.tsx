import * as React from "react";
import cn from "classnames";
import { Draggable } from "react-beautiful-dnd";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import { ArrayInputItemArrow, DNDIcon } from "../../constants/icons";
import { Collapse, makeStyles } from "@material-ui/core";
import { TableStyles } from "./styles";
import { EditForm } from "../ResourceView/FormWithRedirect";

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

export const MyDatagridRow: React.FC<any> = ({
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
              onClick={(event) => id && onToggleItem(id, event)}
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
                key={`${id}-${field.props.source}`}
                className={classes.TableCell}
              >
                {React.cloneElement(field, {
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

export const MyDatagridRowWithDnd: React.FC<any> = ({
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
