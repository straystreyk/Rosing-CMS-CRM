import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { SelectInputOrigin, SelectInputProps } from "./select-input";
import { makeStyles } from "@material-ui/core";
import { EmptyInput, labelStyles } from "../../styles";
import { useFormState } from "react-final-form";
import { useQuery } from "@apollo/client";
import {
  GET_ONE_DATA_CENTER,
  GET_ONE_EXTERNAL_CATALOG,
  GET_ONE_RIGHT_HOLDER,
} from "../../../Providers/custom-requests";
import { authClient } from "../../../Providers/AuthProvider/client";
import { MainLoader } from "../../../MainLoader";

const useStyles = makeStyles({
  label: labelStyles,
  SelectInputShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& .empty": {
      color: "var(--secondary-color-default)",
    },
  },
});

export const Resource: React.FC<{
  resourceId: string;
  query: any;
  loaderOptions?: { size?: number; flex: boolean };
  component?: React.ElementType;
  to?: string;
}> = ({ resourceId, query, loaderOptions, component: Component = "span", to }) => {
  const { loading, data, error } = useQuery(query, {
    client: authClient,
    variables: { id: resourceId },
  });

  if (loading) return <MainLoader size={20} {...(loaderOptions && loaderOptions)} />;
  if (error) return <span>error</span>;

  return (
    <Component style={{ color: "var(--primary-text-default)" }} to={to}>
      {data.item.name}
    </Component>
  );
};

const ShowView: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  const { values } = useFormState();

  const getValue = (source: string) => {
    switch (source) {
      case "datacenterId":
        return values[props.source] ? (
          <Resource query={GET_ONE_DATA_CENTER} resourceId={values[props.source]} />
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      case "rightHolderId":
        return values[props.source] ? (
          <Resource query={GET_ONE_RIGHT_HOLDER} resourceId={values[props.source]} />
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      case "externalCatalogId":
        return values[props.source] ? (
          <Resource query={GET_ONE_EXTERNAL_CATALOG} resourceId={values[props.source]} />
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      case "productionYear":
        return values[props.source] ? (
          values[props.source] + " year"
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      default:
        return values[props.source] ? values[props.source] : <EmptyInput emptyText="Empty" />;
    }
  };

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.SelectInputShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const SelectInputShow: React.FC<SelectInputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={SelectInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
