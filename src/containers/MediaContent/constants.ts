import { ListTabProps } from "../../components/Tabs/list-page-tabs";

export const videoTabs: ListTabProps[] = [
  {
    name: "Movies",
    link: "/media_content/video/movies",
  },
  {
    name: "Video files",
    link: "/media_content/video/video_files",
  },
  {
    name: "Series",
    link: "/media_content/video/series",
  },
];

export const radioTabs: ListTabProps[] = [
  {
    name: "Radio stations",
    link: "/media_content/radio/radio_stations",
  },
  {
    name: "Radio live streams",
    link: "/media_content/radio/radio_live_streams",
  },
];
