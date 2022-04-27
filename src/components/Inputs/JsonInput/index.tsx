import * as React from "react";
import { JsonInput as JsonInputRA } from "react-admin-json-view";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import { EditInputComponent } from "../edit-input-component";

interface JsonInputProps extends React.ComponentProps<typeof JsonInputRA> {
  inputType: "create" | "edit" | "show";
  resource: string;
}

const useStyles = makeStyles({
  JsonInput: {
    "& label": labelStyles,
  },
});

const JsonInputShow: React.FC<React.ComponentProps<typeof JsonInputRA>> = (props) => {
  return <EditInputComponent ComponentInput={JsonInput} ComponentShow={JsonInput} {...props} />;
};

export const JsonInput: React.FC<JsonInputProps> = ({ inputType, ...rest }) => {
  const classes = useStyles();
  return inputType === "show" ? (
    <JsonInputShow {...rest} />
  ) : (
    <div className={classes.JsonInput}>
      <JsonInputRA {...rest} />
    </div>
  );
};
