import * as React from "react";
import { useParams } from "react-router-dom";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";

import { ArrayInputStyles as ArrayInputItemStyles } from "../../../../components/Models/CastMembers/styles";
import {
  ArrayInput,
  ArrayInputNoDrag,
  RichTextInput,
  TextInput,
} from "../../../../components/Inputs";
import { alwaysEmptyString, sanitizeId, scrollToErrorInput } from "../../../../helpers/form";
import { RadioButtonGroupInput } from "../../../../components/Inputs/RadioButtonGroupInput";
import { PUBLISHED_CHOICES_FORM } from "../../../../constants/forms-constants";
import { MetaData } from "../../../../components/Models/Metadata";
import { FormProps } from "../../../../types";
import { ScrollTopButton } from "../../../../components/UI/Buttons/scroll-top-button";
import { ModelFormStyles } from "../../../../components/ResourceView/FormWithRedirect/styles";
import { Collapse } from "@material-ui/core";
import { FormSection } from "../../../../components/FormSection";

const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
  ...ModelFormStyles,
});

const REVERSED_EPISODES_ORDER = [
  { name: "Straight", id: false },
  { name: "Reverse", id: true },
];
const FIXED_HEADER_OFFSET = 130;

const INITIAL_PUSH_OBJECT = { metadata: [] };

const Season: React.FC<{
  parentSourceWithIndex?: string;
  parentSource?: string;
  index?: string;
  show?: boolean;
  resource: string;
  type: "show" | "create" | "edit";
}> = ({ parentSourceWithIndex, resource, parentSource, index, show, type, ...props }) => {
  const { seriesId } = useParams<{ seriesId: string }>();
  const [showResource, setShowResource] = React.useState(show);
  const classes = useStyles();

  React.useEffect(() => {
    setShowResource(show);
  }, [show]);

  return (
    <>
      {index && !["edit", "show"].includes(type) && (
        <div onClick={() => setShowResource((p) => !p)} className={classes.ArrayInputItemName}>
          New season number {+index + 1}
        </div>
      )}
      <Collapse in={showResource || ["edit", "show"].includes(type)} timeout="auto">
        <TextInput
          resource={resource}
          inputType={type}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.seriesId` : "seriesId"}
          label="Series id"
          initialValue={sanitizeId(seriesId)}
          style={{ display: "none" }}
          fullWidth
          offFastEdit
        />
        <TextInput
          resource={resource}
          label="Name"
          inputType={type}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.name` : "name"}
          fullWidth
        />
        <TextInput
          resource={resource}
          label="Slug"
          inputType={type}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.slug` : "slug"}
          offFastEdit
          fullWidth
        />
        <RichTextInput
          resource={resource}
          inputType={type}
          label="Description"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.description` : "description"}
        />
        <RadioButtonGroupInput
          resource={resource}
          source={
            parentSourceWithIndex
              ? `${parentSourceWithIndex}.reversedEpisodesOrder`
              : "reversedEpisodesOrder"
          }
          inputType={type}
          label="Reversed episodes order"
          initialValue={false}
          choices={REVERSED_EPISODES_ORDER}
        />
        <ArrayInputNoDrag
          resource={resource}
          inputType={type}
          helperText="A pair of custom fields that can be used for filtering. You can add multiple pairs."
          ChildComponent={MetaData}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.metadata` : "metadata"}
          parentSource={parentSource}
          standardSource="metadata"
          index={index}
          label="Metadata"
          groupInputs
          switchable
          fullWidth
        />
        <RadioButtonGroupInput
          resource={resource}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.published` : "published"}
          label="Publishing"
          initialValue={false}
          inputType={type}
          choices={PUBLISHED_CHOICES_FORM}
        />
      </Collapse>
    </>
  );
};

export const Form: React.FC<FormProps> = ({ resource, type }) => {
  const classes = useStyles();
  const formState = useFormState();

  React.useEffect(() => {
    if (formState.submitFailed) {
      scrollToErrorInput(FIXED_HEADER_OFFSET);
    }
  }, [formState.submitFailed]);

  return (
    <>
      {type === "create" ? (
        <ArrayInput
          source="seasons"
          getItemLabel={alwaysEmptyString}
          ChildComponent={Season}
          resource={resource}
          initialPushObject={INITIAL_PUSH_OBJECT}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          inputType={type}
        />
      ) : (
        <FormSection formType={type}>
          <Season resource={resource} type={type} />
        </FormSection>
      )}
      <ScrollTopButton />
    </>
  );
};
