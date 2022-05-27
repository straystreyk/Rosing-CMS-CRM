import * as React from "react";
import _ from "lodash";
import cn from "classnames";
import { useForm, useFormState } from "react-final-form";
import { Button, Tooltip } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";

import {
  AcceptFilterIcon,
  CancelFilterIcon,
  ChangeIcon,
  DeleteIcon,
  EditIcon,
  LoopIcon,
  UploadIcon,
} from "../../constants/icons";
import { TextInput } from "../Inputs";
import { SelectButton } from "../UI/Buttons/select-button";
import { InfoComponent } from "../UI/Info/info-component";
import { MainLoader } from "../MainLoader";
import { useImageItem } from "../../custom-hooks/image-uploader";
import { Slider } from "../Slider";
import { GET_IMAGES_TYPES } from "./requests";
import { STATIC_PARAM } from "../Providers/custom-requests";
import { StaticParam } from "../StaticParam";
import { useMutation } from "react-admin";
import { useNotify } from "ra-core";
import { StandardButton } from "../UI/Buttons/standard-button";
import { EmptyShow } from "../Inputs/ArrayInputs/Arrayinput/show-view";
import { ModalMUI } from "../Modal";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../constants/style-constants";

const useStyles = makeStyles((theme) => ({
  ImagesWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    marginBottom: 16,
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  ImageItemWrapper: {
    "& button": {
      textTransform: "unset",
      outline: "none",
      border: "none",
      fontFamily: "var(--font-family)",
    },
  },
  PaperOverride: {
    width: "80vw",
    height: "80vh",
    maxHeight: "80vh",
    display: "flex",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  ModalOverride: {},
  ImageItem: {
    marginTop: 8,
    border: "1px dashed var(--secondary-color-default)",
    height: 250,
    textAlign: "center",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    color: "var(--secondary-color-default)",
    fontSize: 14,
    padding: 15,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    "&:hover .PopupButton": {
      opacity: 1,
      pointerEvents: "all",
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
    "& .StandardButton": {
      marginTop: 10,
    },
  },
  ButtonsWrapper: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
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
    paddingTop: 16,
    position: "relative",
    "&:hover .ShowEditButton": {
      opacity: 1,
    },
  },
  ImagesInfo: {
    backgroundColor: "var(--primary-bg)",
    color: "var(--secondary-color-default)",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    padding: "24px 8px",
    lineHeight: "20px",
    "& > span:first-child": {
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
    color: "var(--secondary-color-main)",
    zIndex: 1,
    "& > span": {
      marginLeft: 15,
      display: "inline-block",
    },
  },
  ImageUploaderShowButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 10,
    "& button": {
      marginLeft: 8,
    },
  },
  PopupButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    opacity: 0,
    pointerEvents: "none",
    transition: "0.35s opacity ease",
    boxShadow: "0px 3px 12px -1px rgba(28, 52, 84, 0.2), 0px 2px 4px -1px rgba(28, 55, 90, 0.2)",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  ImageSize: {
    color: "var(--secondary-color-default)",
    fontSize: 14,
  },
  ShowEditButton: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    opacity: 0,
    transition: "0.35s all ease",
    "& svg path": {
      transition: "0.35s all ease",
    },
    "&:hover svg path": {
      fill: "#005AA3",
    },
  },
}));

export interface ImageProps {
  file: string;
  id: string;
  index?: number;
  kind: string;
  size: number;
  name?: string;
  inputType: string;
  edit: boolean;
}

interface ImageItemProps extends ImageProps {
  setImageIds: any;
  setServerImages: any;
  setShowSlider: any;
  source: string;
  serverImages: ImageProps[];
  requestVariables: Record<string, string>;
  sourceIds: string;
}

