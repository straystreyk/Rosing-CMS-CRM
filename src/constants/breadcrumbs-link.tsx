import { ListTabProps } from "../components/Tabs/list-page-tabs";

interface breadcrumbsLinkInterface {
  name: string;
  href: string;
}

export const breadcrumbsLinks: breadcrumbsLinkInterface[] = [
  {
    name: "Media content",
    href: "/media_content",
  },
  {
    name: "Movies",
    href: "/media_content/movies",
  },
  {
    name: "New movie",
    href: "/media_content/movies/create",
  },
  {
    name: "Video files",
    href: "/media_content/video_files",
  },
];

export const mediaContentTabs: ListTabProps[] = [
  {
    name: "Movies",
    link: "/media_content/movies",
  },
  {
    name: "Video files",
    link: "/media_content/video_files",
  },
];
