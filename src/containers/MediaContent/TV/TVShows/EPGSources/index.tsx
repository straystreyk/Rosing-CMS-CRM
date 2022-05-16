import { List } from "./epg-sources";
import { Create as STVCreate, Show as STVShow, Edit as STVEdit } from "./STV/stv";
import { Create as SPBCreate, Show as SPBShow, Edit as SPBEdit } from "./SPB/spb";
import {
  Create as EpgLocalCreate,
  Show as EpgLocalShow,
  Edit as EpgLocalEdit,
} from "./EPGLocal/epg-local";
import {
  Create as PixellotCreate,
  Show as PixellotShow,
  Edit as PixellotEdit,
} from "./Pixellot/pixellot";
import {
  Create as EPGServiceCreate,
  Show as EPGServiceShow,
  Edit as EPGServiceEdit,
} from "./EPGService/epg-service";
import {
  Create as SPBTVInternalCreate,
  Show as SPBTVInternalShow,
  Edit as SPBTVInternalEdit,
} from "./SPBTVInternal/spbtv-internal";
import {
  Create as XMLTVUrlCreate,
  Show as XMLTVUrlShow,
  Edit as XMLTVUrlEdit,
} from "./XMLTVUrl/xmltv-url";

export const EPGSourcesVariables = {
  initial: {
    list: List,
  },
  stv: {
    create: STVCreate,
    show: STVShow,
    edit: STVEdit,
  },
  spb: {
    create: SPBCreate,
    show: SPBShow,
    edit: SPBEdit,
  },
  epgService: {
    create: EPGServiceCreate,
    show: EPGServiceShow,
    edit: EPGServiceEdit,
  },
  spbtvInternal: {
    create: SPBTVInternalCreate,
    show: SPBTVInternalShow,
    edit: SPBTVInternalEdit,
  },
  xmltvUrl: {
    create: XMLTVUrlCreate,
    show: XMLTVUrlShow,
    edit: XMLTVUrlEdit,
  },
  pixellot: {
    create: PixellotCreate,
    show: PixellotShow,
    edit: PixellotEdit,
  },
  epgLocal: {
    create: EpgLocalCreate,
    show: EpgLocalShow,
    edit: EpgLocalEdit,
  },
};
