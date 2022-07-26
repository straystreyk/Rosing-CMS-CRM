import * as React from "react";
import cn from "classnames";

import { BulkDeleteButton } from "ra-ui-materialui";
import { useListContext } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { BulkActionsStyles } from "./styles";
import { DeleteIcon } from "../../constants/icons";

const useStyles = makeStyles(BulkActionsStyles);

export const BulkActions: React.FC = () => {
  const { selectedIds } = useListContext();
  const classes = useStyles();

  return (
    <div className={cn(classes.BulkActionsWrapper, selectedIds.length && "active")}>
      <span className="title">Selected: {selectedIds.length}</span>
      <div className={classes.BulkActions}>
        <BulkDeleteButton
          icon={<DeleteIcon />}
          className={cn(classes.Button, "delete")}
          label="Delete"
        />
      </div>
    </div>
  );
};
