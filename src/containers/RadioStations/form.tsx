import * as React from "react";
import { FormProps } from "../../types";
import { FormSection } from "../../components/FormSection";
import { FormTabs } from "../../components/Tabs/form-tabs";
import {
  ArrayInputNoDrag,
  AutocompleteArrayInput,
  NumberInput,
  requiredValidate,
  TextInput,
} from "../../components/Inputs";
import { ReferenceCustomInput } from "../../components/Inputs/ReferenceInputs/reference-custom-input";
import { ALL_GENRES } from "../../components/Providers/custom-requests";
import { MetaData } from "../../components/Models/Metadata";
import { ImageUploaderV2 } from "../../components/ImageUploader";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <>
      <FormTabs labels={["Attributes", "Images"]} />
      <FormSection
        text="Used for the visual content of the application"
        title="Attributes"
        id="Attributes"
        formType={type}
      >
        <TextInput
          resource={resource}
          validate={requiredValidate}
          inputType={type}
          label="Name"
          source="name"
          fullWidth
          helperText={
            "The name of the radio station that users will see in any sections of the application"
          }
        />
        <TextInput
          resource={resource}
          inputType={type}
          label="Slug"
          source="slug"
          helperText={
            "It is used as a human-readable identifier in the address bar and deep link. Available for modification is not saved yet, it can contain only numbers, Latin letters, a hyphen (-) and an underscore (_). If you leave the field empty, the slug will be filled in automatically."
          }
          fullWidth
        />
        <TextInput
          resource={resource}
          inputType={type}
          label="Description"
          source="description"
          resettable={false}
          fullWidth
          multiline
          rows={4}
        />
        <ReferenceCustomInput
          component={AutocompleteArrayInput}
          inputType={type}
          resource={resource}
          query={ALL_GENRES}
          helperText="You can select several genres from the list"
          source="genreIds"
          label="Genres"
          idName="id"
        />
        <NumberInput
          source="position"
          label="Position"
          resource={resource}
          inputType={type}
          helperText="The serial number in the general list of radio stations. Can be entered manually when creating or editing, the positions of the remaining films will be updated accordingly. If the field is left empty, the last sequential number will be assigned to the movie."
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          getItemLabel={() => ""}
          fullWidth
          helperText={
            "A pair of custom fields that can be used for filtering. You can add multiple pairs."
          }
          source="metadata"
          label="Metadata"
          childcomponent={MetaData}
          groupInputs
          switchable
        />
      </FormSection>
      <FormSection
        text="Used for background, cover, or logo. To make the image look attractive, upload it in accordance with the recommendations for the selected type, otherwise, after processing by the receiver, loss of visual attractiveness is permissible."
        title="Images"
        id="Images"
        formType={type}
      >
        <ImageUploaderV2
          inputType={type}
          resource={resource}
          sourceIds="imageIds"
          source="images"
        />
      </FormSection>
    </>
  );
};
