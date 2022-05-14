import { GET_ONE_NEWS_NAME } from "./requests";

export const newsLinks = [
  {
    name: "News",
    href: "/media_content/news",
  },
  {
    name: "New News",
    href: "/media_content/news/create",
  },
  {
    name: "",
    href: "/media_content/news/:id",
    dynamicParam: "id",
    query: GET_ONE_NEWS_NAME,
  },
];
