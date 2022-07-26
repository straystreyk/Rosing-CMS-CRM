import { Admin, Resource } from "react-admin";
import { Providers } from "../../components/Providers";
import { Layouts } from "../../components/Layout";
import { getRoutes } from "./get-custom-routes";
import { useApp } from "../../custom-hooks/app-component";

import { customReducers } from "./custom-reducers";
import { UserVariables as users } from "../Users";
import { DatacentersVariables as datacenters } from "../Datacenters";
import { VideoFilesVariables as videoFiles } from "../MediaContent/Video/VideoFiles";
import { RightHoldersVariables as rightHolders } from "../MediaContent/Attributes/Providers/RightHolders";
import { MoviesVariables as movies } from "../MediaContent/Video/Movies";
import { SeriesVariables as series } from "../MediaContent/Video/Series";
import { ChannelsVariables as channels } from "../MediaContent/TV/Channels/Channels";
import { SeasonsVariables as seasons } from "../MediaContent/Video/Seasons";
import { EpisodesVariables as episodes } from "../MediaContent/Video/Episodes";
import { GenresVariables as genres } from "../MediaContent/Attributes/Genres";
import { ChannelVersions as channelVersions } from "../MediaContent/TV/Channels/ChannelVersions";
import { RadioStationsVariables as radioStations } from "../MediaContent/Radio/RadioStations";
import { RadioLiveStreamsVariables as radioLiveStreams } from "../MediaContent/Radio/RadioLiveStreams";
import { AudioShowsVariables as audioShows } from "../MediaContent/Audio/AudioShows";
import { NewsVariables as news } from "../MediaContent/News";
import { PartVariables as parts } from "../MediaContent/Audio/Parts";
import { ContentProvidersVariables as contentProviders } from "../MediaContent/Attributes/Providers/ContentProviders";
import { StudiosVariables as studios } from "../MediaContent/Attributes/Providers/Studios";
import { LanguagesVariables as languages } from "../MediaContent/Attributes/Languages";
import { PeopleVariables as people } from "../MediaContent/Attributes/People";
import { ProgramsTypesVariables as programsTypes } from "../MediaContent/Attributes/ProgramsTypes";
import { LabelsVariables as labels } from "../MediaContent/Attributes/Labels";
import { TVStreamsVariables as tvStreams } from "../MediaContent/TV/Channels/TV streams";
import { ChannelPositionOverridesVariables as channelPositionOverrides } from "../MediaContent/TV/Channels/ChannelPositionOverrides";
import { BlackoutsVariables as blackouts } from "../MediaContent/TV/Channels/Blackouts";
import { EPGSourcesVariables as epgSources } from "../MediaContent/TV/TVShows/EPGSources";
import { EPGLocalEventsVariables as epgLocalEvents } from "../MediaContent/TV/TVShows/EPGLocalEvents";
import { EPGVariables as epg } from "../MediaContent/TV/TVShows/EPG";
import { ProgramEventsVariables as programEvents } from "../MediaContent/TV/Channels/ProgramEvents";
import { QuestionVariables as questions } from "../PagesAndAttributes/Question";
import { ScreenConfigVariables as screenConfigs } from "../PagesAndAttributes/ScreenConfig";
import { SearchFilterGroupVariables as searchFiltersGroup } from "../PagesAndAttributes/Filters/SearchFilterGroup";
import { FilterVariables as filters } from "../PagesAndAttributes/Filters/Filter";

import "../../components/UI/fonts/Gilroy/stylesheet.css";
import { MainLoader } from "../../components/MainLoader";

const { Login, Layout } = Layouts;
const { authProvider, i18nProvider } = Providers;

export const App = () => {
  const { dataProvider } = useApp();

  if (!dataProvider) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainLoader size={70} />
      </div>
    );
  }

  return (
    <Admin
      dataProvider={dataProvider}
      customReducers={customReducers}
      customRoutes={getRoutes(localStorage.getItem("token"))}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      layout={Layout}
    >
      <Resource name="admin_users" {...users} />
      <Resource name="media_content/tv/tv_shows/epg_local_events" {...epgLocalEvents} />
      <Resource
        name="media_content/tv/channels/channel_versions/:channelVersionId/:epgSourceId/:startAt/program_events"
        {...programEvents}
      />
      <Resource
        name="media_content/tv/channels/channels/:channelId/channel_versions"
        {...channelVersions}
      />
      <Resource name="media_content/tv/channels/channels" {...channels} />
      <Resource name="media_content/tv/channels/live_streams" {...tvStreams} />
      <Resource
        name="media_content/tv/channels/channel_positions_overrides"
        {...channelPositionOverrides}
      />
      <Resource name="media_content/tv/channels/blackouts" {...blackouts} />
      <Resource
        name="media_content/tv/tv_shows/epg_sources/epg_service"
        {...epgSources.epgService}
      />
      <Resource
        name="media_content/tv/tv_shows/epg_sources/spbtv_internal"
        {...epgSources.spbtvInternal}
      />
      <Resource name="media_content/tv/tv_shows/epg_sources/pixellot" {...epgSources.pixellot} />
      <Resource name="media_content/tv/tv_shows/epg_sources/epg_local" {...epgSources.epgLocal} />
      <Resource name="media_content/tv/tv_shows/epg_sources/xmltv_url" {...epgSources.xmltvUrl} />
      <Resource name="media_content/tv/tv_shows/epg_sources/stv" {...epgSources.stv} />
      <Resource name="media_content/tv/tv_shows/epg_sources/spb" {...epgSources.spb} />
      <Resource name="media_content/tv/tv_shows/epg_sources" {...epgSources.initial} />
      <Resource name="media_content/tv/tv_shows/tv_programs" {...epg} />
      <Resource name="datacenters" {...datacenters} />
      <Resource name="media_content/video/movies" {...movies} />
      <Resource name="media_content/video/video_files" {...videoFiles} />
      <Resource name="media_content/video/seasons/:seasonId/episodes" {...episodes} />
      <Resource name="media_content/video/series/:seriesId/seasons" {...seasons} />
      <Resource name="media_content/video/series" {...series} />
      <Resource name="media_content/radio/radio_stations" {...radioStations} />
      <Resource name="media_content/radio/radio_live_streams" {...radioLiveStreams} />
      <Resource name="media_content/audio/audio_shows/:audioShowId/parts" {...parts} />
      <Resource name="media_content/audio/audio_shows" {...audioShows} />
      <Resource name="media_content/attributes/providers/content_providers" {...contentProviders} />
      <Resource name="media_content/attributes/providers/right_holders" {...rightHolders} />
      <Resource name="media_content/attributes/providers/studios" {...studios} />
      <Resource name="media_content/attributes/genres" {...genres} />
      <Resource name="media_content/attributes/languages" {...languages} />
      <Resource name="media_content/attributes/people" {...people} />
      <Resource name="media_content/attributes/programs_types" {...programsTypes} />
      <Resource name="media_content/attributes/labels" {...labels} />
      <Resource name="media_content/news" {...news} />
      <Resource name="pages_and_attributes/questions" {...questions} />
      <Resource name="pages_and_attributes/screen_configs" {...screenConfigs} />
      <Resource name="pages_and_attributes/filters/search_filters_groups" {...searchFiltersGroup} />
      <Resource name="pages_and_attributes/filters/filters" {...filters} />
      <Resource name="castMembers" />
      <Resource name="countries" />
      <Resource name="production_countries" />
      <Resource name="regions" />
      <Resource name="api_clients" />
      <Resource name="search_filters" />
      <Resource name="images" />
    </Admin>
  );
};
