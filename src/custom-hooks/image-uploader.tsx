import * as React from "react";

export const useImageItem = ({
  imageType,
  id,
  file,
  setImageIds,
  setServerImages,
  setImageSize,
}: {
  imageType: string;
  id: string;
  file: string;
  setImageIds: any;
  setServerImages: any;
  setImageSize: any;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageId, setImageId] = React.useState(id ?? "");
  const [url, setUrl] = React.useState(file ?? "");

  React.useEffect(() => {
    setUrl(file);
  }, [file]);

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
          setImageIds((p: any) => [...p, imageId]);
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [setImageSize, setImageIds, imageType]
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
            setImageIds((p: string[]) => p.filter((el: string) => el !== imageId));
            setServerImages((p: any) => p.filter((el: any) => el.id !== imageId));
            setUrl("");
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
    [setImageSize, setServerImages, setImageIds, imageId]
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
