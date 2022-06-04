import * as React from "react";
import { useListContext } from "react-admin";
import { Checkbox, makeStyles, TableCell, TableHead, TableRow } from "@material-ui/core";
import cn from "classnames";
import { ActiveSortIcon, SortIcon } from "../../constants/icons";
import { TableStyles } from "./styles";

const useStyles = makeStyles(TableStyles);

const inverseOrder = (sort: string) => {
  switch (sort) {
    case "ASC":
      return "DESC";
    case "DESC":
      return "";
  }
};

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

const useDatagridHeader = () => {
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
  return {
    sort,
    checkedAll,
    currentSort,
    ids,
    selectedIds,
  };
};

const DependentModelHeader: React.FC<any> = ({ offActions, children }) => {
  const { ids, checkedAll, selectedIds } = useDatagridHeader();
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {!offActions && (
          <TableCell
            className={cn(classes.TableCheckbox, "DependentModel")}
            size="small"
            padding="checkbox"
          >
            <Checkbox
              checkedIcon={<CheckedIcon />}
              checked={selectedIds === ids}
              onClick={checkedAll}
              color="primary"
            />
          </TableCell>
        )}
        {React.Children.map(children, (child: any, index) => (
          <TableCell
            className={classes.TableCellHeader}
            width={1000}
            key={child.props.source || index}
          >
            {index === 0 && <button onClick={checkedAll}>Checked all</button>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const DatagridHeader: React.FC<any> = ({
  children,
  offActions,
  isDependentModel,
  ...props
}) => {
  const classes = useStyles();
  const { sort, ids, currentSort, checkedAll, selectedIds } = useDatagridHeader();

  return !isDependentModel ? (
    <TableHead>
      <TableRow>
        {!offActions && (
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
        )}
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
              <button onClick={() => !child.props.offsort && sort(child.props.source)}>
                {child.props.label}&nbsp;
                {!child.props.offsort && (
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
                )}
              </button>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  ) : (
    <DependentModelHeader offActions={offActions}>{children}</DependentModelHeader>
  );
};
