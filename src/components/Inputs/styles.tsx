import * as React from "react";

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
}> = ({ emptyText, tag: Tag = "span" }) => <Tag className="empty">{emptyText}</Tag>;
