import * as React from "react";
import { TextInput, requiredValidate, NumberInput } from "../../../../../components/Inputs";
import { FormProps } from "../../../../../types";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";

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
        helperText="The name of the TV channel version to which the broadcast restriction should be set"
      />
      <NumberInput
        resource={resource}
        inputType={type}
        label="Number of the part"
        helperText="The storage time of the downloaded movie in offline mode is calculated in days. By default, the storage time is 30 days. The storage time of the content takes priority."
        source="storageTime"
        fullWidth
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Advertisement"
        source="adVodPlacement"
        fullWidth
        helperText="The name of the TV channel version to which the broadcast restriction should be set"
      />
      <ScrollTopButton />
    </>
  );
};

export default Form;
