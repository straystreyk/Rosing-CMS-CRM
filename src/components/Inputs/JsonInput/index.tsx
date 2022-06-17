import * as React from "react";
import { JsonInput as JsonInputRA } from "react-admin-json-view";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import { EditInputComponent } from "../FastEditInput";
import { useFormState } from "react-final-form";
import { ArrowFilterIcon } from "../../CustomFilters/constants";
import { InputProps } from "../input-types";

const useStyles = makeStyles({
  JsonInput: {
    "& label": labelStyles,
  },
  JsonInputShow: {
    color: "var(--primary-text-default)",
    paddingLeft: 15,
    position: "relative",
    "& p": {
      paddingLeft: 15,
    },
    "& > button": {
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
});

const ShowView: React.FC<InputProps> = ({ source, label }) => {
  const { values } = useFormState();
  const [active, setActive] = React.useState(!!Object.keys(values[source]).length);
  const classes = useStyles();

  const handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive((p) => !p);
  };

  return (
    <div className={classes.JsonInput}>
      <label>{label}</label>
      <div className={classes.JsonInputShow}>
        <button onClick={handleShow}>
          <ArrowFilterIcon color="#005AA3" />
        </button>
        <div>&#123; {!active && <>... &#125;</>}</div>
        {active && (
          <>
            {Object.keys(values[source]).map((el) => {
              return (
                <p>
                  "{el}": "{values[source][el]}"
                </p>
              );
            })}
            <div>&#125;</div>
          </>
        )}
      </div>
    </div>
  );
};

const JsonInputShow: React.FC<InputProps> = (props) => {
  return <EditInputComponent ComponentInput={JsonInputRA} ComponentShow={ShowView} {...props} />;
};

export const JsonInput: React.FC<InputProps> = ({ inputType, ...rest }) => {
  const classes = useStyles();
  return inputType === "show" ? (
    <JsonInputShow inputType={inputType} {...rest} />
  ) : (
    <div className={classes.JsonInput}>
      <JsonInputRA {...rest} />
    </div>
  );
};
