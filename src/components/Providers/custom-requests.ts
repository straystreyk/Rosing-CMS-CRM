import { gql } from "@apollo/client";

export const ALL_COUNTRIES = gql`
  query allCountries {
    items: allCountries {
      alpha2
      name
    }
  }
`;

export const ALL_GENRES_FILTER = gql`
  query allGenres {
    items: allGenres {
      value
      name
    }
  }
`;

export const ALL_RATING_SYSTEMS = gql`
  query allRatingSystems {
    items: allRatingSystems {
      system
      tags
    }
  }
`;

export const GET_ONE_VIDEO_FILE = gql`
  query VideoFile($id: ID!) {
    item: VideoFile(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_LANGUAGE = gql`
  query Language($id: ID!) {
    item: Language(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_DATA_CENTER = gql`
  query Datacenter($id: ID!) {
    item: Datacenter(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_GENRE = gql`
  query Genre($id: ID!) {
    item: Genre(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_RADIO_STATION = gql`
  query RadioStation($id: ID!) {
    item: RadioStation(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_PERSON = gql`
  query Person($id: ID!) {
    item: Person(id: $id) {
      id
      fullName
    }
  }
`;

export const GET_ONE_PROGRAM_TYPE = gql`
  query ProgramType($id: ID!) {
    item: ProgramType(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_LABEL = gql`
  query Label($id: ID!) {
    item: Label(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_CHANNEL = gql`
  query Channel($id: ID!) {
    item: Channel(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_TV_STREAM = gql`
  query LiveStream($id: ID!) {
    item: LiveStream(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_CHANNEL_VERSION = gql`
  query ChannelVersion($id: ID!) {
    item: ChannelVersion(id: $id) {
      id
      name
      channel {
        id
      }
    }
  }
`;

export const STATIC_PARAM = gql`
  query StaticParam($name: String!) {
    items: StaticParam(name: $name) {
      name
      value
    }
  }
`;

export const ALL_ROLES = gql`
  query allRoles {
    items: allRoles {
      roleName
    }
  }
`;

export const GET_ONE_RIGHT_HOLDER = gql`
  query RightHolder($id: ID!) {
    item: RightHolder(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_STUDIO = gql`
  query Studio($id: ID!) {
    item: Studio(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_EXTERNAL_CATALOG = gql`
  query ExternalCatalog($id: ID!) {
    item: ExternalCatalog(id: $id) {
      id
      name
    }
  }
`;

export const GET_ONE_RADIO_LIVE_STREAM = gql`
  query RadioLiveStream($id: ID!) {
    item: RadioLiveStream(id: $id) {
      id
      name
    }
  }
`;

export const ALL_DATACENTERS = gql`
  query allDatacenters {
    items: allDatacenters {
      id
      name
      uid
    }
  }
`;

export const ALL_ALLOWED_DRMS = gql`
  query allDrms {
    items: allDrms {
      name
      id
    }
  }
`;
