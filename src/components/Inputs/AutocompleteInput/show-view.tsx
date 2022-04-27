import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { AutocompleteInputProps as AutocompleteInputPropsRA } from "ra-ui-materialui/lib/input/AutocompleteInput";
import { AutocompleteInput } from "./index";
import { useFormState } from "react-final-form";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import { GET_ONE_VIDEO_FILE } from "../../Providers/custom-requests";
import { Resource } from "../StandatdInputs/SelectInput/show-view";

const useStyles = makeStyles({
  label: labelStyles,
  AutoCompleteShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& .empty": {
      color: "var(--secondary-color-default)",
    },
  },
});

const ShowView: React.FC<InputProps> = (props: InputProps) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "streamSourceId":
        return values[props.source] ? (
          <Resource query={GET_ONE_VIDEO_FILE} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      default:
        return values[props.source] ? (
          values[props.source]
        ) : (
          <div className="empty">Not filled in</div>
        );
    }
  };

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.AutoCompleteShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const AutocompleteShow: React.FC<AutocompleteInputPropsRA> = (props) => {
  return (
    <EditInputComponent ComponentInput={AutocompleteInput} ComponentShow={ShowView} {...props} />
  );
};
