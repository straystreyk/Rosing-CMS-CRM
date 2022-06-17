import * as React from "react";
import { EditInputComponent } from "../../FastEditInput";
import { useFormState } from "react-final-form";
import { NumberInputOrigin } from "./numdber-input";
import { EmptyInput } from "../../styles";
import { StandardInputShowView } from "../standard-input-show-view";
import { InputProps } from "../../input-types";
import { UrlField } from "../../../TableFields/url-field";

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();

  const getValue = (source: string) => {
    switch (source) {
      case "storageTime":
        return values[props.source] ? (
          values[props.source] + " days"
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      case "kinopoiskId":
        return values[props.source] ? (
          <UrlField
            component="a"
            target="_blank"
            href={values.kinopoiskUrl && values.kinopoiskUrl}
            name={values[props.source]}
            to=""
          />
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      case "imdbId":
        return values[props.source] ? (
          <UrlField
            component="a"
            target="_blank"
            href={values.imdbUrl && values.imdbUrl}
            name={values[props.source]}
            to=""
          />
        ) : (
          <EmptyInput emptyText="Empty" />
        );
      default:
        return values[props.source] ? values[props.source] : <EmptyInput emptyText="Empty" />;
    }
  };

  return (
    <StandardInputShowView label={props.label}>{getValue(props.source)}</StandardInputShowView>
  );
};

export const NumberInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={NumberInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
