import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { useFormState } from "react-final-form";
import { NumberInputOrigin } from "./numdber-input";
import { EmptyInput } from "../../styles";
import { StandardInputShowView } from "../standard-input-show-view";

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();

  const getValue = (source: string) => {
    switch (source) {
      case "storageTime":
        return values[props.source] ? (
          values[props.source] + " days"
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      default:
        return values[props.source] ? values[props.source] : <EmptyInput emptyText="Empty" />;
    }
  };

  return (
    <StandardInputShowView label={props.label}>{getValue(props.source)}</StandardInputShowView>
  );
};

export const NumberInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={NumberInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
