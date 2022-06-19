import * as React from "react";
import _ from "lodash";
import cn from "classnames";
import { useFormState } from "react-final-form";
import { Tooltip } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";

import {
  AcceptFilterIcon,
  CancelFilterIcon,
  ChangeIcon,
  DeleteIconNew,
  EditIcon,
  LoopIcon,
  UploadIcon,
} from "../../constants/icons";
import { TextInput } from "../Inputs";
import { SelectButton } from "../UI/Buttons/select-button";
import { MainLoader } from "../MainLoader";
import { useImageItem } from "../../custom-hooks/image-uploader";
import { Slider } from "../Slider";
import { GET_IMAGES_TYPES } from "./requests";
import { STATIC_PARAM } from "../Providers/custom-requests";
import { StaticParam } from "../StaticParam";
import { useMutation } from "react-admin";
import { useNotify } from "ra-core";
import { StandardButton } from "../UI/Buttons/StandardButton/standard-button";
import { EmptyShow } from "../Inputs/ArrayInputs/Arrayinput/show-view";
import { ModalMUI } from "../Modal";
import { ImageUploaderStyles } from "./styles";
import { ImageItemProps, ImageProps } from "./types";

const useStyles = makeStyles(ImageUploaderStyles);

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
    openSlider,
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
      index,
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

    return (
      <div className={cn(classes.ImageItemWrapper, "ImageItemWrapper")}>
        <div className={classes.ImageTitle}>
          <span>{imageName || kind}</span>
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
                startIcon={<UploadIcon />}
                variant="text"
                buttonType="secondary"
                text="Upload file"
              />
            </div>
          ) : (
            <>
              {id && url && (
                <div className={cn(classes.PopupButtonWrapper, "PopupButtonWrapper")}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openSlider(e, index);
                    }}
                    className={cn(classes.PopupButton, "PopupButton")}
                  >
                    <LoopIcon />
                  </button>
                </div>
              )}
              <img src={url} alt="admin panel" />
            </>
          )}
        </div>
        {edit && (
          <div className={classes.ButtonsWrapper}>
            <StandardButton
              onClick={id || imageId ? deleteImage : removeImageField}
              startIcon={<DeleteIconNew />}
              type="button"
              className="Delete"
              variant="text"
              text="Delete"
              buttonType="additional-red"
            />
            <SelectButton
              buttonClassName={classes.ImageItemChangeButton}
              label="Change type"
              icon={<ChangeIcon />}
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
    const [mutate, { error, data }] = useMutation();
    const [edit, setEdit] = React.useState(inputType !== "show");
    const [showSlider, setShowSlider] = React.useState(false);
    const [initialValue, setInitialValue] = React.useState(values[source]);
    const [swiper, setSwiper] = React.useState<any>(null);

    const openSlider = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        swiper.slideToLoop(index);
        setShowSlider(true);
      },
      [swiper]
    );

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
          keepMounted={true}
          open={showSlider}
          handleClose={() => setShowSlider(false)}
        >
          <Slider images={serverImages} setSwiper={setSwiper} />
        </ModalMUI>
        {!offInfo && inputType !== "show" && (
          <div className={classes.ImagesInfo}>
            <span>
              The maximum size of uploaded files is&nbsp;
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
                startIcon={<AcceptFilterIcon />}
                type="button"
                buttonType="primary"
                variant="text"
                onClick={approve}
                text="Save"
              />
              <StandardButton
                type="button"
                buttonType="secondary"
                variant="text"
                startIcon={<CancelFilterIcon />}
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
                <EditIcon />
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
                    openSlider={openSlider}
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
            resource={resource}
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
