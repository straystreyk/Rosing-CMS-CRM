import * as React from "react";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../../types";
import { FormSection } from "../../../../components/FormSection";
import { AutocompleteArrayInput, requiredValidate, TextInput } from "../../../../components/Inputs";
import { ReferenceArrayInput } from "../../../../components/Inputs/ReferenceInputs/reference-array-input";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <FormSection text="" title="" formType={type} id="">
        {type !== "create" && (
          <TextInput
            resource={resource}
            offFastEdit
            label="ID"
            source="id"
            inputType={type}
            fullWidth
          />
        )}
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          placeholder="name"
          fullWidth
          helperText="The name of the movie that users will see in any sections of the application"
        />
        <ReferenceArrayInput
          label="Filters"
          source="searchFilterIds"
          reference="search_filters"
          resource={resource}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            source="searchFilterIds"
            resource={resource}
            inputType={type}
            helperText="You can select several filters from the list"
          />
        </ReferenceArrayInput>
      </FormSection>
      <ScrollTopButton />
    </>
  );
};
