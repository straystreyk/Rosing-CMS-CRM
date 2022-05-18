import * as React from "react";
import { SelectInputOrigin } from "../../Inputs/StandatdInputs/SelectInput/select-input";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { AutocompleteArrayInput, ReferenceInput, requiredValidate } from "../../Inputs";
import { ReferenceArrayInput } from "../../Inputs/ReferenceInputs/reference-array-input";
import { AutocompleteInput } from "../../Inputs/AutocompleteInput";

const INPUT_ITEMS_PER_PAGE = 25;

export const ExtraVideos: React.FC<{
  parentSourceWithIndex: string;
  inputType: "create" | "edit" | "show";
  resource: string;
  choices: { id: string; name: string }[];
}> = React.memo(({ parentSourceWithIndex, inputType, resource, choices, ...props }) => {
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
        validate={requiredValidate}
      />
      <ReferenceInput
        label="Video file"
        source={`${parentSourceWithIndex}.streamSourceId`}
        reference="media_content/video/video_files"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
        allowEmpty
      >
        <AutocompleteInput
          optionText="name"
          validate={requiredValidate}
          inputType={inputType}
          helperText="You can select several video files from the list, the first one will be used by default. If the video file is not in the list, make sure that it has been successfully transcoded in the Video files section"
        />
      </ReferenceInput>
    </>
  );
});
