import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";

export const en: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    expandMenu: {
      mediaContent: "Media content",
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      new_customers: "New Customers",
      pending_orders: "Pending Orders",
      order: {
        items: "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items",
      },
      welcome: {
        title: "Welcome to the react-admin e-commerce demo",
        subtitle:
          "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        aor_button: "react-admin site",
        demo_button: "Source for this demo",
      },
    },
  },
  validation: {
    form: {
      empty: "Field can not be empty",
      email: "Incorrect Email",
    },
  },
  actions: {
    login: "Login",
    reset: "Reset my password",
    resetSuccess:
      "You will receive an email with instructions on how to reset your password in a few minutes.",
  },
  resources: {
    admin_users: {
      name: "Users",
      titles: {
        create: "New User",
        edit: "Edit User",
        list: "Users",
      },
      fields: {
        username: "Username",
        last_name: "Last Name",
        first_name: "First Name",
        createdAt: "Date of creation",
      },
    },
    "media_content/news": {
      name: "News",
      titles: {
        create: "New News",
        edit: "Edit News",
        list: "News",
      },
      mutations: {
        create: {
          success: 'New news "%{name}" was created',
          error: "Cant create news: %{error}",
        },
        edit: {
          success: "News was updated",
          error: "Cant update news: %{error}",
        },
        list: {
          success: 'News "%{name}" was successfully updated',
          error: "Cant update news: %{error}",
        },
      },
    },
    "media_content/video/movies": {
      name: "Movies",
      menu_name: "Video",
      titles: {
        create: "New Movie",
        edit: "Edit Movie",
        list: "Video",
      },
      mutations: {
        create: {
          success: 'New movie "%{name}" was created',
          error: "Cant create movie: %{error}",
        },
        edit: {
          success: "Movie was updated",
          error: "Cant update movie: %{error}",
        },
        list: {
          success: 'Movie "%{name}" was successfully updated',
          error: "Cant update movie: %{error}",
        },
      },
      fields: {
        name: "Name",
      },
    },
    "pages_and_attributes/questions": {
      name: "Questions",
      titles: {
        create: "New Question",
        edit: "Edit Question",
        list: "Pages and attributes",
      },
      mutations: {
        create: {
          success: 'New question "%{name}" was created',
          error: "Cant create question: %{error}",
        },
        edit: {
          success: "Question was updated",
          error: "Cant update question: %{error}",
        },
        list: {
          success: 'Question "%{name}" was successfully updated',
          error: "Cant update question: %{error}",
        },
      },
    },
    "media_content/attributes/genres": {
      name: "Genres",
      titles: {
        create: "New Genre",
        edit: "Edit Genre",
        list: "Attributes",
      },
    },
    "media_content/attributes/programs_types": {
      name: "Types of TV shows",
      titles: {
        create: "New type of TV show",
        edit: "Edit type of TV show",
        list: "Attributes",
      },
      mutations: {
        create: {
          success: 'New type of TV show "%{name}" was created',
          error: "Cant create type of TV show: %{error}",
        },
        edit: {
          success: "Type of TV show was updated",
          error: "Cant update type of tv show: %{error}",
        },
        list: {
          success: 'Type of tv show "%{name}" was successfully updated',
          error: "Cant update type of tv show: %{error}",
        },
      },
    },
    "media_content/attributes/labels": {
      name: "Labels",
      titles: {
        create: "New label",
        edit: "Edit label",
        list: "Attributes",
      },
      mutations: {
        create: {
          success: 'New label "%{name}" was created',
          error: "Cant create label: %{error}",
        },
        edit: {
          success: "Type of TV show was updated",
          error: "Cant update label: %{error}",
        },
        list: {
          success: 'Label "%{name}" was successfully updated',
          error: "Cant update label: %{error}",
        },
      },
    },
    "media_content/attributes/languages": {
      name: "Languages",
      titles: {
        create: "New Language",
        edit: "Edit Language",
        list: "Attributes",
      },
    },
    "media_content/attributes/people": {
      name: "Persons",
      titles: {
        create: "New Person",
        edit: "Edit Person",
        list: "Attributes",
      },
    },
    "media_content/radio/radio_stations": {
      name: "Radio stations",
      menu_name: "Radio",
      titles: {
        create: "New Radio station",
        edit: "Edit Radio station",
        list: "Radio",
      },
      mutations: {
        create: {
          success: 'New radio station "%{name}" was created',
          error: "Cant create radio station: %{error}",
        },
        edit: {
          success: "Radio station was updated",
          error: "Cant update radio station: %{error}",
        },
        list: {
          success: 'Radio station "%{name}" was successfully updated',
          error: "Cant update Radio station: %{error}",
        },
      },
    },
    "media_content/radio/radio_live_streams": {
      name: "Radio live streams",
      menu_name: "Radio",
      titles: {
        create: "New radio live stream",
        edit: "Edit radio live stream",
        list: "Radio",
      },
      mutations: {
        create: {
          success: 'New audio live stream "%{name}" was created',
          error: "Cant create audio live stream: %{error}",
        },
        edit: {
          success: "Audio live stream was updated",
          error: "Cant update audio live stream: %{error}",
        },
        list: {
          success: 'Audio live stream "%{name}" was successfully updated',
          error: "Cant update audio live stream: %{error}",
        },
      },
    },
    "media_content/audio/audio_shows": {
      name: "Audio Shows",
      menu_name: "Audio",
      titles: {
        create: "New Audio Show",
        edit: "Edit Audio Show",
        list: "Audio",
      },
      mutations: {
        create: {
          success: 'New audio show "%{name}" was created',
          error: "Cant create audio show: %{error}",
        },
        edit: {
          success: "Audio show was updated",
          error: "Cant update audio show: %{error}",
        },
        list: {
          success: 'Audio show "%{name}" was successfully updated',
          error: "Cant update audio show: %{error}",
        },
      },
    },
    "media_content/audio/audio_shows/:audioShowId/parts": {
      name: "Part",
      titles: {
        create: "New Part",
        edit: "Edit Part",
        list: "Parts",
      },
      mutations: {
        create: {
          success: 'New part "%{name}" was created',
          error: "Cant create part: %{error}",
        },
        edit: {
          success: "Part was updated",
          error: "Cant update part: %{error}",
        },
        list: {
          success: 'Part "%{name}" was successfully updated',
          error: "Cant update part: %{error}",
        },
      },
    },
    "media_content/attributes/providers/content_providers": {
      name: "Content providers",
      titles: {
        create: "New content provider",
        edit: "Edit content provider",
        list: "Attributes",
      },
      mutations: {
        create: {
          success: 'New content provider "%{name}" was created',
          error: "Cant create content provider: %{error}",
        },
        edit: {
          success: "Content provider was updated",
          error: "Cant update content provider: %{error}",
        },
        list: {
          success: 'Content provider "%{name}" was successfully updated',
          error: "Cant update content provider: %{error}",
        },
      },
    },
    "media_content/attributes/providers/studios": {
      name: "Studios",
      titles: {
        create: "New studio",
        edit: "Edit studio",
        list: "Attributes",
      },
      mutations: {
        create: {
          success: 'New studio "%{name}" was created',
          error: "Cant create studio: %{error}",
        },
        edit: {
          success: "Studio was updated",
          error: "Cant update studio: %{error}",
        },
        list: {
          success: 'Studio "%{name}" was successfully updated',
          error: "Cant update studio: %{error}",
        },
      },
    },
    datacenters: {
      name: "Datacenters",
      titles: {
        create: "New Datacenter",
        edit: "Edit Datacenter",
        list: "Datacenter",
      },
    },
    "media_content/video/video_files": {
      name: "Video files",
      titles: {
        create: "New Video File",
        edit: "Edit Video File",
        list: "Video",
      },
      mutations: {
        create: {
          success: 'New video file "%{name}" was created',
          error: "Cant create video file: %{error}",
        },
        edit: {
          success: "Video file was updated",
          error: "Cant update video file: %{error}",
        },
      },
      filtersLabels: {
        name: "Name",
        streamingUid: "StreamingUID",
        datacenterId: "Datacenter",
        published: "Published",
      },
    },
    "media_content/video/series": {
      name: "Series",
      titles: {
        create: "New Series",
        edit: "Edit Series",
        list: "Video",
      },
      mutations: {
        create: {
          success: 'New series "%{name}" was created',
          error: "Cant create series: %{error}",
        },
        edit: {
          success: "Series was updated",
          error: "Cant update series: %{error}",
        },
      },
    },
    "media_content/video/series/:seriesId/seasons": {
      name: "Seasons",
      titles: {
        create: "New Season",
        edit: "Edit Season",
        list: "Seasons",
      },
      mutations: {
        create: {
          success: 'New season "%{name}" was created',
          error: "Cant create seasons: %{error}",
        },
        edit: {
          success: "Season was updated",
          error: "Cant update season: %{error}",
        },
        list: {
          success: 'Season "%{name}" was successfully updated',
          error: "Cant update season: %{error}",
        },
      },
    },
    "media_content/video/seasons/:seasonId/episodes": {
      name: "Episodes",
      titles: {
        create: "New Episode",
        edit: "Edit Episode",
        list: "Episodes",
      },
      mutations: {
        create: {
          success: 'New episode "%{name}" was created',
          error: "Cant create episodes: %{error}",
        },
        edit: {
          success: "Episode was updated",
          error: "Cant update episode: %{error}",
        },
      },
    },
    "media_content/tv/channels/channel_versions/:channelVersionId/:epgSourceId/:startAt/program_events":
      {
        name: "Program events",
        titles: {
          create: "New program event",
          edit: "Edit Program event",
          list: "Program events",
        },
      },
    "media_content/tv/channels/channels": {
      name: "TV channels",
      menu_name: "Television",
      titles: {
        create: "New TV channel",
        edit: "Edit TV channel",
        list: "Television",
      },
      mutations: {
        create: {
          success: 'New channel "%{name}" was created',
          error: "Cant create channel: %{error}",
        },
        edit: {
          success: "Channel was updated",
          error: "Cant update channel: %{error}",
        },
        list: {
          success: 'Channel "%{name}" was successfully updated',
          error: "Cant update channel: %{error}",
        },
      },
    },
    "media_content/tv/channels/channels/:channelId/channel_versions": {
      name: "Channel versions",
      titles: {
        create: "New channel version",
        edit: "Edit channel version",
        list: "Channel versions",
      },
      mutations: {
        create: {
          success: 'New channel version "%{name}" was created',
          error: "Cant create channel version: %{error}",
        },
        edit: {
          success: "Channel version was updated",
          error: "Cant update channel version: %{error}",
        },
        list: {
          success: 'Channel version "%{name}" was successfully updated',
          error: "Cant update channel version: %{error}",
        },
      },
    },
    "media_content/tv/channels/live_streams": {
      name: "TV streams",
      titles: {
        create: "New TV stream",
        edit: "Edit TV stream",
        list: "Television",
      },
      mutations: {
        create: {
          success: 'New TV stream "%{name}" was created',
          error: "Cant create TV stream: %{error}",
        },
        edit: {
          success: "TV stream was updated",
          error: "Cant update TV stream: %{error}",
        },
        list: {
          success: 'TV stream "%{name}" was successfully updated',
          error: "Cant update TV stream: %{error}",
        },
      },
    },
    "media_content/tv/channels/blackouts": {
      name: "Blackouts",
      titles: {
        create: "New blackout",
        edit: "Edit blackout",
        list: "Television",
        show: "Blackout",
      },
      mutations: {
        create: {
          success: "New blackout was created",
          error: "Cant create blackout: %{error}",
        },
        edit: {
          success: "Blackout was updated",
          error: "Cant update blackout: %{error}",
        },
        list: {
          success: "Blackout was successfully updated",
          error: "Cant update blackout: %{error}",
        },
      },
    },
    "media_content/tv/channels/channel_positions_overrides": {
      name: "Overrides",
      titles: {
        create: "New override",
        edit: "Edit override",
        list: "Television",
        show: "Override",
      },
      mutations: {
        create: {
          success: "New override was created",
          error: "Cant create override: %{error}",
        },
        edit: {
          success: "Override was updated",
          error: "Cant update override: %{error}",
        },
        list: {
          success: "Override was successfully updated",
          error: "Cant update override: %{error}",
        },
      },
    },
    "media_content/tv/tv_shows/epg_sources": {
      name: "EPG Sources",
      titles: {
        create: "New EPG source",
        edit: "Edit EPG source",
        list: "TV shows",
      },
      mutations: {
        create: {
          success: 'New EPG source "%{name}" was created',
          error: "Cant create EPG source: %{error}",
        },
        edit: {
          success: "EPG source was updated",
          error: "Cant update EPG source: %{error}",
        },
        list: {
          success: 'EPG source "%{name}" was successfully updated',
          error: "Cant update EPG source: %{error}",
        },
      },
    },
    "media_content/tv/tv_shows/tv_programs": {
      name: "TV programs",
      titles: {
        create: "New TV program",
        edit: "Edit TV program",
        list: "TV shows",
      },
      mutations: {
        create: {
          success: 'New TV program "%{name}" was created',
          error: "Cant create TV program: %{error}",
        },
        edit: {
          success: "TV program was updated",
          error: "Cant update TV program: %{error}",
        },
        list: {
          success: 'TV program "%{name}" was successfully updated',
          error: "Cant update TV program: %{error}",
        },
      },
    },
    "media_content/tv/tv_shows/epg_local_events": {
      name: "TV show",
      titles: {
        create: "New TV show",
        edit: "Edit TV show",
        list: "TV shows",
      },
      mutations: {
        create: {
          success: 'New TV show "%{name}" was created',
          error: "Cant create TV show: %{error}",
        },
        edit: {
          success: "TV show was updated",
          error: "Cant update TV show: %{error}",
        },
        list: {
          success: 'TV show "%{name}" was successfully updated',
          error: "Cant update TV show: %{error}",
        },
      },
    },
    "media_content/attributes/providers/right_holders": {
      name: "Right Holders",
      titles: {
        create: "New Right Holder",
        edit: "Edit Right Holder",
        list: "Attributes",
      },
    },
    channel_versions: {
      name: "Channel Versions",
      titles: {
        create: "Create Channel Version",
        edit: "Create Channel Version",
        list: "Channel Versions",
      },
    },
    roles: {
      name: "Role",
      data: {
        admin: "Admin",
        partner: "Partner",
      },
    },
  },
};
