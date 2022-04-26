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
    questions: {
      name: "Questions",
      titles: {
        create: "New Question",
        edit: "Edit Question",
        list: "Questions",
      },
      fields: {
        name: "Name",
      },
    },
    genres: {
      name: "Genres",
      titles: {
        create: "New Genre",
        edit: "Edit Genre",
        list: "Genres",
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
    channels: {
      name: "Channels",
      titles: {
        create: "New Channel",
        edit: "Edit Channel",
        list: "Channels",
      },
      filtersLabels: {
        published: "published",
        markers: "markers",
      },
    },
    right_holders: {
      name: "Right Holders",
      titles: {
        create: "New Right Holder",
        edit: "Edit Right Holder",
        list: "Right Holders",
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
