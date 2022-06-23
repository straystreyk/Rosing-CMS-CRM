import * as React from "react";
import { ScrollTopButton } from "../../../components/UI/Buttons/scroll-top-button";
import { FormProps } from "../../../types";
import { requiredValidate, TextInput } from "../../../components/Inputs";
import { GroupInputsOrigin } from "../../../components/GroupInputs";
import { FormSection } from "../../../components/FormSection";
import { ReferenceCustomInputV2 } from "../../../components/Inputs/ReferenceInputs/reference-custom-input-v2";
import { ALL_SCREEN_CARD_CONFIG_PARAMS } from "./requests";
import { AutocompleteInput } from "../../../components/Inputs/AutocompleteInput";
import { Checkbox } from "../../../components/Inputs/Checkbox";

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  return (
    <FormSection id="" text="" title="" formType={type}>
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
        label="Name of the screen"
        source="screen"
        fullWidth
        helperText="Hint text or error message"
      />
      <GroupInputsOrigin label="Configurations for cards" inputType={type}>
        <ReferenceCustomInputV2
          inputType={type}
          query={ALL_SCREEN_CARD_CONFIG_PARAMS}
          resource={resource}
          source="cardConfig.layoutSettings"
          currentField="layouts"
          component={AutocompleteInput}
          label="Layout"
          helperText="hint"
          optionText="name"
          optionValue="value"
        />
        <ReferenceCustomInputV2
          inputType={type}
          query={ALL_SCREEN_CARD_CONFIG_PARAMS}
          resource={resource}
          source="cardConfig.additionalNameAttribute"
          currentField="additionalNames"
          component={AutocompleteInput}
          label="Additional name"
          helperText="hint"
          optionText="name"
          optionValue="name"
        />
        <Checkbox
          source="cardConfig.disableLivePreview"
          label="Live preview"
          checkboxLabel="Show live previews for TV channel cards"
          initialValue={false}
          resource={resource}
          inputType={type}
          helperText="On the series page, users will see a menu with the numbering of seasons, the season number in the episode preview card and in the title on the player. If the series has only one season or it is a multi-part movie, you can deactivate the checkbox so that the application does not display information about the seasons."
        />
      </GroupInputsOrigin>
      <ScrollTopButton />
    </FormSection>
  );
};
