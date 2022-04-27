import { gql } from "@apollo/client";

export const ALL_COUNTRIES = gql`
  query {
    items: allCountries {
      alpha2
      name
    }
  }
`;

export const ALL_PRODUCTION_COUNTRIES = gql`
  query {
    items: allProductionCountries {
      id
      name
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    items: allGenres {
      id
      name
    }
  }
`;

export const ALL_GENRES_FILTER = gql`
  query {
    items: allGenres {
      value
      name
    }
  }
`;

export const ALL_RATING_SYSTEMS = gql`
  query {
    items: allRatingSystems {
      system
      tags
    }
  }
`;

export const ALL_VIDEO_FILES = gql`
  query {
    items: allVideoFiles {
      id
      name
    }
  }
`;

export const ALL_LANGUAGES = gql`
  query {
    items: allLanguages {
      id
      name
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

export const GET_ONE_DATA_CENTER = gql`
  query Datacenter($id: ID!) {
    item: Datacenter(id: $id) {
      id
      name
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
  query {
    items: allRoles {
      roleName
    }
  }
`;

export const ALL_PEOPLE = gql`
  query {
    items: allPeople {
      fullName
      kinopoiskId
      imdbId
      id
    }
  }
`;

export const ALL_RIGHT_HOLDERS = gql`
  query {
    items: allRightHolders {
      id
      name
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

export const ALL_DATACENTERS = gql`
  query {
    items: allDatacenters {
      id
      name
      uid
    }
  }
`;

export const ALL_ALLOWED_DRMS = gql`
  query {
    items: allDrms {
      name
      id
    }
  }
`;
