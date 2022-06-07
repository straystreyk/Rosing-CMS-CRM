import { GET_ONE_CHANNEL } from "../../../../../components/Providers/custom-requests";

export const channelsLinks = [
  {
    name: "New channel",
    href: "/media_content/tv/channels/channels/create",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:id",
    query: GET_ONE_CHANNEL,
    dynamicParam: "id",
  },
  {
    name: "",
    href: "/media_content/tv/channels/channels/:channelId",
    query: GET_ONE_CHANNEL,
    dynamicParam: "channelId",
  },
];
