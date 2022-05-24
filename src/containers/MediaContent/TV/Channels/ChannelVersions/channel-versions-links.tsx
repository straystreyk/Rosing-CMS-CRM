import {
  GET_ONE_CHANNEL,
  GET_ONE_CHANNEL_VERSION,
} from "../../../../../components/Providers/custom-requests";

export const channelVersionsLinks = [
  {
    name: "Channel versions",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
  {
    name: "Channel versions",
    href: "/media_content/tv/channels/channel_versions",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channel_versions/:channelVersionId",
    query: GET_ONE_CHANNEL_VERSION,
    dynamicParam: "channelVersionId",
  },
  {
    name: "New channel version",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions/create",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:channelId/channel_versions/:id",
    query: GET_ONE_CHANNEL_VERSION,
    dynamicParam: "id",
    secondDynamicParam: "channelId",
  },
];
