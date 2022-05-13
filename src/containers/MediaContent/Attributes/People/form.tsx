import * as React from "react";

import { FormProps } from "../../../../types";
import {
  formatFromArrayOfString,
  NumberInput,
  parseToArrayOfString,
  requiredValidate,
  TextInput,
} from "../../../../components/Inputs";
import { GroupInputsOrigin } from "../../../../components/GroupInputs";
import { ImageUploaderV2 } from "../../../../components/ImageUploader";

const IMAGE_REQUEST_VARS = { fieldName: "Person" };

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="fullName"
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Additional name"
        parse={parseToArrayOfString}
        format={formatFromArrayOfString}
        source="subNames"
        fullWidth
      />
      <GroupInputsOrigin inputType={type} label="ID in the cinema database">
        <NumberInput
          resource={resource}
          inputType={type}
          helperText="A digital identifier in the Kinopoisk system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
          source="kinopoiskId"
          label="Kinopoisk ID"
        />
        <NumberInput
          resource={resource}
          inputType={type}
          helperText="A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
          source="imdbId"
          label="IMDB ID"
        />
      </GroupInputsOrigin>
      <ImageUploaderV2
        inputType={type}
        requestVariables={IMAGE_REQUEST_VARS}
        resource={resource}
        sourceIds="imageIds"
        source="images"
        offInfo
      />
    </>
  );
};
