import { MEDIA_QUERIES_BREAKPOINTS, ShowEditButton } from "../../../constants/style-constants";
import { Styles } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";

export const EditInputComponentStyles: Styles<Theme, {}, string> = {
  ShowWrapper: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    paddingTop: 6,
    marginBottom: 6,
    borderBottom: "1px solid var(--secondary-color-disable)",
    paddingBottom: 12,
    "&:hover .ShowEditButton": {
      opacity: 1,
      pointerEvents: "all",
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`]: {
      "& .ShowEditButton": {
        opacity: 1,
        pointerEvents: "all",
      },
    },
  },
  ShowEditButtonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginLeft: 8,
    },
  },
  BorderOff: {
    border: "none",
  },
  ShowEditButton,
};
