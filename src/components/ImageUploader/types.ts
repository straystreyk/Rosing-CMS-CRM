export interface ImageProps {
  file: string;
  id: string;
  index?: number;
  kind: string;
  size: number;
  name?: string;
  inputType: string;
  edit: boolean;
}

export interface ImageItemProps extends ImageProps {
  setImageIds: any;
  setServerImages: any;
  openSlider: any;
  source: string;
  serverImages: ImageProps[];
  requestVariables: Record<string, string>;
  sourceIds: string;
}
