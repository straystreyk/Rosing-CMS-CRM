import React from "react";
import { FunctionField, FunctionFieldProps } from "ra-ui-materialui";
import { Record as RecordRA } from "react-admin";
import { Link } from "react-router-dom";
import { ResourceAddIcon, ResourceCountEpisodesIcon } from "../../constants/icons";
import { StandardButton } from "../UI/Buttons/StandardButton/standard-button";
import { TableFieldsStyles } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ NameField: TableFieldsStyles.NameField });

interface ToModelFieldProps extends Omit<FunctionFieldProps, "source" | "render" | "label"> {
  to: string;
  source: string;
  linkSource?: string;
  label: string;
  offLabel?: boolean;
  alwaysButton?: boolean;
  record: RecordRA;
}

export const ToModelField: React.FC<ToModelFieldProps> = ({
  children,
  record,
  alwaysButton,
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      {record && record[props.source].length ? (
        <>
          {alwaysButton ? (
            <StandardButton
              startIcon={<ResourceCountEpisodesIcon />}
              variant="text"
              buttonType="primary"
              text={`${props.label} (${record[props.source].length})`}
              component={Link}
              to={`${props.to}/${record.id}/${props.linkSource ?? props.source}`}
            />
          ) : (
            <Link
              className={classes.NameField}
              to={`${props.to}/${record.id}/${props.linkSource ?? props.source}`}
            >
              {record[props.source].length}
            </Link>
          )}
        </>
      ) : (
        <StandardButton
          startIcon={<ResourceAddIcon />}
          variant="text"
          buttonType="primary"
          text={`Add ${props.label}`}
          component={Link}
          to={`${props.to}/${record?.id}/${props.linkSource ?? props.source}/create`}
        />
      )}
      {children}
    </>
  );
};
