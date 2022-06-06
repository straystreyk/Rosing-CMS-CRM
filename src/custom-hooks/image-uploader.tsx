import * as React from "react";
import { useForm } from "react-final-form";

export const useImageItem = ({
  imageType,
  id,
  file,
  setImageIds,
  setServerImages,
  setImageSize,
  sourceIds,
  index,
}: {
  imageType: string;
  id: string;
  file: string;
  setImageIds: any;
  setServerImages: any;
  setImageSize: any;
  sourceIds: string;
  index?: number;
}) => {
  const form = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageId, setImageId] = React.useState(id ?? "");
  const [url, setUrl] = React.useState(file ?? "");

  React.useEffect(() => {
    setUrl(file);
  }, [file]);

  React.useEffect(() => {
    setImageId(id);
  }, [id]);

  const onDrop = React.useCallback(
    async (file) => {
      if (file) {
        setIsLoading(true);
        const formData = new FormData();
        const fr = new FileReader();
        formData.append("image", file[0]);
        formData.append("kind", imageType);
        fr.readAsDataURL(file[0]);
        fr.addEventListener("load", () => {
          if (typeof fr.result === "string") {
            setUrl(fr.result);
            setServerImages((p: any) =>
              p.map((el: any) => (el.index === index ? { ...el, file: fr.result } : el))
            );
            setImageSize(file[0].size);
          }
        });
        try {
          const res = await fetch(`${window._GLOBALS_.REACT_APP_IMAGE_ENDPOINT}`, {
            method: "POST",
            body: formData,
          });
          const { imageId } = await res.json();
          setImageId(imageId);
          setImageIds((p: any) => {
            form.change(sourceIds, [...p, imageId]);
            return [...p, imageId];
          });
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [form, sourceIds, setImageSize, setImageIds, imageType]
  );

  const deleteImage = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!imageId) return;

      try {
        if (imageId) {
          setIsLoading(true);
          const res = await fetch(`${window._GLOBALS_.REACT_APP_IMAGE_ENDPOINT}/${imageId}`, {
            method: "DELETE",
          });
          const message = await res.json();
          if (message) {
            setUrl("");
            setImageId("");
            setImageIds((p: string[]) => {
              form.change(
                sourceIds,
                p.filter((el: string) => el !== imageId)
              );
              return p.filter((el: string) => el !== imageId);
            });
            setServerImages((p: any) => p.filter((el: any) => el.id !== imageId));
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setServerImages, setImageIds, imageId, form, sourceIds]
  );

  return {
    isLoading,
    setIsLoading,
    imageId,
    setImageId,
    url,
    setUrl,
    onDrop,
    deleteImage,
  };
};
