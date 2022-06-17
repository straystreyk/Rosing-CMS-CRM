import * as React from "react";
import { EditInputComponent } from "../FastEditInput";
import { RadioButtonGroupInputOrigin } from "./index";
import { EmptyInput } from "../styles";
import { useFormState } from "react-final-form";
import { StandardInputShowView } from "../StandatdInputs/standard-input-show-view";
import { InputProps } from "../input-types";

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();

  const current = props.choices.filter(
    (el: { id: string; name: string }) => el.id === values[props.source]
  )[0];

  return (
    <StandardInputShowView label={props.label}>
      {!!current ? current.name : <EmptyInput emptyText="Empty" />}
    </StandardInputShowView>
  );
};

export const RadioButtonGroupInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={RadioButtonGroupInputOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
