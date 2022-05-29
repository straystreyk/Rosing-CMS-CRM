import * as React from "react";
import { makeStyles, Fade, Backdrop, Modal } from "@material-ui/core";

import { ModalStyles } from "./styles";
import cn from "classnames";

const useStyles = makeStyles(ModalStyles);

interface ModalMuiProps {
  open: boolean;
  handleClose: () => void;
  title?: string | React.ReactElement;
  description?: string | React.ReactElement;
  offExitIcon?: boolean;
  classNamesOverrides?: {
    ModalOverride?: string;
    PaperOverride?: string;
  };
}

const ExitIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.1884 4.81518L4.79395 15.2096M15.2067 15.1835L4.81221 4.78906"
      stroke="#0F1F26"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export const ModalMUI: React.FC<ModalMuiProps> = ({
  children,
  handleClose,
  open,
  title,
  description,
  classNamesOverrides,
  offExitIcon,
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
            {!offExitIcon && (
              <button className={classes.ExitIcon} onClick={handleClose}>
                <ExitIcon />
              </button>
            )}
            {title && (
              <div className={classes.ModalTitleWrapper}>
                <div className={classes.ModalTitle}>{title}</div>
                {description && <div className={classes.ModalDescription}>{description}</div>}
              </div>
            )}
            <div className={classes.PaperContent}>{children}</div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};
