import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { RadioButtonGroupInputOrigin, RadioButtonGroupInputProps } from "./index";
import { EmptyInput } from "../styles";
import { useFormState } from "react-final-form";
import { StandardInputShowView } from "../StandatdInputs/standard-input-show-view";

const ShowView: React.FC<RadioButtonGroupInputProps> = (props) => {
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

export const RadioButtonGroupInputShow: React.FC<RadioButtonGroupInputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={RadioButtonGroupInputOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
