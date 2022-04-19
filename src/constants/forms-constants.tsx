import { SelectItemsTypes } from "../types";

export const CreateIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.42416e-07 8.00002C6.11003e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8.00002C16 3.58174 12.4183 1.82251e-05 8 1.80565e-05C3.58172 1.82251e-05 4.42416e-07 3.58174 4.42416e-07 8.00002ZM12.25 8.68943C12.6366 8.68943 12.95 8.37603 12.95 7.98943C12.95 7.60283 12.6366 7.28943 12.25 7.28943H8.75837L8.75837 3.74979C8.75837 3.36319 8.44497 3.04979 8.05837 3.04979C7.67177 3.04979 7.35837 3.36319 7.35837 3.74979V7.28943L3.75 7.28943C3.3634 7.28943 3.05 7.60283 3.05 7.98943C3.05 8.37603 3.3634 8.68943 3.75 8.68943H7.35837L7.35837 12.2498C7.35837 12.6364 7.67177 12.9498 8.05837 12.9498C8.44497 12.9498 8.75837 12.6364 8.75837 12.2498V8.68943H12.25Z"
      fill={color ?? "ffffff"}
    />
  </svg>
);

export const selectedItems: SelectItemsTypes[] = [
  {
    name: "Poster",
    value: "poster",
  },
  {
    name: "Banner small",
    value: "banner_small",
  },
  {
    name: "Banner Wide",
    value: "banner_wide",
  },
  {
    name: "Card Preview",
    value: "card_preview",
  },
  {
    name: "Preview",
    value: "preview",
  },
];

export const INPUT_LABEL_PROPS = {
  shrink: true,
};

export const SELECT_MARKERS = [
  { id: "popular", name: "popular" },
  { id: "free", name: "free" },
  { id: "featured", name: "featured" },
];

export const SELECT_PLATFORMS = [
  { id: "ios", name: "IOS" },
  { id: "android", name: "Android" },
];

export const SELECT_DISTRIBUTION = [
  { id: "free", name: "Free" },
  { id: "paid", name: "Paid" },
  { id: "freemium", name: "Freemium" },
];

export const EXTRA_VIDEO_TYPES = [
  { id: "teaser", name: "teaser" },
  { id: "trailer", name: "trailer" },
];

export const PUBLISHED_CHOICES_FORM = [
  { name: "Not published", id: false },
  { name: "Published", id: true },
];
