import React from "react";
import { FunctionField, FunctionFieldProps } from "ra-ui-materialui";
import { Record as RecordRA } from "react-admin";
import { Link } from "react-router-dom";
import { ResourceAddIcon } from "../../constants/icons";
import { StandardButton } from "../UI/Buttons/standard-button";
import { TableFieldsStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ NameField: TableFieldsStyles.NameField });

interface ToModelFieldProps extends Omit<FunctionFieldProps, "source" | "render" | "label"> {
  to: string;
  source: string;
  linkSource?: string;
  label: string;
  offLabel?: boolean;
  record: RecordRA;
}

export const ToModelField: React.FC<ToModelFieldProps> = ({ children, record, ...props }) => {
  const classes = useStyles();

  return (
    <>
      {record && record[props.source].length ? (
        <Link
          className={classes.NameField}
          to={`${props.to}/${record.id}/${props.linkSource ?? props.source}`}
        >
          {record[props.source].length}
        </Link>
      ) : (
        <StandardButton
          startIcon={<ResourceAddIcon color="var(--accent-color)" />}
          variant="text"
          customColor="var(--accent-color)"
          style={{ paddingLeft: 0, paddingRight: 0 }}
          text={`Add ${props.label}`}
          component={Link}
          to={`${props.to}/${record?.id}/${props.linkSource ?? props.source}/create`}
        />
      )}
      {children}
    </>
  );
};
