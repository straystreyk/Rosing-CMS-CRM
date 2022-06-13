import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { InputProps } from "ra-core";
import { useFormState } from "react-final-form";

import { EditInputComponent } from "../../edit-input-component";
import { AutocompleteArrayFreeSoloOrigin } from "./index";
import { AutocompleteInput } from "../../input-types";
import { EmptyInput, TextInputShowValue } from "../../styles";
import { TextInputStyles } from "../../StandatdInputs/TextInput/styles";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue,
});

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      default:
        return values[props.source] && values[props.source].length ? (
          values[props.source].join(", ")
        ) : (
          <EmptyInput emptyText="Empty" />
        );
    }
  };

  return (
    <div className={classes.TextInputStyles}>
      <label>{props.label}</label>
      <div className={classes.TextInputShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const AutocompleteArrayFreeSoloShow: React.FC<AutocompleteInput> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={AutocompleteArrayFreeSoloOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
