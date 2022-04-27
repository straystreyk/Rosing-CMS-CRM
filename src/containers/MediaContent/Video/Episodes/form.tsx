import * as React from "react";
import { useFormState } from "react-final-form";

import { FormProps } from "../../../../types";
import {
  ArrayInput,
  formatTimeInput,
  NumberInput,
  parseTimeInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../../components/Inputs";
import { alwaysEmptyString, sanitizeId, scrollToErrorInput } from "../../../../helpers/form";
import { useParams } from "react-router-dom";
import { INPUT_LABEL_PROPS } from "../../../../constants/forms-constants";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../../../components/Models/CastMembers/styles";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";

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
}> = ({ parentSourceWithIndex, resource, parentSource, index, show, inputType, ...props }) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  const [showResource, setShowResource] = React.useState(show);

  React.useEffect(() => {
    setShowResource(show);
  }, [show]);

  return (
    <>
      {index && !["edit", "show"].includes(inputType) && <div>New episode number {+index + 1}</div>}
      <div
        style={{
          height: !showResource && !["edit", "show"].includes(inputType) ? 0 : "auto",
          overflow: !showResource && !["edit", "show"].includes(inputType) ? "hidden" : "unset",
        }}
      >
        <TextInput
          resource={resource}
          inputType={inputType}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.seasonId` : "seasonId"}
          label="Series id"
          initialValue={sanitizeId(seasonId)}
          style={{ display: "none" }}
          fullWidth
        />
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
        <RichTextInput
          resource={resource}
          inputType={inputType}
          label="Description"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.description` : "description"}
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
      </div>
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const formState = useFormState();
  const classes = useStyles();

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
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
      <ScrollTopButton />
    </>
  );
};
