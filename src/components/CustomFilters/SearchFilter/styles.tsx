import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";

export const SearchFilterStyles: any = {
  SearchFilterWrapper: {
    display: "flex",
    marginBottom: 16,
    position: "relative",
  },
  SearchInput: {
    width: "100%",
    outline: "none",
    border: "1px solid var(--secondary-color-default)",
    borderLeft: "none",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    fontFamily: "var(--font-family)",
    fontSize: 14,
    padding: "8px 30px 8px 12px",
    color: "var(--primary-text-default)",
    "&::placeholder": {
      color: "var(--secondary-color-default)",
    },
  },
  SelectInput: {
    border: "1px solid var(--secondary-color-default)",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: 200,
    "& .MuiInputBase-root": {
      fontSize: 14,
      height: "100%",
      fontFamily: "var(--font-family)",
      color: "var(--secondary-color-default)",

      "&::before": {
        display: "none",
      },
      "& .MuiSelect-root": {
        padding: "8px 24px 8px 8px",
        "&:focus": {
          backgroundColor: "unset",
        },
      },
      "&::after": {
        display: "none",
      },
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.xs})`]: {
      width: 30,
      "& .MuiInputBase-root": {
        color: "transparent",
      },
    },
  },
  Icon: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    "& button": { display: "flex" },
  },
};

export const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5937 7.40759L7.39648 12.6048M12.6028 12.5918L7.40562 7.39453"
      stroke="#9FA5A8"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);
