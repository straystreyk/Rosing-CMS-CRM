import React from "react";
import { ReferenceInput as ReferenceInputAdmin, ReferenceInputProps } from "react-admin";

export const ReferenceInput: React.FC<ReferenceInputProps> = (props) => {
  return (
    <ReferenceInputAdmin
      {...props}
      label={props.label}
      source={props.source}
      reference={props.reference}
    >
      {props.children}
    </ReferenceInputAdmin>
  );
};
