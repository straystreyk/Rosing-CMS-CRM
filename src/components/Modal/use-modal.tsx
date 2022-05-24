import React from "react";

type useModalType = (
  handleOpenFunc?: () => void,
  handleCloseFunc?: () => void
) => {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

export const useModalMUI: useModalType = (handleOpenFunc, handleCloseFunc) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (handleOpenFunc) {
      handleOpenFunc();
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (handleCloseFunc) {
      handleCloseFunc();
    }
  };

  return {
    handleClose,
    handleOpen,
    open,
  };
};
