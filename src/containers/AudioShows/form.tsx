import * as React from "react";

import { FormProps } from "../../types";
import {
  BooleanInput,
  NumberInput,
  requiredValidate,
  TextInput,
  SelectInput,
  AutocompleteArrayInput,
  getYearsChoices,
  RichTextInput,
} from "../../components/Inputs";
import { INPUT_LABEL_PROPS, SELECT_MARKERS } from "../../constants/forms-constants";

export const Form: React.FC<FormProps> = (props) => {
  return (
    <>
      {/*need allowed countries*/}
      {/*need disallowed countries*/}
      {/*need external catalog*/}
      {/*need metadata*/}
      {/*need rightHolder id*/}
      <TextInput source="name" resource={props.resource} validate={requiredValidate} fullWidth />
      <TextInput source="originalName" resource={props.resource} fullWidth />
      <TextInput source="slug" resource={props.resource} fullWidth />
      <TextInput source="slogan" resource={props.resource} validate={requiredValidate} fullWidth />
      <RichTextInput
        resource={props.resource}
        inputType={props.type}
        label="Description"
        source="description"
      />
      <TextInput source="altDescription" rows={4} resource={props.resource} fullWidth multiline />
      <TextInput
        source="releaseDate"
        type="date"
        resource={props.resource}
        InputLabelProps={INPUT_LABEL_PROPS}
        fullWidth
      />
      <TextInput source="certificationRatingSystem" resource={props.resource} fullWidth multiline />
      <TextInput source="certificationRatingTag" resource={props.resource} fullWidth multiline />
      <NumberInput source="position" />
      <NumberInput source="cmsDistribution" />
      <NumberInput source="compiledDistribution" />
      <NumberInput source="position" />
      <NumberInput source="duration" />
      <AutocompleteArrayInput source="markers" choices={SELECT_MARKERS} />
      <BooleanInput source="published" />
    </>
  );
};
