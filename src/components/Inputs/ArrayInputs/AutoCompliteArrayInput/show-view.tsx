import * as React from "react";
import { useFormState } from "react-final-form";
import { EditInputComponent } from "../../edit-input-component";
import { makeStyles } from "@material-ui/core";
import { AutoCompleteInputStyles } from "./styles";
import { AutocompleteArrayInputProps } from "./type";
import { AutocompleteArrayInputOrigin } from "./autocomplite-array-input";
import cn from "classnames";

const useStyles = makeStyles({
  AutoCompleteInputStyles,
  AutoCompleteShow: {
    marginTop: 4,
    "& span": {
      color: "var(--primary-text-default)",
      position: "relative",
      fontSize: 14,
      marginLeft: 4,
      "&.item:before": {
        content: "''",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 1,
        backgroundColor: "var(--primary-text-default)",
        position: "absolute",
      },
      "&.empty": {
        color: "#9FA5A8",
        position: "static",
      },
      "&:first-child": {
        marginLeft: 0,
      },
    },
  },
});

const ShowView: React.FC<{
  label: string;
  source: string;
  choices: any[];
}> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();

  const current =
    values[props.source] && props.choices.length
      ? props.choices.filter((choice) =>
          choice && choice.id ? values[props.source].includes(choice.id) : []
        )
      : [];

  return (
    <div className={classes.AutoCompleteInputStyles}>
      <label>{props.label}</label>
      <div className={cn(classes.AutoCompleteShow, "AutoCompleteShow")}>
        {current && current.length ? (
          current.map((el, index) => {
            return (
              <span className="item" key={index}>
                {el.name}
                {index !== current.length - 1 && ","}
              </span>
            );
          })
        ) : (
          <span className="empty">Not filled in</span>
        )}
      </div>
    </div>
  );
};

export const AutoCompleteArrayInputShow: React.FC<AutocompleteArrayInputProps> = (props) => {
  const classes = useStyles();
  return (
    <EditInputComponent
      componentClassName={classes.AutoCompleteInputStyles}
      ComponentInput={AutocompleteArrayInputOrigin}
      ComponentShow={ShowView}
      resource={props.resource}
      source={props.source}
      fullWidth
      {...props}
    />
  );
};
