import * as React from "react";
import { TextInput, requiredValidate } from "../../../../../components/Inputs";
import { FormProps } from "../../../../../types";
import { ImageUploaderV2 } from "../../../../../components/ImageUploader";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";

const IMAGE_REQUEST_VARS = { fieldName: "Studio" };

export const Form: React.FC<FormProps> = ({ type, resource, ...props }) => {
  return (
    <>
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
      <ImageUploaderV2
        inputType={type}
        requestVariables={IMAGE_REQUEST_VARS}
        resource={resource}
        sourceIds="imageIds"
        source="images"
        offInfo
      />
      <ScrollTopButton />
    </>
  );
};

export default Form;
