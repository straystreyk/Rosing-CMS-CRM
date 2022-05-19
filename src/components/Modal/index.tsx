import * as React from "react";
import { makeStyles, Fade, Backdrop, Modal } from "@material-ui/core";

import { ModalStyles } from "./styles";
import cn from "classnames";

const useStyles = makeStyles(ModalStyles);

interface ModalMuiProps {
  open: boolean;
  handleClose: () => void;
  title?: string | React.ReactNode | React.ReactElement;
  description?: string | React.ReactNode | React.ReactElement;
  classNamesOverrides?: {
    ModalOverride?: string;
    PaperOverride?: string;
  };
}

export const ModalMUI: React.FC<ModalMuiProps> = ({
  children,
  handleClose,
  open,
  title,
  description,
  classNamesOverrides,
}) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={cn(
          classes.Modal,
          classNamesOverrides &&
            classNamesOverrides.ModalOverride &&
            classNamesOverrides.ModalOverride
        )}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={cn(
              classes.Paper,
              classNamesOverrides &&
                classNamesOverrides.PaperOverride &&
                classNamesOverrides.PaperOverride
            )}
          >
            {title && <div>{title}</div>}
            {description && <div>{description}</div>}
            {children}
          </div>
        </Fade>
      </Modal>
    </>
  );
};
