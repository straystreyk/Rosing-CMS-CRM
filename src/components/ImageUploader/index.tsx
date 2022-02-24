import * as React from "react";
import { useForm, useFormState } from "react-final-form";
import { Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import { makeStyles } from "@material-ui/core";
import { ChangeIcon, DeleteIcon, UploadIcon } from "../../constants/icons";
import { TextInput } from "../Inputs";
import { SelectButton } from "../UI/Buttons/select-button";
import { gql } from "@apollo/client";
import { InfoComponent } from "../UI/Info/info-component";
import { MainLoader } from "../MainLoader";
import { useImageItem } from "../../custom-hooks/image-uploader";

const useStyles = makeStyles((theme) => ({
  ImagesWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    marginBottom: 16,
  },
  ImageItemWrapper: {
    "& button": {
      textTransform: "unset",
      border: "none",
      fontFamily: "Gilroy, sans-serif",
    },
  },
  ImageItem: {
    marginTop: 8,
    border: "1px dashed #9FA5A8",
    height: 250,
    textAlign: "center",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    color: "#9FA5A8",
    fontSize: 14,
    padding: "0 20px",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  ImageItemChangeButton: {
    color: theme.palette.secondary.main,
    transition: "0.35s all ease",
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      "& svg path": {
        fill: theme.palette.secondary.main,
      },
    },
  },
  UploadWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ButtonsWrapper: {
    marginTop: 8,
    display: "flex",
    "& > button:first-child": {
      color: "#D21C1C",
    },
    "& button": {
      marginRight: 5,
    },
  },
  ImageTitle: {
    display: "flex",
    "& > span:first-child": {
      fontWeight: 500,
      marginRight: 5,
    },
  },
  ImagesSection: {
    paddingTop: 8,
  },
  ImagesInfo: {
    backgroundColor: "#F0F8FF",
    color: "#9FA5A8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
    padding: "24px 8px",
    lineHeight: "20px",
    "& span": {
      color: "#005AA3",
      fontWeight: 500,
      marginBottom: 5,
    },
  },
  LoadingWrapper: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    fontWeight: 500,
    color: "#0f1f26",
    zIndex: 20,
    "& > div": {
      marginRight: 15,
    },
  },
}));

interface ImageProps {
  file: string;
  id: string;
  index?: number;
  kind: string;
  name?: string;
}

interface ImageItemProps extends ImageProps {
  setImageIds: any;
  setServerImages: any;
}

const GET_IMAGES_TYPES = gql`
  query allImageTypes {
    allImageTypes {
      kind
      prettyName
    }
  }
`;

const ImageItem: React.FC<ImageItemProps> = React.memo(
  ({ setImageIds, setServerImages, kind, name, file, id, index }) => {
    const classes = useStyles();
    const [imageType, setImageType] = React.useState(kind);
    const [imageName, setImageName] = React.useState(name);
    const { loading, url, onDrop, deleteImage } = useImageItem({
      imageType,
      id,
      file,
      setImageIds,
      setServerImages,
    });

    React.useEffect(() => setImageName(name), [name]);
    React.useEffect(() => setImageType(kind), [kind]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const changeType = (value: string, prettyName: string) => {
      setImageType(value);
      setImageName(prettyName);
    };

    const removeImageField = () => {
      setServerImages((p: ImageProps[]) => p.filter((el) => el.index !== index));
    };

    return (
      <div className={classes.ImageItemWrapper}>
        <div className={classes.ImageTitle}>
          <span>{imageName}</span>
          <InfoComponent
            color="#9FA5A8"
            info="The image will be used on the screen with the description of the movie in the iOS and Android apps. There are no requirements for the location of the main elements of the image and the presence of inscriptions."
          />
        </div>
        <div
          className={classes.ImageItem}
          style={{ cursor: !url ? "pointer" : "" }}
          {...(!url && getRootProps())}
        >
          {loading && (
            <div className={classes.LoadingWrapper}>
              <MainLoader size={30} /> Loading....
            </div>
          )}
          {!url ? (
            <div className={classes.UploadWrapper}>
              <input {...getInputProps()} multiple={false} />
              Drag and drop the jpg or png file here to attach it, or click on the button below
              <Button type="button" startIcon={<UploadIcon color="#005AA3" />} color="secondary">
                Upload file
              </Button>
            </div>
          ) : (
            <img src={url} alt="admin panel" />
          )}
        </div>
        <div className={classes.ButtonsWrapper}>
          <Button
            onClick={url && id ? deleteImage : removeImageField}
            startIcon={<DeleteIcon color={"#D21C1C"} />}
            type="button"
          >
            Delete
          </Button>
          <SelectButton
            buttonClassName={classes.ImageItemChangeButton}
            label="Change type"
            icon={<ChangeIcon color="#005AA3" />}
            pushResource={changeType}
            query={GET_IMAGES_TYPES}
          />
        </div>
      </div>
    );
  }
);

export const ImageUploaderV2: React.FC<{
  resource: string;
}> = ({ resource, children, ...props }) => {
  const classes = useStyles();
  const form = useForm();
  const {
    values: { images },
  } = useFormState();
  const [serverImages, setServerImages] = React.useState<ImageProps[] | []>(images ?? []);
  const [imageIds, setImageIds] = React.useState<string[] | []>(
    images && images.filter(Boolean).length ? images.map((el: ImageProps) => el.id) : []
  );

  const pushResource = React.useCallback(
    (kind: string, prettyName: string) => {
      setServerImages((p: any) => [
        ...p,
        { name: prettyName, kind: kind, index: serverImages.length },
      ]);
    },
    [serverImages.length]
  );

  React.useEffect(() => {
    form.change("images", imageIds);
  }, [form, imageIds]);

  return (
    <div className={classes.ImagesSection}>
      <div className={classes.ImagesInfo}>
        <span>The maximum size of uploaded files is 10MB</span>
        Uploaded from 10MB
      </div>
      {serverImages.length ? (
        <div className={classes.ImagesWrapper}>
          {serverImages.map((image: ImageProps, index) => {
            console.log("image", image.name);
            return (
              <ImageItem
                name={image.name}
                kind={image.kind}
                id={image.id ?? ""}
                file={image.file}
                index={index}
                key={index}
                setImageIds={setImageIds}
                setServerImages={setServerImages}
              />
            );
          })}
        </div>
      ) : null}
      <SelectButton label="Add image" pushResource={pushResource} query={GET_IMAGES_TYPES} />
      <TextInput inputType={"create"} source="images" fullWidth />
    </div>
  );
};
