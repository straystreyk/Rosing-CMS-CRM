import * as React from "react";
import { FormProps } from "../../types";
import { ArrayInput, ArrayInputNoDrag, RichTextInput, TextInput } from "../../components/Inputs";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../components/Models/CastMembers/styles";
import { alwaysEmptyString, sanitizeId } from "../../helpers/form";
import { RadioButtonGroupInput } from "../../components/Inputs/RadioButtonGroupInput";
import { SELECT_DISTRIBUTION } from "../../constants/forms-constants";
import { MetaData } from "../../components/Models/Metadata";
import { useFormState } from "react-final-form";

const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
});

const REVERSED_EPISODES_ORDER = [
  { name: "Straight", id: false },
  { name: "Reverse", id: true },
];

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
      <RadioButtonGroupInput
        source="reversedEpisodesOrder"
        label="Distribution"
        initialValue={false}
        choices={REVERSED_EPISODES_ORDER}
      />
      <ArrayInputNoDrag
        resource={resource}
        inputType={props.type}
        helperText={
          "A pair of custom fields that can be used for filtering. You can add multiple pairs."
        }
        ChildComponent={MetaData}
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.metadata` : "metadata"}
        parentSource={parentSource}
        standardSource="metadata"
        index={index}
        label="Metadata"
        groupInputs
        switchable
        fullWidth
      />
      <RadioButtonGroupInput
        source="cmsDistribution"
        label="Distribution"
        choices={SELECT_DISTRIBUTION}
      />
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const classes = useStyles();
  const { seriesId } = useParams<{ seriesId: string }>();

  const { values } = useFormState();
  console.log(values);

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
          initialPushObject={{ metadata: [] }}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          inputType={type}
        />
      )}
    </>
  );
};
