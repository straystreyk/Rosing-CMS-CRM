import * as React from "react";
import { JsonInput as JsonInputRA } from "react-admin-json-view";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import { EditInputComponent } from "../edit-input-component";
import { useFormState } from "react-final-form";
import { ArrowFilterIcon } from "../../CustomFilters/constants";

interface JsonInputProps extends React.ComponentProps<typeof JsonInputRA> {
  inputType: "create" | "edit" | "show";
  resource: string;
}

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

const ShowView: React.FC<React.ComponentProps<typeof JsonInputRA>> = ({ source }) => {
  const { values } = useFormState();
  const [active, setActive] = React.useState(true);
  const classes = useStyles();

  const handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive((p) => !p);
  };

  if (!Object.keys(values[source]).length) {
    return <div>Not filled in</div>;
  }

  return (
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
  );
};

const JsonInputShow: React.FC<React.ComponentProps<typeof JsonInputRA>> = (props) => {
  return <EditInputComponent ComponentInput={JsonInput} ComponentShow={ShowView} {...props} />;
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
