import * as React from "react";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import {
  AutocompleteArrayInput,
  ReferenceInput,
  requiredValidate,
  TextInput,
} from "../../../../../components/Inputs";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import {
  ALL_ALLOWED_DRMS,
  ALL_COUNTRIES,
} from "../../../../../components/Providers/custom-requests";
import { ReferenceCustomInput } from "../../../../../components/Inputs/ReferenceInputs/reference-custom-input";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { PlusIcon } from "../../../../../constants/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useFormState } from "react-final-form";
import { CheckBoxGroup } from "../../../../../components/UI/MaterialUI/check-box-group";
import { SPBTVPlayer } from "../../../../../components/SPBTVPlayer";

const INPUT_ITEMS_PER_PAGE = 25;

const useStyles = makeStyles({
  AddResourceButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export const Form: React.FC<FormProps> = ({ resource, type, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
      />
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Streaming UID"
        source="streamingUid"
        fullWidth
        helperText="Unique identifier of the transcoded stream"
      />
      <ReferenceInput
        label="Datacenter"
        source="datacenterId"
        reference="datacenters"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
      >
        <AutocompleteInput
          optionText="name"
          optionValue="id"
          resource={resource}
          inputType={type}
          fullWidth
          helperText="The data center where the stream is located. If the data center is not in the list, you can add it manually in the Data Centers section or by clicking the button below."
        />
      </ReferenceInput>
      <div className={classes.AddResourceButtonWrapper}>
        <StandardButton
          startIcon={<PlusIcon color="var(--accent-color)" />}
          variant="text"
          customColor="var(--accent-color)"
        >
          Add new Datacenter
        </StandardButton>
      </div>
      <TextInput
        resource={resource}
        inputType={type}
        label="Additional name"
        helperText="An additional name for a telepath to distinguish between telepaths with the same name"
        source="title"
        fullWidth
      />
      <ReferenceCustomInput
        component={AutocompleteArrayInput}
        query={ALL_ALLOWED_DRMS}
        inputType={type}
        validate={requiredValidate}
        resource={resource}
        label="Allowed drms"
        source="allowedDrms"
        idName="id"
        helperText="Access control and management system, copyright protection. You can select several DRM systems from the list."
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Player provider"
        helperText="Link to the provider's player that will be used in the broadcast application instead of the native player."
        source="externalPlayerUrl"
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="UID of the IPTV stream"
        helperText="Unique identifier of the transcoded stream. The UID of the IPTV stream takes precedence over the UID of the standard stream. If UIDS are specified for both stream types, the UID of the IPTV stream will be used by default."
        source="iptvStreamingUid"
        fullWidth
      />
      <ReferenceInput
        label="UID of the IPTV stream"
        source="iptvDatacenterId"
        reference="datacenters"
        resource={resource}
        perPage={INPUT_ITEMS_PER_PAGE}
      >
        <AutocompleteInput
          optionText="name"
          optionValue="id"
          resource={resource}
          inputType={type}
          fullWidth
          helperText="The data center where the stream is located. If the data center is not in the list, you can add it manually in the Data Centers section or by clicking the button below."
        />
      </ReferenceInput>
      <div className={classes.AddResourceButtonWrapper}>
        <StandardButton
          startIcon={<PlusIcon color="var(--accent-color)" />}
          variant="text"
          customColor="var(--accent-color)"
        >
          Add new Datacenter
        </StandardButton>
      </div>
      <TextInput
        resource={resource}
        inputType={type}
        label="Flow Request Template"
        helperText="The default template https://{host}{/encoded_session}{/signature}{/bucket*}{/streaming_uid}{+protocol_suffix}{?params*}"
        source="streamUrlTemplate"
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Provider Images"
        helperText="Link to the image storage for preview of the TV stream, which is processed in the provider's datacenter"
        source="previewBucket"
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
      {type === "show" && <SPBTVPlayer streamSourceId={rest.id ? rest.id : ""} />}
      <ScrollTopButton />
    </>
  );
};
