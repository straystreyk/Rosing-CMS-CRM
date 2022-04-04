import * as React from "react";
import { FormProps } from "../../types";
import { ArrayInput, RichTextInput, TextInput } from "../../components/Inputs";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../components/Models/CastMembers/styles";
import { alwaysEmptyString, sanitizeId } from "../../helpers/form";

const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
});

const Season: React.FC<{
  parentSourceWithIndex?: string;
  parentSource?: string;
  index?: string;
  show?: boolean;
  resource: string;
  type: string;
}> = ({ parentSourceWithIndex, resource, parentSource, index, ...props }) => {
  return (
    <>
      <TextInput
        resource={resource}
        label="Name"
        inputType={props.type}
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.name` : "name"}
        fullWidth
      />
      <TextInput
        resource={resource}
        label="Slug"
        inputType={props.type}
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.slug` : "slug"}
        fullWidth
      />
      <RichTextInput
        resource={resource}
        inputType={props.type}
        label="Description"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.description` : "description"}
      />
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const classes = useStyles();
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <>
      <TextInput
        resource={resource}
        inputType={type}
        source="seriesId"
        label="Series id"
        initialValue={sanitizeId(seriesId)}
        style={{ display: "none" }}
        fullWidth
      />
      {type !== "create" && <Season resource={resource} type={type} />}
      {type === "create" && (
        <ArrayInput
          source="seasons"
          getItemLabel={alwaysEmptyString}
          ChildComponent={Season}
          resource={resource}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          inputType={type}
        />
      )}
    </>
  );
};
