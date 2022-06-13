import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core";
import { EmptyInput, labelStyles } from "../styles";
import { AutocompleteInput as AutocompleteInputProps } from "../input-types";
import { UrlField } from "../../TableFields/url-field";
import { AutocompleteInputOrigin } from "./index";

const useStyles = makeStyles({
  label: labelStyles,
  AutoCompleteShowValue: {
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& .empty": {
      color: "var(--secondary-color-default)",
    },
  },
});

const getLink = (source: string) => {
  let link: string;
  switch (source) {
    case "rightHolderId":
      link = "/media_content/attributes/providers/right_holders";
      break;
    case "externalCatalogId":
      link = "/media_content/attributes/providers/content_providers";
      break;
    default:
      link = "";
  }

  return link;
};

const ShowView: React.FC<AutocompleteInputProps> = (props) => {
  const { values } = useFormState();
  const classes = useStyles();
  const current =
    values[props.source] && props.choices && props.choices.length
      ? props.choices.filter((choice) =>
          choice && choice.id ? values[props.source].toString() === choice.id.toString() : []
        )[0]
      : "";

  const link = getLink(props.source);

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.AutoCompleteShowValue}>
        {!!current && current.name && link && (
          <UrlField to={`${link}/${current.id}/show`} name={current.name} />
        )}
        {!!current && current.name && !link && current.name}
        {!!current && !current.name && current.toString()}
        {!current && <EmptyInput emptyText="Empty" />}
      </div>
    </div>
  );
};

export const AutocompleteShow: React.FC<AutocompleteInputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={AutocompleteInputOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
