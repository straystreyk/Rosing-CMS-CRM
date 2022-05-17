import { GET_EPG_LOCAL_EVENT_NAME } from "./request";

export const epgLocalEventsLinks = [
  {
    name: "TV shows",
    href: "/media_content/tv/tv_shows/epg_local_events",
  },
  {
    name: "New TV show",
    href: "/media_content/tv/tv_shows/epg_local_events/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_local_events/:id",
    query: GET_EPG_LOCAL_EVENT_NAME,
    dynamicParam: "id",
  },
];
