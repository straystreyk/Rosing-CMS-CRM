import { TranslationMessages } from "ra-core";
import russianMessages from "ra-language-russian";

export const ru: TranslationMessages = {
  ...russianMessages,
  pos: {
    search: "Поиск",
    configuration: "Конфигурация",
    language: "Язык",
    theme: {
      name: "Тема",
      light: "Светлая",
      dark: "Темная",
    },
    expandMenu: {
      mediaContent: "Медиа-контент",
    },
    filtersLabels: {
      published: "Опубликован",
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
    menu: {
      sales: "Sales",
      catalog: "Catalog",
      customers: "Customers",
    },
  },
  resources: {
    users: {
      name: "Пользователи",
      titles: {
        create: "Создание пользователя",
        edit: "Редактирование пользователя",
      },
      fields: {
        username: "Имя пользователя",
        lastName: "Фамилия",
        firstName: "Имя",
        phone: "Номер телефона",
        contactEmail: "Email",
        createdAt: "Дата создания",
      },
    },
    channels: {
      name: "Каналы",
      titles: {
        create: "Новый канал",
        edit: "Редактировать канал",
      },
      filtersLabels: {
        published: "Опубликовано",
        markers: "Маркеры",
      },
    },
    episodes: {
      name: "Эпизоды",
      titles: {
        create: "Новый эпизоды",
        edit: "Редактировать эпизод",
      },
    },
    datacenters: {
      name: "Дата-центр",
      titles: {
        create: "Новый дата-центр",
        edit: "Редактировать дата-центр",
      },
    },
    "media_content/attributes/providers/right_holders": {
      name: "Правообладатели",
      titles: {
        create: "Создать правообладателя",
        edit: "Редактировать правообладателя",
      },
    },
    series: {
      name: "Сериалы",
      titles: {
        create: "Новый сериал",
        edit: "Редактировать сериал",
      },
    },
    seasons: {
      name: "Сезоны",
      titles: {
        create: "Новый сезон",
        edit: "Редактировать сезон",
        empty: "Пока вы не добавили ни одного сезона",
      },
    },
    movies: {
      name: "Фильмы",
      titles: {
        create: "Новый фильм",
        edit: "Редактировать фильм",
      },
      fields: {
        name: "Название",
      },
    },
    video_files: {
      name: "Видеофайлы",
      titles: {
        create: "Новый видеофайлы",
        edit: "Редактировать видеофайл",
        list: "Видеофайлы",
      },
      filtersLabels: {
        name: "Имя",
        streamingUid: "StreamingUID",
        datacenterId: "Дата-центр",
        published: "Опубликовано",
      },
    },
    customers: {
      name: "Customer |||| Customers",
      fields: {
        commands: "Orders",
        first_seen: "First seen",
        groups: "Segments",
        last_seen: "Last seen",
        last_seen_gte: "Visited Since",
        name: "Name",
        total_spent: "Total spent",
        password: "Password",
        confirm_password: "Confirm password",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
        this_week: "This week",
        last_week: "Last week",
        this_month: "This month",
        last_month: "Last month",
        earlier: "Earlier",
        has_ordered: "Has ordered",
        has_newsletter: "Has newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identity",
        address: "Address",
        stats: "Stats",
        history: "History",
        password: "Password",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch: "The password confirmation is not the same as the password.",
      },
    },
    commands: {
      name: "Order |||| Orders",
      amount: "1 order |||| %{smart_count} orders",
      title: "Order %{reference}",
      fields: {
        basket: {
          delivery: "Delivery",
          reference: "Reference",
          quantity: "Quantity",
          sum: "Sum",
          tax_rate: "Tax Rate",
          total: "Total",
          unit_price: "Unit Price",
        },
        customer_id: "Customer",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        total_gte: "Min amount",
        status: "Status",
        returned: "Returned",
      },
    },
    invoices: {
      name: "Invoice |||| Invoices",
      fields: {
        date: "Invoice date",
        customer_id: "Customer",
        command_id: "Order",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        total_gte: "Min amount",
        address: "Address",
      },
    },
    products: {
      name: "Poster |||| Posters",
      fields: {
        category_id: "Category",
        height_gte: "Min height",
        height_lte: "Max height",
        height: "Height",
        image: "Image",
        price: "Price",
        reference: "Reference",
        stock_lte: "Low Stock",
        stock: "Stock",
        thumbnail: "Thumbnail",
        width_gte: "Min width",
        width_lte: "Max width",
        width: "Width",
      },
      tabs: {
        image: "Image",
        details: "Details",
        description: "Description",
        reviews: "Reviews",
      },
    },
    categories: {
      name: "Category |||| Categories",
      fields: {
        products: "Products",
      },
    },
    reviews: {
      name: "Review |||| Reviews",
      amount: "1 review |||| %{smart_count} reviews",
      relative_to_poster: "Review on poster",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected",
      },
    },
    segments: {
      name: "Segment |||| Segments",
      fields: {
        customers: "Customers",
        name: "Name",
      },
      data: {
        compulsive: "Compulsive",
        collector: "Collector",
        ordered_once: "Ordered once",
        regular: "Regular",
        returns: "Returns",
        reviewer: "Reviewer",
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
