import * as React from "react";

import { FormProps } from "../../../../types";
import { NumberInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { GroupInputsOrigin } from "../../../../components/GroupInputs";
import { ImageUploaderV2 } from "../../../../components/ImageUploader";
import { AutocompleteArrayFreeSolo } from "../../../../components/Inputs/ArrayInputs/AutocompleteFreeSolo";

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
      <AutocompleteArrayFreeSolo
        label="Additional names"
        resource={resource}
        inputType={type}
        source="subNames"
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
