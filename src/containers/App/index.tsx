import { Admin, Resource } from "react-admin";
import CircularProgress from "@material-ui/core/CircularProgress";

import { authProvider, i18nProvider } from "../../components/Providers";
import { themeReducer } from "../../components/Themes";
import { Layouts } from "../../components/Layout";
import { getRoutes } from "./get-custom-routes";
import { useApp } from "../../custom-hooks/app-component";

import { UserVariables as users } from "../Users";
import { DatacentersVariables as datacenters } from "../Datacenters";
import { VideoFilesVariables as videoFiles } from "../VideoFiles";
import { RightHoldersVariables as rightHolders } from "../RightHolders";
import { MoviesVariables as movies } from "../Movies";
import { SeriesVariables as series } from "../Series";
import { ChannelsVariables as channels } from "../Channels";
import { SeasonsVariables as seasons } from "../Seasons";
import { EpisodesVariables as episodes } from "../Episodes";
import { GenresVariables as genres } from "../Genres";
import { ChannelVersions as channelVersions } from "../ChannelVersions";
import { RadioStationsVariables as radioStations } from "../RadioStations";
import { AudioShowsVariables as audioShows } from "../AudioShows";
import { QuestionsVariables as questions } from "../Questions";
import { NewsVariables as news } from "../News";

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
      customReducers={{ theme: themeReducer }}
      customRoutes={getRoutes(localStorage.getItem("token"))}
      authProvider={authProvider}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
    >
      <Resource name="admin_users" {...users} />
      <Resource name="channel_versions" {...channelVersions} />
      <Resource name="channels" {...channels} />
      <Resource name="right_holders" {...rightHolders} />
      <Resource name="datacenters" {...datacenters} />
      <Resource name="media_content/video/movies" {...movies} />
      <Resource name="media_content/video/video_files" {...videoFiles} />
      <Resource exec name="media_content/video/series" {...series} />
      <Resource exec name="media_content/video/series/:id/seasons" />
      <Resource name="episodes" {...episodes} />
      <Resource name="genres" {...genres} />
      <Resource name="media_content/radio/radio_stations" {...radioStations} />
      <Resource name="audio_shows" {...audioShows} />
      <Resource name="questions" {...questions} />
      <Resource name="news" {...news} />
      <Resource name="people" />
      <Resource name="castMembers" />
      <Resource name="countries" />
      <Resource name="production_countries" />
    </Admin>
  );
};
