import * as React from "react";

export const CommonInputStyles: {
  Input: React.CSSProperties;
  Hover: React.CSSProperties;
  Focus: React.CSSProperties;
  Disabled: React.CSSProperties;
  Error: React.CSSProperties;
  OffRAStyles: {};
} = {
  Input: {
    color: "var(--primary-text-default)",
    padding: "8px 12px",
    lineHeight: "20px",
    fontSize: 14,
    border: "1px solid var(--secondary-color-chevron)",
    borderRadius: 4,
    transition: "0.35s border ease, 0.35s color ease",
    backgroundColor: "#fff",
  },
  Hover: {
    borderColor: "var(--primary-text-default)",
  },
  Focus: {
    outline: "2px solid var(--primary-focus-2)",
    borderColor: "var(--additional-green-default)",
    outlineOffset: "2px",
  },
  Disabled: {
    opacity: 0.4,
  },
  Error: {
    borderColor: "var(--additional-red-default)",
  },
  OffRAStyles: {
    "&::before": {
      display: "none",
    },
    "&::after": {
      display: "none",
    },
    "&:hover": {
      background: "none",
    },
    "&:focus": {
      background: "none",
    },
    "&:focus-within": {
      background: "none",
    },
  },
};

export const labelStyles: any = {
  position: "static",
  transform: "none !important",
  transition: "none",
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  lineHeight: "20px",
  fontFamily: "var(--font-family)",
  display: "inline-block",
  color: "var(--secondary-color-main) !important",
};

export const formHelperText = {
  margin: 0,
  marginTop: 5,
  fontSize: 12,
  fontFamily: "var(--font-family)",
  color: "var(--secondary-color-default)",
  "&.Mui-error": {
    color: "var(--additional-red-default)",
  },
};

export const TextInputShowValue: any = {
  fontSize: 14,
  lineHeight: "20px",
  position: "relative",
  color: "var(--primary-text-default)",
  "& span.empty": {
    color: "var(--secondary-color-default)",
  },
};

export const EmptyInput: React.FC<{
  emptyText: string | React.ReactElement;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}> = ({ emptyText, tag: Tag = "span", className }) => (
  <Tag className={"empty" + " " + className}>{emptyText}</Tag>
);
