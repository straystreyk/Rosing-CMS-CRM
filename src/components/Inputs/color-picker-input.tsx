import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { TextInput } from "./StandatdInputs/TextInput/text-input";
import { labelStyles } from "./styles";
import { useForm, useFormState } from "react-final-form";
import { Validator } from "react-admin";

const useStyles = makeStyles({
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
  Label: { ...labelStyles, marginBottom: 4, display: "inline-block" },
});

export const ColorPickerInput: React.FC<{
  source: string;
  label?: string;
  errorSource?: string;
}> = ({ source, label, errorSource }) => {
  const classes = useStyles();
  const form = useForm();
  const { values } = useFormState();
  const ref = React.useRef(null);
  const [target, setTarget] = React.useState<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState(values[source] ?? "#000000");
  let timeout: ReturnType<typeof setTimeout>;

  const validateColor = React.useCallback(
    (a: string, b: Record<string, any>) => {
      if (errorSource && a === b[errorSource]) {
        return "This color already in use";
      }
    },
    [errorSource]
  );
  const validator: unknown = [validateColor];

  const showPalette = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (target) {
        target.click();
      }
    },
    [target]
  );

  React.useEffect(() => {
    if (ref.current) {
      setTarget(ref.current);
    }
  }, [ref]);

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    const color = e.target.value;
    timeout = setTimeout(() => {
      setValue(color);
      form.change(source, color);
    }, 200);
  };

  const changeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
  };

  return (
    <div>
      <span className={classes.Label}>{label}</span>
      <div className={classes.PaletteWrapper}>
        <button
          style={{ backgroundColor: value }}
          className={classes.PaletteButton}
          onClick={showPalette}
        />
        <input
          onChange={changeColor}
          value={value}
          type="color"
          ref={ref}
          style={{ width: 0, height: 0, opacity: 0 }}
        />
        <TextInput
          helperText={false}
          onChange={changeTextInput}
          source={source}
          resettable={false}
          disabled={true}
          validate={validator as Validator}
          initialValue={value}
          label=""
        />
      </div>
    </div>
  );
};
