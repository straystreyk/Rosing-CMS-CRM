import * as React from "react";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../../types";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <ScrollTopButton />
    </>
  );
};
