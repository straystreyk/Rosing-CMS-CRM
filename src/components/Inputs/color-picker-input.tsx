import * as React from "react";
import * as _ from "lodash";
import { makeStyles } from "@material-ui/core";
import { useField } from "react-final-form";

const useStyles = makeStyles({
  PaletteButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--secondary-color-disable)",
  },
});

export const ColorPickerInput: React.FC<{ source: string }> = ({ source }) => {
  const classes = useStyles();
  const ref = React.useRef(null);
  const { input } = useField(source, { type: "color", initialValue: "#000000" });
  const [target, setTarget] = React.useState<HTMLInputElement | null>(null);

  const debounced = _.debounce(input.onChange, 1);

  const customOnChange = (event: any) => {
    debounced(event);
  };

  React.useEffect(() => {}, [input.value]);

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

  return (
    <>
      <button className={classes.PaletteButton} onClick={showPalette} />
      <input
        {...input}
        onChange={customOnChange}
        type="color"
        ref={ref}
        style={{ width: 0, height: 0, opacity: 0 }}
      />
    </>
  );
};
