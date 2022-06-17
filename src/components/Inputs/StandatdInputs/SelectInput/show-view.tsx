import * as React from "react";
import { EditInputComponent } from "../../FastEditInput";
import { SelectInputOrigin } from "./select-input";
import { EmptyInput } from "../../styles";
import { useFormState } from "react-final-form";
import { StandardInputShowView } from "../standard-input-show-view";
import { InputProps } from "../../input-types";

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

export const SelectInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={SelectInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
