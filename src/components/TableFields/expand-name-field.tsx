import * as React from "react";
import { UrlField } from "./url-field";
import { TableFieldsStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandContext } from "../DatagridList/datagrid-row";
import { ArrayInputItemArrow } from "../../constants/icons";

const useStyles = makeStyles(TableFieldsStyles);

export const ExpandNameField: React.FC<{ title: string; to: string; name: string }> = ({
  title,
  to,
  name,
}) => {
  const classes = useStyles();
  const { setOpen } = React.useContext(ExpandContext);

  const expand = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen && setOpen((p: boolean) => !p);
    },
    [setOpen]
  );

  return (
    <div className={classes.Expand}>
      <span className="title" onClick={expand}>
        {title}
        <button className="expandButton">
          <ArrayInputItemArrow className="icon" />
        </button>
      </span>
      <div>
        <UrlField to={to} name={name} />
      </div>
    </div>
  );
};
