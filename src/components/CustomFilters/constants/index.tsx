import { IconProps } from "../../../constants/icons";

export const EXTRA_VIDEO_CHOICES = [
  { name: "With extra videos", value: true },
  { name: "Without extra videos", value: false },
];

export const DOWNLOADABLE_CHOICES = [
  { name: "Downloadable", value: true },
  { name: "Undownloadable", value: false },
];

export const PUBLISHED_CHOICES = [
  { name: "Published", value: true },
  { name: "Unpublished", value: false },
];

export const MARKERS_CHOICES = [
  { value: "popular", name: "Popular" },
  { value: "free", name: "Free" },
  { value: "featured", name: "Featured" },
];

export const ArrowFilterIcon = ({ color }: IconProps) => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.61621 0.691913L3.99992 3.30821L1.38379 0.691895"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export const DeleteFilterIcon = ({ color }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.35" stroke="#005AA3" strokeWidth="1.3" />
    <line
      x1="7.15459"
      y1="7.33008"
      x2="12.67"
      y2="12.8455"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <line
      x1="12.7158"
      y1="7.20049"
      x2="7.20039"
      y2="12.7159"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);
