import { ListTabProps } from "../components/Tabs/list-page-tabs";
import { GET_ONE_MOVIE_NAME } from "../containers/Movies/custom-requests";
import { DocumentNode } from "graphql";

interface breadcrumbsLinkInterface {
  name: string;
  href: string;
  query?: DocumentNode;
  dynamicParam?: string;
}

export const breadcrumbsLinks: breadcrumbsLinkInterface[] = [
  {
    name: "Media content",
    href: "/media_content",
  },
  {
    name: "Video",
    href: "/media_content/video",
  },
  {
    name: "Movies",
    href: "/media_content/video/movies",
  },
  {
    name: "",
    href: "/media_content/video/movies",
    query: GET_ONE_MOVIE_NAME,
    dynamicParam: "id",
  },
  {
    name: "Radio",
    href: "/media_content/radio",
  },
  {
    name: "Radio stations",
    href: "/media_content/radio/radio_stations",
  },
  {
    name: "New radio station",
    href: "/media_content/radio/radio_stations/create",
  },
  {
    name: "Series",
    href: "/media_content/video/series",
  },
  {
    name: "New series",
    href: "/media_content/video/series/create",
  },
  {
    name: "New movie",
    href: "/media_content/video/movies/create",
  },
  {
    name: "Video files",
    href: "/media_content/video/video_files",
  },
];

export const mediaContentTabs: ListTabProps[] = [
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
