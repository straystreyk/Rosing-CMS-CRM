import * as React from "react";
import { FormProps } from "../../../../types";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { AutocompleteArrayInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { ALL_ALLOWED_DRMS, ALL_COUNTRIES } from "../../../../components/Providers/custom-requests";
import { CheckBoxGroup } from "../../../../components/UI/MaterialUI/check-box-group";
import { ReferenceCustomInputV2 } from "../../../../components/Inputs/ReferenceInputs/reference-custom-input-v2";

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
      <CheckBoxGroup
        initialSourceState="allowedCountries"
        inputType={type}
        label="Access for countries"
      >
        <ReferenceCustomInputV2
          inputType={type}
          query={ALL_COUNTRIES}
          resource={resource}
          source="allowedCountries"
          component={AutocompleteArrayInput}
          label=""
          checkBoxLabel="Allowed Countries"
          helperText="The list of countries in which the film is available, access is prohibited for other countries. Leave the field empty if access is allowed for all countries."
          optionText="name"
          optionValue="alpha2"
        />
        <ReferenceCustomInputV2
          inputType={type}
          query={ALL_COUNTRIES}
          resource={resource}
          source="disallowedCountries"
          component={AutocompleteArrayInput}
          label=""
          checkBoxLabel="Disallowed countries"
          helperText="List of countries where the film is not available"
          optionText="name"
          optionValue="alpha2"
        />
      </CheckBoxGroup>
      <ReferenceCustomInputV2
        inputType={type}
        query={ALL_ALLOWED_DRMS}
        resource={resource}
        source="allowedDrms"
        component={AutocompleteArrayInput}
        label="Allowed drms"
        helperText="Access control and management system, copyright protection. You can select several DRM systems from the list."
        optionText="name"
        optionValue="id"
      />
      <ScrollTopButton />
    </>
  );
};
