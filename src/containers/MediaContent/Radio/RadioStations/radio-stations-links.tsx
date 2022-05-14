import { GET_ONE_RADIO_STATION } from "../../../../components/Providers/custom-requests";

export const radioStationsLinks = [
  {
    name: "Radio stations",
    href: "/media_content/radio/radio_stations",
  },
  {
    name: "New radio station",
    href: "/media_content/radio/radio_stations/create",
  },
  {
    name: "",
    href: "/media_content/radio/radio_stations/:id",
    dynamicParam: "id",
    query: GET_ONE_RADIO_STATION,
  },
];
