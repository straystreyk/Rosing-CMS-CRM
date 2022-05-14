import { GET_ONE_MOVIE_NAME } from "./custom-requests";

export const moviesLinks = [
  {
    name: "Movies",
    href: "/media_content/video/movies",
  },
  {
    name: "New movie",
    href: "/media_content/video/movies/create",
  },
  {
    name: "",
    href: "/media_content/video/movies/:id",
    query: GET_ONE_MOVIE_NAME,
    dynamicParam: "id",
  },
];
