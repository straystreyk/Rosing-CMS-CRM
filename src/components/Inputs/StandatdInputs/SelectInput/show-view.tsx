import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { SelectInputOrigin, SelectInputProps } from "./select-input";
import { EmptyInput } from "../../styles";
import { useFormState } from "react-final-form";
import { useQuery } from "@apollo/client";
import { authClient } from "../../../Providers/AuthProvider/client";
import { MainLoader } from "../../../MainLoader";
import { StandardInputShowView } from "../standard-input-show-view";

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
  const { values } = useFormState();

  const getValue = (source: string) => {
    switch (source) {
      default:
        return values[props.source] ? values[props.source] : <EmptyInput emptyText="Empty" />;
    }
  };

  return (
    <StandardInputShowView label={props.label}>{getValue(props.source)}</StandardInputShowView>
  );
};

export const SelectInputShow: React.FC<SelectInputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={SelectInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
