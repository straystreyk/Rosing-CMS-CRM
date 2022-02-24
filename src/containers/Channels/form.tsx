import { FC } from "react";

import {
  requiredValidate,
  TextInput,
  NumberInput,
  AutocompleteArrayInput,
  BooleanInput,
} from "../../components/Inputs";

import { INPUT_LABEL_PROPS, SELECT_MARKERS } from "../../constants/forms-constants";
import { FormProps } from "../../types";

export const Form: FC<FormProps> = () => {
  return (
    <>
      <TextInput fullWidth source="name" validate={requiredValidate} />
      <TextInput fullWidth multiline source="description" rows={4} />
      <TextInput
        fullWidth
        source="slug"
        validate={requiredValidate}
        helperText={
          "Available for modification until saved, it can contain only numbers, Latin letters, hyphen (-) and underscore (_)"
        }
      />
      <AutocompleteArrayInput
        source="markers"
        validate={requiredValidate}
        choices={SELECT_MARKERS}
      />
      <NumberInput source="position" fullWidth />
      <NumberInput source="preRollCount" fullWidth />
      <NumberInput source="catchupAvailabilityValue" fullWidth />
      <NumberInput source="compiledDistribution" fullWidth />
      <NumberInput source="iptvPosition" fullWidth />
      <NumberInput source="timeshiftAvailabilityValue" fullWidth />
      <TextInput source="synopsis" fullWidth />
      <TextInput source="timezone" fullWidth />
      <TextInput source="timeshiftAvailabilityUnit" fullWidth />
      <TextInput source="externalDeeplink" fullWidth />
      <TextInput source="catchupAvailabilityUnit" fullWidth />
      <TextInput
        source="seoDescription"
        label="Seo Description"
        helperText={"Example: bread, milk, orange"}
        InputLabelProps={INPUT_LABEL_PROPS}
        fullWidth
        multiline
        rows={5}
      />
      <TextInput
        source="allowedCountries"
        label="Allowed countries"
        helperText={"Example: bread, milk, orange"}
        InputLabelProps={INPUT_LABEL_PROPS}
        fullWidth
        multiline
        rows={5}
      />
      <TextInput
        source="searchKeywords"
        label="Search keywords"
        helperText={"Example: bread, milk, orange"}
        InputLabelProps={INPUT_LABEL_PROPS}
        fullWidth
        multiline
        rows={5}
      />
      <TextInput
        source="seoKeywords"
        label="Seo keywords"
        helperText={"Example: bread, milk, orange"}
        InputLabelProps={INPUT_LABEL_PROPS}
        multiline
        rows={5}
        fullWidth
      />
      <BooleanInput source="published" />
    </>
  );
};
