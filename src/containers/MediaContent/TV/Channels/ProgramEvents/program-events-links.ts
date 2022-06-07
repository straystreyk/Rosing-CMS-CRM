import { Breadcrumb } from "../../../../../components/Breadcrumbs/breadcrumbs-links";
import { GET_ONE_CHANNEL_VERSION } from "../../../../../components/Providers/custom-requests";

export const programEventsLinks: Breadcrumb[] = [
  {
    name: "Program events",
    href: "/media_content/tv/channels/channel_versions/:channelVersionId/:epgSourceId/:startAt/program_events",
    dynamicParam: "channelVersionId",
    secondDynamicParam: "epgSourceId",
    thirdDynamicParam: "startAt",
    query: GET_ONE_CHANNEL_VERSION,
  },
];
