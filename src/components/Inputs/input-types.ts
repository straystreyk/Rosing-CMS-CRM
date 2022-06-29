import { InputProps as InputPropsRA } from "ra-core";
import { CSSProperties } from "react";

export type InputFormType = "create" | "edit" | "show";

export interface InputProps extends InputPropsRA {
  resource: string;
  inputType: InputFormType;
  source: string;
  offFastEdit?: boolean;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export interface AutocompleteInput extends InputProps {
  choices?: ChoiceInputType[];
}

export interface ComponentArrayInputType extends InputProps {
  parentSourceWithIndex: string;
  parentSource: string;
  index: string | number;
  resource: string;
}

export type ChoiceInputType = {
  name: string;
  id: string | number | boolean;
  value?: string | number | boolean;
};
