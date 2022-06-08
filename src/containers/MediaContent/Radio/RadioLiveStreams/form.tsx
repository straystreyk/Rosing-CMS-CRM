import * as React from "react";
import { FormProps } from "../../../../types";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteArrayInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { ReferenceCustomInput } from "../../../../components/Inputs/ReferenceInputs/reference-custom-input";
import { ALL_ALLOWED_DRMS, ALL_COUNTRIES } from "../../../../components/Providers/custom-requests";
import { CheckBoxGroup } from "../../../../components/UI/MaterialUI/check-box-group";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        placeholder="Enter a value"
        fullWidth
        helperText="The name of the video file that users will see in any sections of the application"
      />
      <TextInput
        resource={resource}
        inputType={type}
        placeholder="Enter a value"
        label="Streaming UID"
        source="streamingUid"
        fullWidth
        helperText="Unique identifier of the transcoded stream"
      />
      <TextInput
        resource={resource}
        inputType={type}
        placeholder="https://"
        label="Stream URL template"
        source="streamUrlTemplate"
        helperText="The default template https://{host}{/encoded_session}{/signature}{/bucket*}{/streaming_uid}{+protocol_suffix}{?params*}"
        fullWidth
      />
      <CheckBoxGroup initialSourceState="allowedCountries">
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          inputType={type}
          query={ALL_COUNTRIES}
          resource={resource}
          source="allowedCountries"
          checkBoxLabel="Allowed Countries"
          helperText="The list of countries in which the film is available, access is prohibited for other countries. Leave the field empty if access is allowed for all countries."
          label=""
          idName="alpha2"
        />
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          inputType={type}
          query={ALL_COUNTRIES}
          resource={resource}
          checkBoxLabel="Disallowed countries"
          helperText="List of countries where the film is not available"
          label=""
          source="disallowedCountries"
          idName="alpha2"
        />
      </CheckBoxGroup>
      <ReferenceCustomInput
        component={AutocompleteArrayInput}
        query={ALL_ALLOWED_DRMS}
        inputType={type}
        resource={resource}
        label="Allowed drms"
        source="allowedDrms"
        idName="id"
        helperText="Access control and management system, copyright protection. You can select several DRM systems from the list."
      />
      <ScrollTopButton />
    </>
  );
};
