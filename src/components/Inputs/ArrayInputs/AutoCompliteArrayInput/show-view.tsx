import * as React from "react";
import cn from "classnames";
import { useFormState } from "react-final-form";
import { EditInputComponent } from "../../FastEditInput";
import { makeStyles } from "@material-ui/core";
import { AutoCompleteInputStyles } from "./styles";
import { AutocompleteArrayInputOrigin } from "./autocomplite-array-input";
import { ChoiceInputType, InputProps } from "../../input-types";
import { UrlField } from "../../../TableFields/url-field";
import { EmptyInput } from "../../styles";
import _ from "lodash";

const useStyles = makeStyles({
  AutoCompleteInputStyles,
  AutoCompleteShow: {
    "& span": {
      color: "var(--primary-text-default)",
      position: "relative",
      fontSize: 14,
      marginLeft: 4,
      // "&.item:before": {
      //   content: "''",
      //   bottom: 0,
      //   left: 0,
      //   width: "100%",
      //   height: 1,
      //   backgroundColor: "var(--primary-text-default)",
      //   position: "absolute",
      // },
      "&.empty": {
        color: "var(--secondary-color-default)",
        position: "static",
      },
      "&:first-child": {
        marginLeft: 0,
      },
    },
  },
});

const getLink = (source: string) => {
  let link: string;
  switch (source) {
    case "genreIds":
      link = "/media_content/attributes/genres";
      break;
    case "languageIds":
      link = "/media_content/attributes/languages";
      break;
    case "streamSourceIds":
      link = "/media_content/video/video_files";
      break;
    default:
      link = "";
  }

  return link;
};

const ShowView: React.FC<{
  label: string;
  source: string;
  choices: ChoiceInputType[];
}> = React.memo((props) => {
  const { values } = useFormState();
  const classes = useStyles();
  const value = _.get(values, props.source);

  const current =
    value && props.choices.length
      ? props.choices.filter((choice) =>
          choice && (choice.value || choice.id) ? value.includes(choice.value || choice.id) : []
        )
      : [];
  const link = getLink(props.source);

  return (
    <div className={classes.AutoCompleteInputStyles}>
      {props.label && <label>{props.label}</label>}
      <div className={cn(classes.AutoCompleteShow, "AutoCompleteShow")}>
        {current && current.length ? (
          current.map((el, index) => {
            if (link) {
              return (
                <React.Fragment key={index.toString()}>
                  <UrlField to={`${link}/${el.id}/show`} name={el.name} />
                  {index !== current.length - 1 && ", "}
                </React.Fragment>
              );
            }
            return (
              <span className="item" key={index}>
                {el.name}
                {link}
                {index !== current.length - 1 && ","}
              </span>
            );
          })
        ) : (
          <EmptyInput emptyText="Empty" />
        )}
      </div>
    </div>
  );
});

export const AutoCompleteArrayInputShow: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  return (
    <EditInputComponent
      componentClassName={classes.AutoCompleteInputStyles}
      ComponentInput={AutocompleteArrayInputOrigin}
      ComponentShow={ShowView}
      fullWidth
      {...props}
    />
  );
};
