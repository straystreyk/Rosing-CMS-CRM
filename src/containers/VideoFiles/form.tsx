import * as React from "react";
import { FormProps } from "../../types";
import { ReferenceCustomInput } from "../../components/Inputs/ReferenceInputs/reference-custom-input";
import {
  AutocompleteArrayInput,
  requiredValidate,
  SelectInput,
  TextInput,
} from "../../components/Inputs";
import {
  ALL_ALLOWED_DRMS,
  ALL_COUNTRIES,
  ALL_DATACENTERS,
} from "../../components/Providers/custom-requests";
import { SPBTVPlayer } from "../../components/SPBTVPlayer";
import { RadiButtonsGroup } from "../../components/RadioButtonsGroup";

export const Form: React.FC<FormProps> = ({ resource, type, ...props }) => {
  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
        helperText="The name of the series that users will see in any sections of the application"
      />
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Streaming UID"
        source="streamingUid"
        fullWidth
        helperText="The name of the series that users will see in any sections of the application"
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Title"
        source="title"
        fullWidth
        helperText="Title for a video file to distinguish between video files with a common theme"
      />
      <ReferenceCustomInput
        component={SelectInput}
        query={ALL_DATACENTERS}
        inputType={type}
        resource={resource}
        label="Datacenter UID"
        source="datacenterId"
        idName="id"
        helperText="The company - the copyright holder of the film"
      />
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
      <TextInput
        resource={resource}
        inputType={type}
        label="Stream url template"
        source="streamUrlTemplate"
        helperText="The default template https://{host}{/encoded_session}{/signature}{/bucket*}{/streaming_uid}{+protocol_suffix}{?params*}"
        fullWidth
      />
      <ReferenceCustomInput
        component={AutocompleteArrayInput}
        inputType={type}
        query={ALL_COUNTRIES}
        resource={resource}
        fullWidth
        source="allowedCountries"
        label="Allowed Countries"
        idName="alpha2"
      />
      <ReferenceCustomInput
        component={AutocompleteArrayInput}
        inputType={type}
        query={ALL_COUNTRIES}
        resource={resource}
        fullWidth
        label="Disallowed countries"
        source="disallowedCountries"
        idName="alpha2"
      />
      {type === "show" && <SPBTVPlayer streamSourceId={props.id ? props.id : ""} />}
    </>
  );
};

export default Form;
