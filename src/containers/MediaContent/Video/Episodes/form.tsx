import * as React from "react";
import { useFormState } from "react-final-form";

import { FormProps } from "../../../../types";
import {
  ArrayInput,
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  formatTimeInput,
  NumberInput,
  parseTimeInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../../components/Inputs";
import { alwaysEmptyString, sanitizeId, scrollToErrorInput } from "../../../../helpers/form";
import { useParams } from "react-router-dom";
import {
  INPUT_LABEL_PROPS,
  PUBLISHED_CHOICES_FORM,
  SELECT_DISTRIBUTION,
  SELECT_MARKERS,
} from "../../../../constants/forms-constants";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../../../components/Models/CastMembers/styles";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { MetaData } from "../../../../components/Models/Metadata";
import { ImageUploaderV2 } from "../../../../components/ImageUploader";
import { ReferenceArrayInput } from "../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { GroupInputsOrigin } from "../../../../components/GroupInputs";
import { SwitchInput } from "../../../../components/Inputs/SwitchInput";
import { RadioButtonGroupInput } from "../../../../components/Inputs/RadioButtonGroupInput";
import { ModelFormStyles } from "../../../../components/ResourceView/FormWithRedirect/styles";
import { ArrayInputItemArrow } from "../../../../constants/icons";
import { Collapse } from "@material-ui/core";

const FIXED_HEADER_OFFSET = 80;
const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
  EpisodeImage: {
    display: "block",
    "& .ImageItemWrapper": {
      marginBottom: 16,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& .ImageItem": {
      borderStyle: "solid",
    },
  },
  ...ModelFormStyles,
});

const IMAGE_REQUEST_VARS = { fieldName: "Episode" };
const INPUT_ITEMS_PER_PAGE = 25;

