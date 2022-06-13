import { InputProps as InputPropsRA } from "ra-core";

export interface InputProps extends InputPropsRA {
  resource: string;
  inputType: "create" | "edit" | "show";
  source: string;
  offFastEdit?: boolean;
  label?: string;
}

export interface AutocompleteInput extends InputProps {
  choices?: ChoiceInputType[];
}

export interface ShowInputViewProps {
  label: string;
  source: string;
}

export type ChoiceInputType = { id: string; name: string };
