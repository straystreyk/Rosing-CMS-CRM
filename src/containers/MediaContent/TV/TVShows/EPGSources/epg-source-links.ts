import { Breadcrumb } from "../../../../../components/Breadcrumbs/breadcrumbs-links";
import { GET_ONE_EPG_SOURCE } from "./requests";

export const epgSourceLinks: Breadcrumb[] = [
  {
    name: "EPG sources",
    href: "/media_content/tv/tv_shows/epg_sources",
  },
  {
    name: "New STV source",
    href: "/media_content/tv/tv_shows/epg_sources/stv/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/stv/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New SPB source",
    href: "/media_content/tv/tv_shows/epg_sources/spb/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/spb/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New EPG Service source",
    href: "/media_content/tv/tv_shows/epg_sources/epg_service/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/epg_service/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New SPBTV Internal source",
    href: "/media_content/tv/tv_shows/epg_sources/spbtv_internal/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/spbtv_internal/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New XMLTV Url source",
    href: "/media_content/tv/tv_shows/epg_sources/xmltv_url/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/xmltv_url/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New Pixellot source",
    href: "/media_content/tv/tv_shows/epg_sources/pixellot/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/pixellot/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
  {
    name: "New EPG Local source",
    href: "/media_content/tv/tv_shows/epg_sources/epg_local/create",
  },
  {
    name: "",
    href: "/media_content/tv/tv_shows/epg_sources/epg_local/:id",
    dynamicParam: "id",
    query: GET_ONE_EPG_SOURCE,
  },
];

export const tableLinks: Record<string, string> = {
  Stv: "stv",
  Spb: "spb",
  EpgService: "epg_service",
  Spbtv: "spbtv_internal",
  XmlTvUrl: "xmltv_url",
  Pixellot: "pixellot",
};
