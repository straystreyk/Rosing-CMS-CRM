export interface StandardCustomFilterProps {
  label: string;
  source: string;
  defaultActive?: boolean;
}

interface ChoicesItem {
  name: string;
  value: string | boolean;
}

export interface ChoicesCustomFilter extends StandardCustomFilterProps {
  choices: ChoicesItem[];
}
