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

// export const isChoicesItem = (value: unknown): value is ChoicesItem =>
//   typeof value === "object" && typeof value.name === "string";

export interface ChoicesCustomFilter extends StandardCustomFilterProps {
  choices?: ChoicesItem[];
  query?: any;
}
