import * as React from "react";
export const scrollToErrorInput: (offset?: number) => void = (offset = 0) => {
  const errors = document.querySelectorAll(".MuiInputBase-root.Mui-error");
  if (errors.length) {
    const top = errors[0].getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};
