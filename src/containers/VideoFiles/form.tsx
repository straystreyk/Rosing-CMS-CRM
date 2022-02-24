import { FC } from "react";
import { ReferenceInput } from "react-admin";

import {
  TextInput,
  requiredValidate,
  SelectInput,
  AutocompleteArrayInput,
} from "../../components/Inputs";
import { FormProps } from "../../types";

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <TextInput source="name" resource={props.resource} validate={requiredValidate} fullWidth />
      <TextInput
        label="Streaming UID"
        source="streamingUid"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        label="Preview Bucket"
        source="previewBucket"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        label="Title"
        source="title"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        label="Video bucket"
        source="videoBucket"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        label="Stream url template"
        source="streamUrlTemplate"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <ReferenceInput
        label="Datacenter"
        source="datacenterId"
        reference="datacenters"
        validate={requiredValidate}
      >
        <SelectInput fullWidth optionText="name" />
      </ReferenceInput>
      <AutocompleteArrayInput
        source="allowedDrms"
        choices={[{ id: "spbtvcas", name: "spbtvcas" }]}
      />
    </>
  );
};

export default Form;
