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
    news: {
      name: "News",
      titles: {
        create: "New News",
        edit: "Edit News",
        list: "News",
      },
    },
    "media_content/video/movies": {
      name: "Movies",
      menu_name: "Video",
      titles: {
        create: "New Movie",
        edit: "Edit Movie",
        list: "Movies",
      },
      mutations: {
        create: {
          success: 'New movie "%{name}" was created',
          error: "Cant create movie: %{error}",
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
      name: "Radio Stations",
      titles: {
        create: "New Radio Station",
        edit: "Edit Radio Station",
        list: "Radio Stations",
      },
    },
    audio_shows: {
      name: "Audio Shows",
      titles: {
        create: "New Audio Show",
        edit: "Edit Audio Show",
        list: "Audio Shows",
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
        list: "Video files",
      },
      mutations: {
        create: {
          success: 'New video file "%{name}" was created',
          error: "Cant create video file: %{error}",
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
        list: "Series",
      },
      mutations: {
        create: {
          success: 'New series "%{name}" was created',
          error: "Cant create series: %{error}",
        },
      },
    },
    "media_content/video/seasons": {
      name: "Seasons",
      titles: {
        create: "New Season",
        edit: "Edit Season",
        empty: "No seasons yet",
        list: "Seasons",
      },
      mutations: {
        create: {
          success: "Seasons was created",
          error: "Cant create seasons: %{error}",
        },
      },
    },
    episodes: {
      name: "Episodes",
      titles: {
        create: "New Episode",
        edit: "Edit Episode",
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
