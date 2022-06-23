import * as React from "react";
import { FormProps } from "../../../../types";
import { AutocompleteArrayInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import {
  ALL_ALLOWED_DRMS,
  ALL_COUNTRIES,
  ALL_DATACENTERS,
} from "../../../../components/Providers/custom-requests";
import { SPBTVPlayer } from "../../../../components/SPBTVPlayer";
import { scrollToErrorInput } from "../../../../helpers/form";
import { useFormState } from "react-final-form";
import { CheckBoxGroup } from "../../../../components/UI/MaterialUI/check-box-group";
import { FormSection } from "../../../../components/FormSection";
import { ReferenceCustomInputV2 } from "../../../../components/Inputs/ReferenceInputs/reference-custom-input-v2";

const FIXED_HEADER_OFFSET = 80;

export const Form: React.FC<FormProps> = ({ resource, type, ...props }) => {
  const formState = useFormState();

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
      <FormSection text="" title="" formType={type} id="">
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
        <ReferenceCustomInputV2
          inputType={type}
          query={ALL_DATACENTERS}
          resource={resource}
          source="datacenterId"
          component={AutocompleteArrayInput}
          label="Datacenter UID"
          helperText="The company - the copyright holder of the film"
          optionText="name"
          optionValue="id"
        />
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
        <TextInput
          resource={resource}
          inputType={type}
          label="Stream url template"
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
        {type === "show" && <SPBTVPlayer streamSourceId={props.id ? props.id : ""} />}
      </FormSection>
    </>
  );
};

export default Form;
