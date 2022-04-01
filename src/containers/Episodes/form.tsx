import * as React from "react";
import { useFormState } from "react-final-form";

import { FormProps } from "../../types";
import {
  ArrayInput,
  formatTimeInput,
  NumberInput,
  parseTimeInput,
  requiredValidate,
  TextInput,
} from "../../components/Inputs";
import { alwaysEmptyString, sanytizeId, scrollToErrorInput } from "../../helpers/form";
import { useParams } from "react-router-dom";
import { INPUT_LABEL_PROPS } from "../../constants/forms-constants";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../components/Models/CastMembers/styles";

const FIXED_HEADER_OFFSET = 80;
const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
});

const Episode: React.FC<{
  parentSourceWithIndex?: string;
  parentSource?: string;
  index?: string;
  show?: boolean;
  resource: string;
  inputType: string;
}> = ({ parentSourceWithIndex, resource, parentSource, index, inputType, ...props }) => {
  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={inputType}
        label="Name"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.name` : "name"}
        fullWidth
        helperText={
          "The name of the episode that users will see in any sections of the application"
        }
      />
      <TextInput
        resource={resource}
        inputType={inputType}
        label="Slug"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.slug` : "slug"}
        helperText={
          "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
        }
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={inputType}
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.originalName` : "originalName"}
        label="Original name"
        helperText={
          "The original non-localized title of the movie, which users will see only in the description"
        }
        fullWidth
      />
      <NumberInput
        resource={resource}
        inputType={inputType}
        label="Number"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.number` : "number"}
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={inputType}
        label="Description"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.description` : "description"}
        resettable={false}
        fullWidth
        multiline
        rows={4}
      />
      <TextInput
        InputLabelProps={INPUT_LABEL_PROPS}
        resource={resource}
        parse={parseTimeInput}
        format={formatTimeInput}
        inputType={inputType}
        resettable={false}
        helperText="Specified in hours and minutes. If you leave the field empty, the duration will be filled in automatically after saving, provided that the video file is specified."
        label="Duration"
        source={parentSourceWithIndex ? `${parentSourceWithIndex}.duration` : "duration"}
        type="time"
        fullWidth
      />
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const formState = useFormState();
  const classes = useStyles();
  const { seasonId } = useParams<{ seasonId: string }>();

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
      <TextInput
        resource={resource}
        inputType={type}
        source="seasonId"
        label="Series id"
        initialValue={sanytizeId(seasonId)}
        style={{ display: "none" }}
        fullWidth
      />
      {type !== "create" && <Episode resource={resource} inputType={type} />}
      {type === "create" && (
        <ArrayInput
          source="episodes"
          getItemLabel={alwaysEmptyString}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          ChildComponent={Episode}
          resource={resource}
          inputType={type}
        />
      )}
    </>
  );
};
