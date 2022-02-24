import * as React from "react";

export const useImageItem = ({
  imageType,
  id,
  file,
  setImageIds,
  setServerImages,
}: {
  imageType: string;
  id: string;
  file: string;
  setImageIds: any;
  setServerImages: any;
}) => {
  const [type, setType] = React.useState(imageType ?? "");
  const [loading, setLoading] = React.useState(false);
  const [imageId, setImageId] = React.useState(id ?? "");
  const [url, setUrl] = React.useState(file ?? "");

  const onDrop = React.useCallback(
    async (file) => {
      if (file) {
        setLoading(true);
        const formData = new FormData();
        const fr = new FileReader();
        formData.append("image", file[0]);
        formData.append("kind", type);
        fr.readAsDataURL(file[0]);
        fr.addEventListener("load", () => {
          if (typeof fr.result === "string") {
            setUrl(fr.result);
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
          setLoading(false);
        }
      }
    },
    [type]
  );

  const deleteImage = React.useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!imageId) return;
    try {
      if (imageId) {
        setLoading(true);
        const res = await fetch(`${window._GLOBALS_.REACT_APP_IMAGE_ENDPOINT}/${imageId}`, {
          method: "DELETE",
        });
        const message = await res.json();
        if (message) {
          setImageIds((p: string[]) => p.filter((el: string) => el !== imageId));
          setServerImages((p: any) => p.filter((el: any) => el.id !== imageId));
          setUrl("");
        } else {
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    type,
    setType,
    loading,
    setLoading,
    imageId,
    setImageId,
    url,
    setUrl,
    onDrop,
    deleteImage,
  };
};
