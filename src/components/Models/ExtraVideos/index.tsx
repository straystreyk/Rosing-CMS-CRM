import * as React from "react";
import { SelectInputOrigin } from "../../Inputs/StandatdInputs/SelectInput/select-input";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { requiredValidate } from "../../Inputs";
import { ReferenceCustomInput } from "../../Inputs/ReferenceInputs/reference-custom-input";
import { ALL_VIDEO_FILES } from "../../Providers/custom-requests";

export const ExtraVideos: React.FC<{
  parentSourceWithIndex: string;
  inputType: string;
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
      <ReferenceCustomInput
        component={SelectInputOrigin}
        inputType={inputType}
        query={ALL_VIDEO_FILES}
        label="Video files"
        helperText="You can select only one video file from the list"
        source={`${parentSourceWithIndex}.streamSourceId`}
        resource={resource}
        idName="id"
      />
    </>
  );
});
