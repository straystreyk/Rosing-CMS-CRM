import * as React from "react";
import { FormProps } from "../../../../../types";
import {
  ArrayInput,
  AutocompleteArrayInput,
  ReferenceInput,
  requiredValidate,
  TextInput,
} from "../../../../../components/Inputs";
import { alwaysEmptyString, sanitizeId } from "../../../../../helpers/form";
import { ScrollTopButton } from "../../../../../components/UI/Buttons/scroll-top-button";
import { makeStyles } from "@material-ui/core/styles";
import { ArrayInputStyles as ArrayInputItemStyles } from "../../../../../components/Models/CastMembers/styles";
import { useHistory, useParams } from "react-router-dom";
import { PUBLISHED_CHOICES_FORM } from "../../../../../constants/forms-constants";
import { RadioButtonGroupInput } from "../../../../../components/Inputs/RadioButtonGroupInput";
import { AutocompleteInput } from "../../../../../components/Inputs/AutocompleteInput";
import { ReferenceArrayInput } from "../../../../../components/Inputs/ReferenceInputs/reference-array-input";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { ArrayInputItemArrow, PlusIcon } from "../../../../../constants/icons";
import { ModelFormStyles } from "../../../../../components/ResourceView/FormWithRedirect/styles";

const INPUT_ITEMS_PER_PAGE = 25;

const useStyles = makeStyles({
  ArrayInputItemStyles,
  ArrayInputWrapper: {
    marginTop: 15,
  },
  AddResourceButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  ...ModelFormStyles,
});

const ChannelVersion: React.FC<{
  parentSourceWithIndex?: string;
  parentSource?: string;
  index?: string;
  show?: boolean;
  resource: string;
  type: "show" | "create" | "edit";
}> = ({ resource, type, parentSourceWithIndex, show, index }) => {
  const { channelId } = useParams<{ channelId: string }>();
  const [showResource, setShowResource] = React.useState(show);
  const history = useHistory();
  const classes = useStyles();

  const goToResource = React.useCallback(
    (resource: string) => {
      history.push(resource);
    },
    [history]
  );

  const showArrayInputItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowResource((p) => !p);
  };

  React.useEffect(() => {
    setShowResource(show);
  }, [show]);

  return (
    <>
      {index && !["edit", "show"].includes(type) && (
        <div className={classes.ArrayInputItemName} onClick={showArrayInputItem}>
          New channel version {+index + 1} <ArrayInputItemArrow />
        </div>
      )}
      <div
        style={{
          height: !showResource && !["edit", "show"].includes(type) ? 0 : "auto",
          overflow: !showResource && !["edit", "show"].includes(type) ? "hidden" : "unset",
        }}
      >
        <TextInput
          resource={resource}
          inputType={type}
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.channelId` : "channelId"}
          label="Series id"
          initialValue={sanitizeId(channelId)}
          style={{ display: "none" }}
          fullWidth
        />
        <TextInput
          resource={resource}
          label="Name"
          inputType={type}
          validate={requiredValidate}
          helpertext="The name for the channel version to be used inside the admin panel."
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.name` : "name"}
          fullWidth
        />
        <ReferenceArrayInput
          label="TV streams"
          validate={requiredValidate}
          source={
            parentSourceWithIndex ? `${parentSourceWithIndex}.streamSourceIds` : "streamSourceIds"
          }
          reference="media_content/tv/channels/live_streams"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteArrayInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            fullWidth
            helperText="You can select several TV streams from the list, the first one will be used by default. If the TV stream is not in the list, you can add it manually in the TV Streams section or by clicking the button below. It is necessary to know the UID of the stream in advance."
          />
        </ReferenceArrayInput>
        <div className={classes.AddResourceButtonWrapper}>
          <StandardButton
            startIcon={<PlusIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
            onClick={() => goToResource("/media_content/tv/channels/live_streams/create")}
          >
            Add new TV stream
          </StandardButton>
        </div>
        <ReferenceInput
          label="EPG source"
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.epgSourceId` : "epgSourceId"}
          reference="media_content/tv/tv_shows/epg_sources"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
        >
          <AutocompleteInput
            optionText="name"
            optionValue="id"
            resource={resource}
            inputType={type}
            fullWidth
            helperText="If the EPG source is not in the list, you can add it manually in the EPG Sources section or by clicking the button below. It is necessary to know in advance the UID of the TV channel provided by the EPG provider."
          />
        </ReferenceInput>
        <div className={classes.AddResourceButtonWrapper}>
          <StandardButton
            startIcon={<PlusIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
            onClick={() => goToResource("/media_content/tv/tv_shows/epg_sources/create")}
          >
            Add new EPG source
          </StandardButton>
        </div>
        {/*<ReferenceInput*/}
        {/*  label="Broadcast region"*/}
        {/*  source={parentSourceWithIndex ? `${parentSourceWithIndex}.regionId` : "regionId"}*/}
        {/*  reference="region"*/}
        {/*  resource={resource}*/}
        {/*  perPage={INPUT_ITEMS_PER_PAGE}*/}
        {/*>*/}
        {/*  <AutocompleteInput*/}
        {/*    optionText="name"*/}
        {/*    optionValue="id"*/}
        {/*    resource={resource}*/}
        {/*    inputType={type}*/}
        {/*    fullWidth*/}
        {/*    helperText="The geographical region in which the customized version of the TV channel will be broadcast. You can add multiple regions from the list."*/}
        {/*  />*/}
        {/*</ReferenceInput>*/}
        <RadioButtonGroupInput
          source={parentSourceWithIndex ? `${parentSourceWithIndex}.published` : "published"}
          label="Publishing"
          initialValue={false}
          inputType={type}
          choices={PUBLISHED_CHOICES_FORM}
        />
      </div>
    </>
  );
};

export const Form: React.FC<FormProps> = ({ type, resource }) => {
  const classes = useStyles();
  return (
    <>
      {type !== "create" && <ChannelVersion resource={resource} type={type} />}
      {type === "create" && (
        <ArrayInput
          source="channelVersions"
          getItemLabel={alwaysEmptyString}
          ChildComponent={ChannelVersion}
          resource={resource}
          itemClass={classes.ArrayInputItemStyles}
          inputClass={classes.ArrayInputWrapper}
          inputType={type}
        />
      )}
      <ScrollTopButton />
    </>
  );
};
