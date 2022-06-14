import { MEDIA_QUERIES_BREAKPOINTS, ShowEditButton } from "../../constants/style-constants";

export const ImageUploaderStyles: any = {
  ImagesWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    marginBottom: 16,
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  ImageItemWrapper: {
    "& button": {
      textTransform: "unset",
      outline: "none",
      border: "none",
      fontFamily: "var(--font-family)",
    },
  },
  PaperOverride: {
    width: "auto",
    height: "auto",
    maxHeight: "80vh",
    maxWidth: "80vw",
    display: "flex",
    position: "relative",
    overflow: "visible",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  ModalOverride: {},
  ImageItem: {
    marginTop: 8,
    border: "1px dashed var(--secondary-color-default)",
    height: 250,
    textAlign: "center",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    color: "var(--secondary-color-default)",
    fontSize: 14,
    padding: 15,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    "&:hover .PopupButtonWrapper": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  ImageItemChangeButton: {
    color: "var(--primary-button-default)",
    transition: "0.35s all ease",
    "&:hover": {
      color: "var(--primary-button-default)",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      "& svg path": {
        fill: "var(--primary-button-default)",
      },
    },
  },
  UploadWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .StandardButton": {
      marginTop: 10,
    },
  },
  ButtonsWrapper: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    "& > button:first-child": {
      color: "#D21C1C",
    },
    "& button": {
      marginRight: 5,
    },
  },
  ImageTitle: {
    display: "flex",
    alignItems: "center",
    "& > span:first-child": {
      fontWeight: 500,
      fontSize: 14,
      marginRight: 5,
    },
  },
  ImagesSection: {
    paddingTop: 16,
    position: "relative",
    "&:hover .ShowEditButton": {
      opacity: 1,
    },
  },
  ImagesInfo: {
    backgroundColor: "var(--primary-bg)",
    color: "var(--secondary-color-default)",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    padding: "24px 8px",
    lineHeight: "20px",
    "& > span:first-child": {
      color: "#005AA3",
      fontWeight: 500,
      marginBottom: 5,
    },
  },
  LoadingWrapper: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    fontWeight: 500,
    color: "var(--secondary-color-main)",
    zIndex: 1,
    "& > span": {
      marginLeft: 15,
      display: "inline-block",
    },
  },
  ImageUploaderShowButtons: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 10,
    "& button": {
      marginLeft: 8,
    },
  },
  PopupButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: 15,
    borderRadius: 5,
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    "& svg path": {
      transition: "0.35s all ease",
    },
    "&:hover": {
      "& svg path": {
        stroke: "var(--primary-focus)",
        fill: "var(--primary-focus)",
      },
    },
  },
  ImageSize: {
    color: "var(--secondary-color-default)",
    fontSize: 14,
  },
  PopupButtonWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 5,
    transition: "0.35s all ease",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(1px)",
    opacity: 0,
    pointerEvents: "none",
  },
  ShowEditButton,
};
