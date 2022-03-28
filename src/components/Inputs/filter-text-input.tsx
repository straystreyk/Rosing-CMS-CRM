import * as React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core";
import { ChangeEvent } from "react";
import { FilterContext } from "../ResourceView";

const useStyles = makeStyles({
  FilterTextInput: {
    width: 450,
    outline: "none",
    padding: "8px 12px",
    color: "var(--primary-text-default)",
    border: "1px solid #9FA5A8",
    borderRadius: 4,
    transition: "0.35s border ease",
    "&:focus": {
      outline: "2px solid #7FC5FF",
      outlineOffset: "2px",
    },
  },
});

export const FilterTextInput = ({ source, setModalFilters, initialValue }: any) => {
  const context = React.useContext(FilterContext);
  const input: React.Ref<HTMLInputElement> = React.useRef(null);
  const [value, setValue] = React.useState(initialValue ? initialValue : "");
  const classes = useStyles();

  React.useEffect(() => {
    if (!context.filter[source]) {
      setValue("");
    }
  }, [context.filter, source]);

  const changeInput = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (input.current) {
        setModalFilters((prev: Record<string, string>) =>
          input.current?.value
            ? {
                ...prev,
                [source]: input.current.value,
              }
            : _.omit(prev, source)
        );
      }
    },
    [input, source, setModalFilters]
  );

  return (
    <>
      <input
        onChange={changeInput}
        id={source}
        name={source}
        value={value}
        className={classes.FilterTextInput}
        type="text"
        ref={input}
      />
    </>
  );
};
