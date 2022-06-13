import * as React from "react";
import { FormProps } from "../../../../../types";
import { requiredValidate, TextInput } from "../../../../../components/Inputs";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { ImageUploaderV2 } from "../../../../../components/ImageUploader";
import { JsonInput } from "../../../../../components/Inputs/JsonInput";
import { FormSection } from "../../../../../components/FormSection";

const IMAGE_REQUEST_VARS = { fieldName: "ExternalCatalog" };

export const Form: React.FC<FormProps> = ({ type, resource, ...props }) => {
  return (
    <FormSection text="" title="" formType={type} id="">
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        placeholder="name"
        fullWidth
        helperText="The name of the content_provider that users will see in any sections of the application"
      />
      <TextInput resource={resource} inputType={type} label="UID" source="uid" fullWidth />
      <JsonInput
        inputType={type}
        resource={resource}
        label="Platforms package id"
        source="platformsPackageId"
        helperText=""
        reactJsonOptions={{
          name: null,
          collapsed: true,
          iconStyle: "circle",
          enableClipboard: false,
          displayDataTypes: false,
          displayObjectSize: true,
        }}
      />
      <ImageUploaderV2
        inputType={type}
        requestVariables={IMAGE_REQUEST_VARS}
        resource={resource}
        sourceIds="imageIds"
        source="images"
        offInfo
      />
      <ScrollTopButton />
    </FormSection>
  );
};
