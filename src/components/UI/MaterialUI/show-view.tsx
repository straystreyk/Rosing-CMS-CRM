import * as React from "react";
import { InputProps } from "../../Inputs/input-types";
import { EditInputComponent } from "../../Inputs/FastEditInput";
import { CheckBoxGroupOrigin } from "./check-box-group";

export const ShowView: React.FC<InputProps> = ({ label }) => {
  return <div>asdsa</div>;
};

export const CheckBoxGroupShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={CheckBoxGroupOrigin} ComponentShow={ShowView} {...props} />
  );
};
