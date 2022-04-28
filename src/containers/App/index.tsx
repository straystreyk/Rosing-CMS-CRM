import { Admin, Resource } from "react-admin";
import CircularProgress from "@material-ui/core/CircularProgress";

import { authProvider, i18nProvider } from "../../components/Providers";
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
import { ChannelsVariables as channels } from "../Channels";
import { SeasonsVariables as seasons } from "../MediaContent/Video/Seasons";
import { EpisodesVariables as episodes } from "../MediaContent/Video/Episodes";
import { GenresVariables as genres } from "../MediaContent/Attributes/Genres";
import { ChannelVersions as channelVersions } from "../ChannelVersions";
import { RadioStationsVariables as radioStations } from "../MediaContent/Radio/RadioStations";
import { RadioLiveStreamsVariables as radioLiveStreams } from "../MediaContent/Radio/RadioLiveStreams";
import { AudioShowsVariables as audioShows } from "../MediaContent/Audio/AudioShows";
import { QuestionsVariables as questions } from "../Questions";
import { NewsVariables as news } from "../MediaContent/News";
import { PartVariables as parts } from "../MediaContent/Audio/Parts";
import { ContentProvidersVariables as contentProviders } from "../MediaContent/Attributes/Providers/ContentProviders";
import { StudiosVariables as studios } from "../MediaContent/Attributes/Providers/Studios";
import { LanguagesVariables as languages } from "../MediaContent/Attributes/Languages";
import { PeopleVariables as people } from "../MediaContent/Attributes/People";

import "../../components/UI/fonts/Gilroy/stylesheet.css";

const { Login, Layout } = Layouts;

export const App = () => {
  const { dataProvider } = useApp();

  if (!dataProvider) {
    return (
      <div className="loader-container">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <Admin
      dataProvider={dataProvider}
      customReducers={customReducers}
      customRoutes={getRoutes(localStorage.getItem("token"))}
      authProvider={authProvider}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
    >
      <Resource name="admin_users" {...users} />
      <Resource name="channel_versions" {...channelVersions} />
      <Resource name="channels" {...channels} />
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
      <Resource name="questions" {...questions} />
      <Resource name="media_content/news" {...news} />
      <Resource name="castMembers" />
      <Resource name="countries" />
      <Resource name="production_countries" />
      <Resource name="api_clients" />
      <Resource name="images" />
    </Admin>
  );
};
