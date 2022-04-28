import * as React from "react";

import { FormProps } from "../../../../types";
import { NumberInput, requiredValidate, TextInput } from "../../../../components/Inputs";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <TextInput
        resource={resource}
        validate={requiredValidate}
        inputType={type}
        label="Name"
        source="name"
        fullWidth
        helperText={"The name of the genre that users will see in any sections of the application"}
      />
      <TextInput
        resource={resource}
        inputType={type}
        label="Slug"
        source="slug"
        helperText="It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
        fullWidth
      />
      <NumberInput
        source="position"
        label="Position"
        resource={resource}
        inputType={type}
        helperText="The serial number in the general list of genres. Can be entered manually when creating or editing, the positions of the remaining films will be updated accordingly. If the field is left empty, the last sequential number will be assigned to the genre."
      />
    </>
  );
};
