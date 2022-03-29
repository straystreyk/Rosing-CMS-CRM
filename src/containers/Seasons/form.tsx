import * as React from "react";
import { FormProps } from "../../types";
import { ArrayInput, TextInput } from "../../components/Inputs";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles } from "../../components/Models/CastMembers/styles";
import { alwaysEmptyString, sanytizeId } from "../../helpers/form";

const useStyles = makeStyles({
  ArrayInputStyles,
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
    <div>
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
    </div>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type, ...props }) => {
  const classes = useStyles();
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <>
      <TextInput
        resource={resource}
        inputType={type}
        source="seriesId"
        label="Series id"
        initialValue={sanytizeId(seriesId)}
        fullWidth
      />
      {type !== "create" && <Season resource={resource} type={type} />}
      {type === "create" && (
        <ArrayInput
          source="seasons"
          getItemLabel={alwaysEmptyString}
          ChildComponent={Season}
          itemClass={classes.ArrayInputStyles}
          resource={resource}
          inputType={type}
        />
      )}
    </>
  );
};
