import { GET_ONE_VIDEO_FILE } from "./custom-requests";

export const videoFilesLinks = [
  {
    name: "Video files",
    href: "/media_content/video/video_files",
  },
  {
    name: "New video file",
    href: "/media_content/video/video_files/create",
  },
  {
    name: "",
    href: "/media_content/video/video_files/:id",
    query: GET_ONE_VIDEO_FILE,
    dynamicParam: "id",
  },
];
