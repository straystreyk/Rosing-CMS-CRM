import * as React from "react";
import { SelectInputOrigin } from "../../Inputs/StandatdInputs/SelectInput/select-input";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { ReferenceInput } from "../../Inputs";
import { AutocompleteInputWithOpts } from "../../Inputs/AutocompleteInput";
import { makeStyles } from "@material-ui/core";
import { TextInputStyles } from "../../Inputs/StandatdInputs/TextInput/styles";

const useStyles = makeStyles({ TextInputStyles });

const INPUT_ITEMS_PER_PAGE = 25;

export const ExtraVideos: React.FC<{
  parentSourceWithIndex: string;
  inputType: "create" | "edit" | "show";
  resource: string;
  choices: { id: string; name: string }[];
}> = React.memo(({ parentSourceWithIndex, inputType, resource, choices, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <SelectInputOrigin
        resource={resource}
        choices={choices}
        label="Kind"
        inputType={inputType}
        source={`${parentSourceWithIndex}.kind`}
      />
      <TextInputOrigin
        label="Name"
        source={`${parentSourceWithIndex}.name`}
        fullWidth
        inputType={inputType}
        // validate={requiredValidate}
      />
      <ReferenceInput
        label="Video file"
        source={`${parentSourceWithIndex}.streamSourceId`}
        reference="media_content/video/video_files"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
        // validate={requiredValidate}
        allowEmpty
      >
        <AutocompleteInputWithOpts
          optionText="name"
          inputType={inputType}
          fullWidth
          options={{ className: classes.TextInputStyles }}
          helperText="You can select several video files from the list, the first one will be used by default. If the video file is not in the list, make sure that it has been successfully transcoded in the Video files section"
        />
      </ReferenceInput>
    </>
  );
});
