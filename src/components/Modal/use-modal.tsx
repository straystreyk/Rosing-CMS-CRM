import React from "react";

type useModalType = (handleOpenFunc?: () => void) => {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

export const useModalMUI: useModalType = (handleOpenFunc) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (handleOpenFunc) {
      handleOpenFunc();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    handleClose,
    handleOpen,
    open,
  };
};
