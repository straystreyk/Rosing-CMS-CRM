import { FC } from "react";

import {
  requiredValidate,
  AutocompleteArrayInput,
  SelectInput,
  TextInput,
  getYearsChoices,
} from "../../components/Inputs";
import { SELECT_MARKERS } from "../../constants/forms-constants";
import { DateInput } from "react-admin";
import { FormProps } from "../../types";

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <TextInput
        source="name"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        source="originalName"
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        source="certificationRatingSystem"
        resource={props.resource}
        fullWidth
      />
      <TextInput
        source="certificationRatingTag"
        resource={props.resource}
        fullWidth
      />
      <AutocompleteArrayInput source="markers" choices={SELECT_MARKERS} />
      <TextInput
        multiline
        source="description"
        rows={4}
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
      <SelectInput
        source="productionYear"
        resource={props.resource}
        choices={getYearsChoices()}
      />
      <DateInput source="releaseDate" resouce={props.resource} fullWidth />
      <TextInput
        multiline
        source="slogan"
        resource={props.resource}
        rows={2}
        validate={requiredValidate}
        fullWidth
      />
      <TextInput
        multiline
        source="slug"
        rows={2}
        resource={props.resource}
        validate={requiredValidate}
        fullWidth
      />
    </>
  );
};
