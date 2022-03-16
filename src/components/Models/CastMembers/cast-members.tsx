import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { useForm, useFormState } from "react-final-form";

import { NumberInput, TextInput } from "../../Inputs";
import { GroupInputsOrigin } from "../../GroupInputs";
import { ImageUploaderV2 } from "../../ImageUploader";
import { ReferenceCustomInput } from "../../Inputs/ReferenceInputs/reference-custom-input";
import { ALL_PEOPLE } from "../../Providers/custom-requests";
import { SelectInputOrigin } from "../../Inputs/StandatdInputs/SelectInput/select-input";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { NumberInputOrigin } from "../../Inputs/StandatdInputs/NumberInput/numdber-input";

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
  const form = useForm();
  const [showResource, setShowResource] = React.useState(show);

  //нужно пересмотреть этот метод
  React.useEffect(() => {
    form.change(`${parentSourceWithIndex}.person.images`, []);
  }, []);
  //

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
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.61524 0.691913L3.99894 3.30821L1.38281 0.691895"
              stroke="#0F1F26"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div
        style={{
          height: !showResource ? "0px" : "auto",
          overflow: !showResource ? "hidden" : "",
        }}
      >
        {values[parentSource][index].role === "actor" && (
          <TextInput
            source={`${parentSourceWithIndex}.characterName`}
            label="Character name"
            fullWidth
          />
        )}
        <ReferenceCustomInput
          source={`${parentSourceWithIndex}.person.id`}
          component={SelectInputOrigin}
          inputType="create"
          resource={resource}
          query={ALL_PEOPLE}
          name="fullName"
          label="Person"
          idName="id"
          fullWidth
        />
        <ImageUploaderV2
          wrapperClassName={classes.CastMemberImagesWrapper}
          sourceIds={`${parentSourceWithIndex}.person.imageIds`}
          source={parentSource}
          index={index}
          resource={resource}
          inputType="create"
        />
        <TextInput
          inputType="create"
          fullWidth
          style={{ display: "none" }}
          source={`${parentSourceWithIndex}.person.images`}
        />
        <GroupInputsOrigin inputType="create" label="ID in the cinema database">
          <NumberInput
            source={`${parentSourceWithIndex}.person.kinopoiskId`}
            label="Kinopoisk ID"
            helperText={
              "A digital identifier in the Kinopoisk system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            }
          />
          <NumberInput
            source={`${parentSourceWithIndex}.person.imdbId`}
            label="IMDB ID"
            helperText={
              "A digital identifier in the IMDB system, which is contained in a link in the address bar, for example, https://www.imdb.com/title/tt6920084/"
            }
          />
        </GroupInputsOrigin>
        <TextInputOrigin
          source={`${parentSourceWithIndex}.position`}
          style={{ display: "none" }}
          label=""
          fullWidth
        />
        <NumberInputOrigin
          source={`${parentSourceWithIndex}.role`}
          style={{ display: "none" }}
          label="Role"
          fullWidth
        />
      </div>
    </>
  );
});
