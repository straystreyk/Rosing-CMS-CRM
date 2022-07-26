import { FC } from "react";

export interface StandardCustomFilterProps {
  label: string;
  source: string;
  initialValue?: string;
  defaultActive?: boolean;
}

export interface ChoicesItem {
  name: string;
  value: string | boolean;
}

export interface ChoicesCustomFilter extends StandardCustomFilterProps {
  choices?: ChoicesItem[];
  query?: any;
}

export interface FilterTemplate extends ChoicesCustomFilter {
  component: FC<any>;
  secondSource?: string;
}
