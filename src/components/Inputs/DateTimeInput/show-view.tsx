import * as React from "react";
import { InputProps } from "ra-core";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core";

import { DateTimeInputOrigin } from "./date-time-input";
import { EditInputComponent } from "../edit-input-component";
import { TextInputStyles } from "../StandatdInputs/TextInput/styles";

const useStyles = makeStyles({
  TextInputStyles,
  ShowView: {
    color: "var(--primary-text-default)",
    fontSize: 14,
    lineHeight: "20px",
    marginTop: 4,
    "& .empty": {
      color: "var(--secondary-color-default)",
    },
  },
});

const ShowView: React.FC<InputProps> = ({ source, label }) => {
  const { values } = useFormState();
  const classes = useStyles();

  return (
    <div>
      <div className={classes.TextInputStyles}>
        <label>{label}</label>
        <div className={classes.ShowView}>
          {values[source] ? (
            <>
              {new Date(values[source]).toLocaleDateString()},{" "}
              {new Date(values[source]).toLocaleTimeString()}
            </>
          ) : (
            <div className="empty">Not filled in</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const DateTimeInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={DateTimeInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