const ImageItem: React.FC<ImageItemProps> = React.memo(
  ({
    setImageIds,
    setServerImages,
    kind,
    name,
    file,
    id,
    index,
    requestVariables,
    setShowSlider,
    size,
    serverImages,
    edit,
    sourceIds,
  }) => {
    const classes = useStyles();
    const [imageType, setImageType] = React.useState(kind);
    const [imageName, setImageName] = React.useState(name);
    const [imageSize, setImageSize] = React.useState(size);
    const [mutate] = useMutation();

    const approve = React.useCallback(
      (imageType: string) => {
        mutate({
          type: "update",
          resource: "images",
          payload: { id, data: { kind: imageType } },
        });
      },
      [id, mutate]
    );

    const { isLoading, url, onDrop, deleteImage, imageId, setIsLoading } = useImageItem({
      imageType,
      id,
      file,
      setImageIds,
      setServerImages,
      setImageSize,
      sourceIds,
    });

    React.useEffect(
      () =>
        setServerImages((p: ImageProps[]) =>
          p.map((el) => (el.kind === kind ? { ...el, size: imageSize } : { ...el }))
        ),
      [setServerImages, kind, imageSize]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const changeType = async (value: string, prettyName: string) => {
      setServerImages((p: ImageProps[]) =>
        p.map((el) =>
          el.kind === imageType ? { ...el, name: prettyName, kind: value } : { ...el }
        )
      );

      if (url) {
        try {
          setIsLoading(true);
          await approve(value);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      setImageType(value);
      setImageName(prettyName);
    };

    const removeImageField = () => {
      setServerImages((p: ImageProps[]) => p.filter((el) => el.index !== index));
    };

    const showSlider = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowSlider(true);
    };

    return (
      <div className={cn(classes.ImageItemWrapper, "ImageItemWrapper")}>
        <div className={classes.ImageTitle}>
          <span>{imageName || kind}</span>
          <InfoComponent
            color="var(--secondary-color-default)"
            info="The image will be used on the screen with the description of the movie in the iOS and Android apps. There are no requirements for the location of the main elements of the image and the presence of inscriptions."
          />
        </div>
        <div
          className={cn(classes.ImageItem, "ImageItem")}
          style={{ cursor: !url ? "pointer" : "" }}
          {...(!url && getRootProps())}
        >
          {isLoading && (
            <div className={classes.LoadingWrapper}>
              <MainLoader size={30} /> <span>Loading....</span>
            </div>
          )}
          {!url ? (
            <div className={classes.UploadWrapper}>
              <input {...getInputProps()} multiple={false} />
              Drag and drop the jpg or png file here to attach it, or click on the button below
              <StandardButton
                type="button"
                startIcon={<UploadIcon color="#005AA3" />}
                color="secondary"
                variant="text"
                text="Upload file"
              />
            </div>
          ) : (
            <>
              {id && url && (
                <Button onClick={showSlider} className={cn(classes.PopupButton, "PopupButton")}>
                  <LoopIcon color="var(--primary-focus)" />
                </Button>
              )}
              <img src={url} alt="admin panel" />
            </>
          )}
        </div>
        {edit && (
          <div className={classes.ButtonsWrapper}>
            <StandardButton
              customColor="#D21C1C"
              onClick={id || imageId ? deleteImage : removeImageField}
              startIcon={<DeleteIcon color={"#D21C1C"} />}
              type="button"
              variant="text"
              text="Delete"
            />
            <SelectButton
              buttonClassName={classes.ImageItemChangeButton}
              label="Change type"
              icon={<ChangeIcon color="#005AA3" />}
              pushResource={changeType}
              setServerImages={setServerImages}
              images={serverImages}
              variables={requestVariables}
              query={GET_IMAGES_TYPES}
            />
            {imageSize && (
              <span className={classes.ImageSize}>
                File size {(imageSize / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

export const ImageUploaderV2: React.FC<{
  resource: string;
  source: string;
  sourceIds: string;
  wrapperClassName?: string;
  offInfo?: boolean;
  inputType: string;
  index?: string;
  requestVariables: Record<string, string>;
}> = React.memo(
  ({
    resource,
    children,
    source,
    offInfo,
    index,
    wrapperClassName,
    sourceIds,
    inputType,
    requestVariables,
    ...props
  }) => {
    const { values } = useFormState();
    const classes = useStyles();
    const notify = useNotify();
    const form = useForm();
    const [mutate, { loading, error, data }] = useMutation();
    const [edit, setEdit] = React.useState(inputType !== "show");
    const [showSlider, setShowSlider] = React.useState(false);
    const [initialValue, setInitialValue] = React.useState(values[source]);

    let allImages: ImageProps[] | [];
    const getAllImages = React.useCallback(() => {
      switch (source) {
        case "castMembers":
          return index && values[source][index].person && values[source][index].person.images
            ? values[source][index].person.images
            : undefined;
        default:
          return values[source];
      }
    }, [values, source, index]);
    allImages = getAllImages();

    const [serverImages, setServerImages] = React.useState<ImageProps[] | []>(
      allImages && allImages.length ? allImages : []
    );

    const [imageIds, setImageIds] = React.useState<string[] | []>(
      allImages && allImages.filter(Boolean).length ? allImages.map((el: ImageProps) => el.id) : []
    );

    const approve = React.useCallback(async () => {
      await mutate({
        type: "update",
        resource: resource,
        payload: { id: values.id, data: { ...values, [sourceIds]: values[sourceIds] } },
      });
    }, [resource, sourceIds, mutate, values]);

    const size =
      serverImages && serverImages.length
        ? (_.sumBy(serverImages, (image) => (image.size ? image.size : 0)) / 1024 / 1024).toFixed(2)
        : "0.00";

    const pushResource = React.useCallback(
      (kind: string, prettyName: string) => {
        setServerImages((p: any) => [
          ...p,
          { name: prettyName, kind: kind, index: serverImages.length },
        ]);
      },
      [serverImages, setServerImages]
    );

    const cancel = React.useCallback(() => {
      setServerImages(initialValue);
      setEdit(false);
    }, [initialValue]);

    React.useEffect(() => {
      if (initialValue !== values[source]) {
        setInitialValue(values[source]);
      }
    }, [values, initialValue, source]);

    React.useEffect(() => {
      if (allImages && allImages.length) {
        allImages = getAllImages();
        setServerImages(allImages);
      }
    }, [values[source]]);

    React.useEffect(() => {
      if (allImages) {
        setImageIds(allImages.map((el: ImageProps) => el.id));
      }
    }, [allImages]);

    React.useEffect(() => {
      setServerImages((p: ImageProps[]) =>
        p.map((el: ImageProps, index: number) => ({ ...el, index }))
      );
    }, [serverImages.length]);

    React.useEffect(() => {
      if (error) {
        notify(error.message, { type: "error" });
        setEdit(true);
      }
      if (data) {
        notify("success", { type: "success" });
        setEdit(false);
      }
    }, [data, notify, error]);

    return (
      <>
        <ModalMUI
          offExitIcon
          classNamesOverrides={{
            PaperOverride: classes.PaperOverride,
            ModalOverride: classes.ModalOverride,
          }}
          open={showSlider}
          handleClose={() => setShowSlider(false)}
        >
          <Slider images={serverImages} />
        </ModalMUI>
        {!offInfo && inputType !== "show" && (
          <div className={classes.ImagesInfo}>
            <span>
              The maximum size of uploaded files is{" "}
              <StaticParam variables={{ name: "max_upload_image_size" }} query={STATIC_PARAM} />
              MB
            </span>
            <span>
              Uploaded {size}MB from{" "}
              <StaticParam variables={{ name: "max_upload_image_size" }} query={STATIC_PARAM} />
              MB
            </span>
          </div>
        )}
        <div className={classes.ImagesSection}>
          {inputType === "show" && edit && (
            <div className={classes.ImageUploaderShowButtons}>
              <StandardButton
                startIcon={<AcceptFilterIcon color="var(--accent-color)" />}
                type="button"
                customColor="var(--accent-color)"
                variant="text"
                onClick={approve}
                text="Save"
              />
              <StandardButton
                type="button"
                color="secondary"
                variant="text"
                startIcon={<CancelFilterIcon color="#005AA3" />}
                onClick={cancel}
                text="Cancel"
              />
            </div>
          )}
          {inputType === "show" && !edit && (
            <Tooltip title="Fast edit" placement="left" arrow>
              <div
                className={cn(classes.ShowEditButton, "ShowEditButton")}
                onClick={() => setEdit(true)}
              >
                <EditIcon color="var(--secondary-color-default)" />
              </div>
            </Tooltip>
          )}
          {serverImages.length ? (
            <div className={cn(classes.ImagesWrapper, wrapperClassName && wrapperClassName)}>
              {serverImages.map((image: ImageProps, index) => {
                return (
                  <ImageItem
                    name={image.name}
                    kind={image.kind}
                    id={image.id ?? ""}
                    file={image.file}
                    size={image.size}
                    source={source}
                    inputType={inputType}
                    index={index}
                    sourceIds={sourceIds}
                    key={index}
                    edit={edit}
                    requestVariables={requestVariables}
                    setImageIds={setImageIds}
                    setServerImages={setServerImages}
                    setShowSlider={setShowSlider}
                    serverImages={serverImages}
                  />
                );
              })}
            </div>
          ) : null}
          {edit && (
            <SelectButton
              label="Add image"
              pushResource={pushResource}
              images={serverImages}
              setServerImages={setServerImages}
              variables={requestVariables}
              query={GET_IMAGES_TYPES}
            />
          )}
          <TextInput
            style={{ display: "none" }}
            inputType="create"
            label={sourceIds}
            source={sourceIds}
            fullWidth
          />
          {inputType === "show" && !edit && !serverImages.length && <EmptyShow />}
        </div>
      </>
    );
  }
);
