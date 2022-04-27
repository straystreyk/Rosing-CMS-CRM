import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useRef } from "react";

const useStyles = makeStyles({
  PaletteButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--secondary-color-disable)",
  },
});

export const ColorPickerInput = () => {
  const ref = useRef(null);
  const [target, setTarget] = React.useState<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState<string>("#000000");
  const classes = useStyles();

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setValue(event.target.value);
  };

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
      <button
        style={{ backgroundColor: value }}
        className={classes.PaletteButton}
        onClick={showPalette}
      />
      <input
        type="color"
        onChange={changeColor}
        value={value}
        ref={ref}
        style={{ width: 0, height: 0, opacity: 0 }}
      />
    </>
  );
};
