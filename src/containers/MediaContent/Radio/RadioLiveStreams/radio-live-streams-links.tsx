import { GET_ONE_RADIO_LIVE_STREAM } from "../../../../components/Providers/custom-requests";

export const radioLiveStreamsLinks = [
  {
    name: "Radio live streams",
    href: "/media_content/radio/radio_live_streams",
  },
  {
    name: "New radio live stream",
    href: "/media_content/radio/radio_live_streams/create",
  },
  {
    name: "",
    href: "/media_content/radio/radio_live_streams/:id",
    query: GET_ONE_RADIO_LIVE_STREAM,
    dynamicParam: "id",
  },
];
