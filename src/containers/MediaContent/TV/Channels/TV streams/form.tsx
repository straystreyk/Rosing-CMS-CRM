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
import { StandardButton } from "../../../../../components/UI/Buttons/StandardButton/standard-button";
import { PlusIcon } from "../../../../../constants/icons";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBoxGroup } from "../../../../../components/UI/MaterialUI/check-box-group";
import { SPBTVPlayer } from "../../../../../components/SPBTVPlayer";
import { ReferenceCustomInputV2 } from "../../../../../components/Inputs/ReferenceInputs/reference-custom-input-v2";

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
          source="datacenterId"
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
          startIcon={<PlusIcon />}
          variant="text"
          buttonType="primary"
          text="Add new Datacenter"
        />
      </div>
      <TextInput
        resource={resource}
        inputType={type}
        label="Additional name"
        helperText="An additional name for a telepath to distinguish between telepaths with the same name"
        source="title"
        fullWidth
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
          source="iptvDatacenterId"
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
          startIcon={<PlusIcon />}
          variant="text"
          buttonType="primary"
          text="Add new Datacenter"
        />
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
        label="Images provider"
        helperText="Link to the image storage for preview of the TV stream, which is processed in the provider's datacenter"
        source="previewBucket"
        fullWidth
      />
      <CheckBoxGroup inputType={type} initialSourceState="allowedCountries">
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
      {type === "show" && <SPBTVPlayer streamSourceId={rest.id ? rest.id : ""} />}
      <ScrollTopButton />
    </>
  );
};