const Episode: React.FC<{
  parentSourceWithIndex?: string;
  parentSource?: string;
  index?: string;
  show?: boolean;
  resource: string;
  inputType: "create" | "edit" | "show";
}> = React.memo(
  ({ parentSourceWithIndex, resource, parentSource, index, show, inputType, ...props }) => {
    const { seasonId } = useParams<{ seasonId: string }>();
    const formState = useFormState();
    const classes = useStyles();

    const [showResource, setShowResource] = React.useState(show);

    const showArrayInputItem = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setShowResource((p) => !p);
    };

    React.useEffect(() => {
      setShowResource(show);
    }, [show]);

    React.useEffect(() => {
      if (formState.submitFailed) {
        scrollToErrorInput(FIXED_HEADER_OFFSET);
      }
    }, [formState.submitFailed]);

    return (
      <>
        {index && !["edit", "show"].includes(inputType) && (
          <div className={classes.ArrayInputItemName} onClick={showArrayInputItem}>
            New episode number {+index + 1}
            <ArrayInputItemArrow color="var(--secondary-color-main)" />
          </div>
        )}
        <Collapse in={showResource || ["edit", "show"].includes(inputType)} timeout="auto">
          <TextInput
            resource={resource}
            inputType={inputType}
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.seasonId` : "seasonId"}
            label="Season id"
            initialValue={sanitizeId(seasonId)}
            style={{ display: "none" }}
            offFastEdit
            fullWidth
          />
          <NumberInput
            resource={resource}
            inputType={inputType}
            label="Number of episode"
            helperText="Chronological episode number"
            validate={requiredValidate}
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
            helperText="The name of the episode that users will see in any sections of the application"
          />
          <TextInput
            resource={resource}
            inputType={inputType}
            label="Slug"
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.slug` : "slug"}
            helperText="It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
            fullWidth
          />
          <TextInput
            resource={resource}
            inputType={inputType}
            source={
              parentSourceWithIndex ? `${parentSourceWithIndex}.originalName` : "originalName"
            }
            label="Original name"
            helperText={
              "The original non-localized title of the movie, which users will see only in the description"
            }
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
          <TextInput
            InputLabelProps={INPUT_LABEL_PROPS}
            resource={resource}
            inputType={inputType}
            resettable={false}
            helperText="Release date in the country where the application is used. If the release is upcoming, then the date is mandatory."
            label="Release date"
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.releaseDate` : "releaseDate"}
            type="date"
            fullWidth
          />
          <AutocompleteArrayInput
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.markers` : "markers"}
            label="Label"
            resource={resource}
            inputType={inputType}
            choices={SELECT_MARKERS}
            helperText="The element that is displayed on top of the movie card in the application. If the film is to be released, the label will be ignored."
          />
          <ArrayInputNoDrag
            resource={resource}
            inputType={inputType}
            helperText="A pair of custom fields that can be used for filtering. You can add multiple pairs."
            ChildComponent={MetaData}
            parentSource={parentSource}
            index={index}
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.metadata` : "metadata"}
            standardSource="metadata"
            label="Metadata"
            groupInputs
            switchable
            fullWidth
          />
          <ImageUploaderV2
            wrapperClassName={classes.EpisodeImage}
            requestVariables={IMAGE_REQUEST_VARS}
            sourceIds={parentSourceWithIndex ? `${parentSourceWithIndex}.imageIds` : "imageIds"}
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.images` : "images"}
            index={index}
            resource={resource}
            inputType={inputType}
            offInfo
          />
          <ReferenceArrayInput
            label="Video file"
            source={
              parentSourceWithIndex ? `${parentSourceWithIndex}.streamSourceIds` : "streamSourceIds"
            }
            reference="media_content/video/video_files"
            resource={resource}
            perPage={INPUT_ITEMS_PER_PAGE}
            validate={requiredValidate}
          >
            <AutocompleteArrayInput
              optionText="name"
              source={
                parentSourceWithIndex
                  ? `${parentSourceWithIndex}.streamSourceIds`
                  : "streamSourceIds"
              }
              resource={resource}
              inputType={inputType}
              helperText="You can select several video files from the list, the first one will be used by default. If the video file is not in the list, make sure that it has been successfully transcoded in the Video files section"
            />
          </ReferenceArrayInput>
          <GroupInputsOrigin
            label="Preroll"
            inputType={inputType}
            groupHelperText="Block of commercials at the beginning of the video, let's say one block"
          >
            <NumberInput
              inputType={inputType}
              source={
                parentSourceWithIndex ? `${parentSourceWithIndex}.preRollCount` : "preRollCount"
              }
              resource={resource}
              label="Number of commercials"
            />
          </GroupInputsOrigin>
          <GroupInputsOrigin
            label="Midroll"
            inputType={inputType}
            groupHelperText="A block of commercials in the middle of the video, several blocks are allowed. The number of blocks depends on the offset time of their display and the duration of the video."
          >
            <NumberInput
              inputType={inputType}
              resource={resource}
              source={
                parentSourceWithIndex ? `${parentSourceWithIndex}.midRollCount` : "midRollCount"
              }
              label="Number of commercials"
            />
            <NumberInput
              inputType={inputType}
              resource={resource}
              source={
                parentSourceWithIndex
                  ? `${parentSourceWithIndex}.firstMidRollOffset`
                  : "firstMidRollOffset"
              }
              label="Showing the first midroll"
              helperText="Shift time of the first midroll in seconds from the beginning of the video"
            />
            <NumberInput
              inputType={inputType}
              resource={resource}
              source={
                parentSourceWithIndex
                  ? `${parentSourceWithIndex}.nthMidRollOffset`
                  : "nthMidRollOffset"
              }
              label="Show subsequent midrolls"
              helperText="Time to shift the display of subsequent midrolls in seconds from the start of displaying the first midroll"
            />
          </GroupInputsOrigin>
          {parentSourceWithIndex && parentSource && index && (
            <>
              <SwitchInput
                label="Downloadable"
                resource={resource}
                source={
                  parentSourceWithIndex ? `${parentSourceWithIndex}.downloadable` : "downloadable"
                }
                inputType={inputType}
                labelPlacement="start"
              />
              {index &&
                formState.values.episodes[index] &&
                formState.values.episodes[index]["downloadable"] && (
                  <GroupInputsOrigin inputType={inputType}>
                    <NumberInput
                      resource={resource}
                      label="Storage time"
                      helperText="The storage time of the downloaded movie in offline mode is calculated in days. By default, the storage time is 30 days."
                      source="storageTime"
                      inputType={inputType}
                    />
                  </GroupInputsOrigin>
                )}
            </>
          )}
          {!parentSourceWithIndex && (
            <>
              <SwitchInput
                label="Downloadable"
                source="downloadable"
                inputType={inputType}
                resource={resource}
                labelPlacement="start"
              />
              {formState.values.downloadable && (
                <GroupInputsOrigin inputType={inputType}>
                  <NumberInput
                    label="Storage time"
                    helperText="The storage time of the downloaded movie in offline mode is calculated in days. By default, the storage time is 30 days."
                    source="storageTime"
                    inputType={inputType}
                    resource={resource}
                  />
                </GroupInputsOrigin>
              )}
            </>
          )}
          <RadioButtonGroupInput
            resource={resource}
            source={parentSourceWithIndex ? `${parentSourceWithIndex}.published` : "published"}
            label="Publishing"
            initialValue={false}
            inputType={inputType}
            choices={PUBLISHED_CHOICES_FORM}
          />
          <RadioButtonGroupInput
            resource={resource}
            source={
              parentSourceWithIndex ? `${parentSourceWithIndex}.cmsDistribution` : "cmsDistribution"
            }
            label="Distribution"
            inputType={inputType}
            choices={SELECT_DISTRIBUTION}
          />
        </Collapse>
      </>
    );
  }
);

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const classes = useStyles();

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
