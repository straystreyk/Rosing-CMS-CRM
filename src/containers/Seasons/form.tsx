import * as React from "react";
import { FormProps } from "../../types";
import { ArrayInput, TextInput } from "../../components/Inputs";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles } from "../../components/Models/CastMembers/styles";
import { TextInputOrigin } from "../../components/Inputs/StandatdInputs/TextInput/text-input";

const useStyles = makeStyles({
  ArrayInputStyles,
});

const Season: React.FC<{
  parentSourceWithIndex: string;
  show: boolean;
  resource: string;
  type: string;
}> = ({ parentSourceWithIndex, resource, type, show }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <TextInputOrigin
        resource={resource}
        inputType={type}
        source={`${parentSourceWithIndex}.seriesId`}
        label="seriesId"
        initialValue={id.replace(/%3D/g, "=")}
        fullWidth
      />
      <TextInputOrigin resource={resource} inputType={type} label="Name" source="name" fullWidth />
      <TextInputOrigin resource={resource} inputType={type} label="Slug" source="slug" fullWidth />
      <TextInput
        resource={resource}
        inputType={type}
        label="Description"
        source="description"
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
  return (
    <>
      <ArrayInput
        source="seasons"
        getItemLabel={() => ""}
        childcomponent={Season}
        itemClass={classes.ArrayInputStyles}
        resource={resource}
        inputType={type}
      />
    </>
  );
};
