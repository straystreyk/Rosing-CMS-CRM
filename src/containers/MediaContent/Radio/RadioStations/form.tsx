import * as React from "react";
import { FormProps } from "../../../../types";
import { FormSection } from "../../../../components/FormSection";
import { FormTabs } from "../../../../components/Tabs/form-tabs";
import {
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  NumberInput,
  ReferenceInput,
  requiredValidate,
  RichTextInput,
  TextInput,
} from "../../../../components/Inputs";
import { MetaData } from "../../../../components/Models/Metadata";
import { PUBLISHED_CHOICES_FORM, SELECT_MARKERS } from "../../../../constants/forms-constants";
import { ReferenceArrayInput } from "../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { RadioButtonGroupInput } from "../../../../components/Inputs/RadioButtonGroupInput";
import { AutocompleteInput } from "../../../../components/Inputs/AutocompleteInput";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import { PlusIcon } from "../../../../constants/icons";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { ImageUploaderV2 } from "../../../../components/ImageUploader";

const INPUT_ITEMS_PER_PAGE = 25;
const FIXED_TAB_LABELS = ["Attributes", "Images", "Source", "Terms of publication"];

const useStyles = makeStyles({
  AddResourceButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const IMAGE_REQUEST_VARS = { fieldName: "RadioStation" };

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  const history = useHistory();
  const classes = useStyles();

  const goToLiveStreams = React.useCallback(() => {
    history.push("/media_content/radio/radio_live_streams/create");
  }, [history]);

  return (
    <>
      <FormTabs labels={FIXED_TAB_LABELS} />
      <FormSection
        text="Attributes are used to visually represent the movie in the app and help the user make a choice.
          The more detailed the section is, the higher the probability of the movie getting into the search results and filtering in the application."
        title="Attributes"
        id="Attributes"
        formType={type}
      >
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          placeholder="name"
          fullWidth
          helperText={
            "The name of the radio station that users will see in any sections of the application"
          }
        />
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
        />
        <ReferenceArrayInput
          label="Genres"
          source="genreIds"
          reference="media_content/attributes/genres"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="You can select several genres from the list"
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          label="Label"
          source="labelIds"
          reference="media_content/attributes/labels"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="You can select several labels from the list"
          />
        </ReferenceArrayInput>
        <NumberInput
          source="position"
          label="Position"
          resource={resource}
          inputType={type}
          helperText="The serial number in the general list of films. Can be entered manually when creating or editing, the positions of the remaining films will be updated accordingly. If the field is left empty, the last sequential number will be assigned to the movie."
        />
        <NumberInput source="number" label="Number" resource={resource} inputType={type} />
      </FormSection>
      <FormSection
        text="The images are used as a background or cover for the visual representation of the movie in the application and help the user make a choice. To make the background or cover look attractive, upload an image with an aspect ratio and a minimum resolution according to the selected type. If the image does not match the selected type, the receiver will process the image itself, which may cause visual appeal to be lost."
        title="Images"
        formType={type}
        id="Images"
      >
        <ImageUploaderV2
          inputType={type}
          requestVariables={IMAGE_REQUEST_VARS}
          resource={resource}
          sourceIds="imageIds"
          source="images"
        />
      </FormSection>
      <FormSection
        text="A video file, audio file, radio stream or TV stream available for broadcast to the user in the application on the media content page. To add a source to the media content, it must be successfully transcoded."
        title="Source"
        formType={type}
        id="Source"
      >
        <ReferenceInput
          label="Radio stream's"
          source="radioLiveStreamId"
          reference="media_content/radio/radio_live_streams"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          fullWidth
        >
          <AutocompleteInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            helperText="If the radio stream is not in the list, you can add it manually in the Radio Streams section or by clicking the button below. It is necessary to know the UID of the stream in advance."
          />
        </ReferenceInput>
        <div className={classes.AddResourceButton}>
          <StandardButton
            startIcon={<PlusIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
            onClick={goToLiveStreams}
          >
            Add radio live stream
          </StandardButton>
        </div>
        <NumberInput
          inputType={type}
          resource={resource}
          source="bitrate"
          label="Bitrate"
          helperText="The sound quality determined by the data transfer rate over a certain time (Kbit/s). The higher the speed, the better the quality."
        />
      </FormSection>
      <FormSection
        id="Terms of publication"
        text="Configuration of the rule for publishing a movie. The rule will be automatically generated by the publishing system within one hour after saving. The generated rule will appear on the movie page in the current section."
        title="Terms of publication"
        formType={type}
      >
        <RadioButtonGroupInput
          source="published"
          label="Publishing"
          initialValue={false}
          inputType={type}
          choices={PUBLISHED_CHOICES_FORM}
        />
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
