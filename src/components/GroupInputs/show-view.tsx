import * as React from "react";
import { EditInputComponent } from "../Inputs/edit-input-component";
import { GroupInputsOrigin } from "./index";

const ShowView: React.FC<any> = (props) => {
  return <div>show</div>;
};

export const GroupInputsShow: React.FC = React.memo((props) => {
  return (
    <EditInputComponent ComponentShow={ShowView} ComponentInput={GroupInputsOrigin} {...props} />
  );
});
