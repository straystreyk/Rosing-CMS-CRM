import { GET_ONE_AUDIO_SHOW_NAME } from "./requests";
import { GET_ONE_PART_NAME } from "../Parts/requests";

export const audioShowsLinks = [
  {
    name: "Audio shows",
    href: "/media_content/audio/audio_shows",
  },
  {
    name: "New audio show",
    href: "/media_content/audio/audio_shows/create",
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:id",
    dynamicParam: "id",
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:audioShowId",
    dynamicParam: "audioShowId",
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "Parts",
    href: "/media_content/audio/audio_shows/:audioShowId/parts",
    dynamicParam: "audioShowId",
    query: GET_ONE_AUDIO_SHOW_NAME,
  },
  {
    name: "",
    href: "/media_content/audio/audio_shows/:audioShowId/parts/:id",
    dynamicParam: "id",
    secondDynamicParam: "audioShowId",
    query: GET_ONE_PART_NAME,
  },
];
