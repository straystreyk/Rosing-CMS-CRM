import * as React from "react";
import { FormProps } from "../../types";
import { ArrayInput, TextInput } from "../../components/Inputs";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles } from "../../components/Models/CastMembers/styles";

const useStyles = makeStyles({
  ArrayInputStyles,
});

const Season: React.FC<{
  parentSourceWithIndex?: string;
  show?: boolean;
  index?: string;
  resource: string;
  type: string;
}> = ({ parentSourceWithIndex, resource, ...props }) => {
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
      <TextInput
        resource={resource}
        inputType={props.type}
        label="Description"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.description` : "description"}
        resettable={false}
        fullWidth
        multiline
        rows={4}
      />
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type, ...props }) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const getItemsLabel = React.useCallback(() => "", []);

  return (
    <>
      <TextInput
        resource={resource}
        inputType={type}
        source="seriesId"
        label="Series id"
        initialValue={unescape(id)}
        fullWidth
      />
      {type !== "create" && <Season resource={resource} type={type} />}
      {type === "create" && (
        <ArrayInput
          source="seasons"
          getItemLabel={getItemsLabel}
          childcomponent={Season}
          itemClass={classes.ArrayInputStyles}
          resource={resource}
          inputType={type}
        />
      )}
    </>
  );
};
