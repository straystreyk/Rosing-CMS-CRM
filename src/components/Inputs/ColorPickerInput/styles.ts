import { labelStyles } from "../styles";

export const ColorPickerStyles = {
  ColorPickerInput: {
    margin: "8px 0",
    display: "inline-block",
  },
  PaletteButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--secondary-color-disable)",
  },
  PaletteWrapper: {
    display: "flex",
    alignItems: "flex-start",
    "& .MuiFormControl-root": {
      margin: 0,
    },
  },
  Label: { ...labelStyles, marginBottom: 8, display: "inline-block" },
};
