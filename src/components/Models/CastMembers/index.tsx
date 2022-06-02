import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { ReferenceInput, TextInput } from "../../Inputs";
import { ImageUploaderV2 } from "../../ImageUploader";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { NumberInputOrigin } from "../../Inputs/StandatdInputs/NumberInput/numdber-input";
import { ArrayInputItemArrow } from "../../../constants/icons";
import { AutocompleteInput } from "../../Inputs/AutocompleteInput";

const useStyles = makeStyles({
  CastMemberImagesWrapper: {
    display: "block",
    "& .ImageItemWrapper": {
      marginBottom: 16,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    "& .ImageItem": {
      borderStyle: "solid",
    },
  },
  CastMemberName: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "22px",
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const INPUT_ITEMS_PER_PAGE = 25;
const IMAGE_REQUEST_VARS = { fieldName: "Person" };

export const CastMembers: React.FC<{
  parentSource: string;
  resource: string;
  inputType: string;
  index: string;
  show: boolean;
  parentSourceWithIndex: string;
}> = React.memo(({ parentSource, resource, parentSourceWithIndex, index, show }) => {
  const classes = useStyles();
  const { values } = useFormState();
  const [showResource, setShowResource] = React.useState(show);

  React.useEffect(() => {
    setShowResource(show);
  }, [show]);

  const showCastMember = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowResource((p) => !p);
  };

  const name = values[parentSource][index].role
    ? values[parentSource][index].role.charAt(0).toUpperCase() +
      values[parentSource][index].role.slice(1)
    : "";

  return (
    <>
      <div className={classes.CastMemberName} onClick={showCastMember}>
        {name}
        <button>
          <ArrayInputItemArrow color="var(--secondary-color-main)" />
        </button>
      </div>
      <div
        style={{
          height: !showResource ? "0px" : "auto",
          overflow: !showResource ? "hidden" : "",
        }}
      >
        {values[parentSource][index].role === "actor" && (
          <TextInputOrigin
            source={`${parentSourceWithIndex}.characterName`}
            label="Character name"
            fullWidth
          />
        )}
        <ReferenceInput
          label="Person"
          source={`${parentSourceWithIndex}.person.id`}
          reference="media_content/attributes/people"
          resource={resource}
          perPage={INPUT_ITEMS_PER_PAGE}
          allowEmpty
        >
          <AutocompleteInput
            resource={resource}
            optionText="fullName"
            inputType="create"
            fullWidth
          />
        </ReferenceInput>
        <ImageUploaderV2
          wrapperClassName={classes.CastMemberImagesWrapper}
          requestVariables={IMAGE_REQUEST_VARS}
          sourceIds={`${parentSourceWithIndex}.person.imageIds`}
          source={parentSource}
          index={index}
          resource={resource}
          inputType="create"
          offInfo
        />
        <TextInput
          inputType="create"
          fullWidth
          style={{ display: "none" }}
          source={`${parentSourceWithIndex}.person.images`}
        />
        <TextInputOrigin
          source={`${parentSourceWithIndex}.position`}
          style={{ display: "none" }}
          label=""
          fullWidth
        />
        <NumberInputOrigin
          source={`${parentSourceWithIndex}.role`}
          resource={resource}
          inputType="create"
          style={{ display: "none" }}
          label="Role"
          fullWidth
        />
      </div>
    </>
  );
});
