import { InputProps as InputPropsRA } from "ra-core";

export interface InputProps extends InputPropsRA {
  resource: string;
  inputType: "create" | "edit" | "show";
  source: string;
  offFastEdit?: boolean;
}

export interface ShowInputViewProps {
  label: string;
  source: string;
}
