import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { TextInput } from "../StandatdInputs/TextInput/text-input";
import { useForm, useFormState } from "react-final-form";
import { Validator } from "react-admin";
import { StandardButton } from "../../UI/Buttons/standard-button";
import { PlusIcon } from "../../../constants/icons";
import { ColorPickerShow } from "./show-view";
import { ColorPickerStyles } from "./styles";

const useStyles = makeStyles(ColorPickerStyles);

export interface ColorPickerInputProps {
  source: string;
  resource: string;
  label?: string;
  errorSource?: string;
  inputType: "create" | "edit" | "show";
}

export const ColorPickerInputOrigin: React.FC<ColorPickerInputProps> = ({
  source,
  label,
  errorSource,
}) => {
  const classes = useStyles();
  const form = useForm();
  const { values } = useFormState();
  const ref = React.useRef(null);
  const [target, setTarget] = React.useState<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState(values[source] ?? "");
  const [active, setActive] = React.useState(!!values[source]);
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
  }, [active, ref]);

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    const color = e.target.value;
    timeout = setTimeout(() => {
      setValue(color);
      form.change(source, color);
    }, 200);
  };

  return (
    <div>
      <div className={classes.ColorPickerInput}>
        {active ? (
          <>
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
                source={source}
                resettable={false}
                disabled={true}
                validate={validator as Validator}
                initialValue={value}
                label=""
              />
            </div>
          </>
        ) : (
          <StandardButton
            startIcon={<PlusIcon color="var(--primary-button-default)" />}
            color="secondary"
            variant="text"
            onClick={() => setActive(true)}
          >
            Add {label}
          </StandardButton>
        )}
      </div>
    </div>
  );
};

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <ColorPickerShow inputType={inputType} {...rest} />
  ) : (
    <ColorPickerInputOrigin inputType={inputType} {...rest} />
  );
};
