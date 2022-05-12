import * as React from "react";
import { FormProps } from "../../../../types";
import { useFormState } from "react-final-form";
import { alwaysEmptyString, sanitizeId, scrollToErrorInput } from "../../../../helpers/form";
import {
  ArrayInput,
  AutocompleteArrayInput,
  formatTimeInput,
  NumberInput,
  parseTimeInput,
  requiredValidate,
  TextInput,
} from "../../../../components/Inputs";
import { useParams } from "react-router-dom";
import {
  INPUT_LABEL_PROPS,
  PUBLISHED_CHOICES_FORM,
  SELECT_DISTRIBUTION,
  SELECT_MARKERS,
} from "../../../../constants/forms-constants";
import { SwitchInput } from "../../../../components/Inputs/SwitchInput";
import { GroupInputsOrigin } from "../../../../components/GroupInputs";
import { RadioButtonGroupInput } from "../../../../components/Inputs/RadioButtonGroupInput";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../../../components/Models/CastMembers/styles";
import { ArrayInputItemArrow } from "../../../../constants/icons";
import { ModelFormStyles } from "../../../../components/ResourceView/FormWithRedirect/styles";

const FIXED_HEADER_OFFSET = 80;

const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
  ...ModelFormStyles,
});

const Part: React.FC<{
  resource: string;
  inputType: "edit" | "show";
  parentSource?: string;
  index?: string;
  parentSourceWithIndex?: string;
  show?: boolean;
}> = ({ resource, inputType, parentSourceWithIndex, index, show }) => {
  const { audioShowId } = useParams<{ audioShowId: string }>();
  const [showResource, setShowResource] = React.useState(show);
  const classes = useStyles();
  const formState = useFormState();

  const showArrayInputItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowResource((p) => !p);
  };

  React.useEffect(() => {
    setShowResource(show);
  }, [show]);

  return (
    <>
      {index && !["edit", "show"].includes(inputType) && (
        <div className={classes.ArrayInputItemName} onClick={showArrayInputItem}>
          New Part {+index + 1} <ArrayInputItemArrow />
        </div>
      )}
      <div
        style={{
          height: !showResource && !["edit", "show"].includes(inputType) ? 0 : "auto",
          overflow: !showResource && !["edit", "show"].includes(inputType) ? "hidden" : "unset",
        }}
      >
        <TextInput
          resource={resource}
          inputType={inputType}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.audioShowId` : "audioShowId"}
          initialValue={sanitizeId(audioShowId)}
          label="Audio show ID"
          style={{ display: "none" }}
          fullWidth
        />
        <NumberInput
          resource={resource}
          validate={requiredValidate}
          inputType={inputType}
          label="Number of the part"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.number` : "number"}
          fullWidth
        />
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={inputType}
          label="Name"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.name` : "name"}
          fullWidth
          helperText="The name of the part that users will see in any sections of the application"
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
        <AutocompleteArrayInput
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.markers` : "markers"}
          label="Label"
          inputType={inputType}
          choices={SELECT_MARKERS}
          helperText="The element that is displayed on top of the movie card in the application. If the film is to be released, the label will be ignored."
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
          step="1"
          type="time"
          fullWidth
        />
        <SwitchInput
          resource={resource}
          label="Downloading a movie"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.downloadable` : "downloadable"}
          helperText="Download and play the movie offline, available in the app for Android and iOS"
          inputType={inputType}
          labelPlacement="start"
        />
        {index && formState.values.parts[index] && formState.values.parts[index]["downloadable"] && (
          <GroupInputsOrigin inputType={inputType}>
            <NumberInput
              label="Storage time"
              helperText="The storage time of the downloaded movie in offline mode is calculated in days. By default, the storage time is 30 days."
              source={
                parentSourceWithIndex ? `${parentSourceWithIndex}.storageTime` : "storageTime"
              }
              inputType={inputType}
            />
          </GroupInputsOrigin>
        )}
        <RadioButtonGroupInput
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.published` : "published"}
          label="Publishing"
          initialValue={false}
          inputType={inputType}
          choices={PUBLISHED_CHOICES_FORM}
        />
        <RadioButtonGroupInput
          source={
            parentSourceWithIndex ? `${parentSourceWithIndex}.cmsDistribution` : "cmsDistribution"
          }
          label="Distribution"
          inputType={inputType}
          choices={SELECT_DISTRIBUTION}
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
      {type !== "create" && <Part resource={resource} inputType={type} />}
      {type === "create" && (
        <ArrayInput
          source="parts"
          getItemLabel={alwaysEmptyString}
          ChildComponent={Part}
          resource={resource}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          inputType={type}
        />
      )}
    </>
  );
};
