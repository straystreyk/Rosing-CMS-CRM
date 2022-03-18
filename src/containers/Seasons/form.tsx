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
        helperText={"The name of the series that users will see in any sections of the application"}
      />
      <TextInputOrigin
        resource={resource}
        inputType={type}
        label="Slug"
        source="slug"
        helperText={
          "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
        }
        fullWidth
      />
      <TextInputOrigin source={`${parentSourceWithIndex}.position`} label="Position" fullWidth />
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
        draggable
      />
    </>
  );
};
