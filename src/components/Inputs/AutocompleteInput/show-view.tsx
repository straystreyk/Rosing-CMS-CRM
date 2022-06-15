import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { useFormState } from "react-final-form";
import { EmptyInput } from "../styles";
import { AutocompleteInput as AutocompleteInputProps } from "../input-types";
import { UrlField } from "../../TableFields/url-field";
import { AutocompleteInputOrigin } from "./index";
import { StandardInputShowView } from "../StandatdInputs/standard-input-show-view";

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
  const current =
    values[props.source] && props.choices && props.choices.length
      ? props.choices.filter((choice) =>
          choice && choice.id ? values[props.source].toString() === choice.id.toString() : []
        )[0]
      : "";

  const link = getLink(props.source);

  return (
    <StandardInputShowView label={props.label}>
      {!!current && current.name && link && (
        <UrlField to={`${link}/${current.id}/show`} name={current.name} />
      )}
      {!!current && current.name && !link && current.name}
      {!!current && !current.name && current.toString()}
      {!current && <EmptyInput emptyText="Empty" />}
    </StandardInputShowView>
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
