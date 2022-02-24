import React from "react";
import { useTranslate } from "react-admin";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Breadcrumbs } from "../Breadcrumbs/breadcrumbs";

export type TitleProps = {
  name: string;
  form: string;
  id?: string;
};

const useStyles = makeStyles({
  flex: {
    display: "flex",
    alignItems: "center",
  },
  titleWrapper: {
    backgroundColor: "#F2F7FB",
    padding: "16px 24px",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: "32px",
    display: "flex",
    justifyContent: "space-between",
  },
  helpWrapper: {
    display: "flex",
    alignItems: "center",
  },
  help: {
    fontSize: 14,
    color: "#00A991",
    lineHeight: "20px",
    marginTop: 2,
    marginLeft: 7,
  },
  backIcon: {
    marginRight: 10,
    cursor: "pointer",
  },
});

export const ResourceTitle: React.FC<TitleProps> = ({ name, form }) => {
  const translate = useTranslate();
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.titleWrapper}>
      <Box className={classes.title}>
        <Box className={classes.flex}>
          {/*{form !== "list" ? (*/}
          {/*  <span className={classes.backIcon} onClick={() => history.goBack()}>*/}
          {/*    <svg*/}
          {/*      width="16"*/}
          {/*      height="12"*/}
          {/*      viewBox="0 0 16 12"*/}
          {/*      fill="none"*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        d="M15 6.0106H1M5.53144 1.47656L1.01942 5.98858M5.51516 10.5233L1.00315 6.01124"*/}
          {/*        stroke="#0F1F26"*/}
          {/*        strokeWidth="1.3"*/}
          {/*        strokeLinecap="round"*/}
          {/*      />*/}
          {/*    </svg>*/}
          {/*  </span>*/}
          {/*) : null}*/}
          {translate(["resources", name, "titles", form].join("."))}
        </Box>
        <Box className={classes.helpWrapper}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.1139 6.51537C11.1139 5.9402 10.6107 5.43692 10.0355 5.43692C9.46032 5.43692 8.95705 5.9402 8.95705 6.51537C8.95705 7.09054 9.38842 7.59382 10.0355 7.59382C10.6826 7.59382 11.1139 7.09054 11.1139 6.51537ZM8.81794 14.5611H11.5832C11.998 14.5611 12.2745 14.3654 12.2745 13.9739C12.2745 13.5824 11.998 13.3214 11.5832 13.3214H11.0301C10.961 13.3214 10.8919 13.2562 10.8919 13.1909V10.059C10.8919 9.34131 10.2697 8.75408 9.50925 8.75408H8.81794C8.40315 8.75408 8.12662 9.01507 8.12662 9.40656C8.12662 9.79804 8.40315 10.059 8.81794 10.059H9.37099C9.44012 10.059 9.50925 10.1243 9.50925 10.1895V13.1257C9.50925 13.1909 9.44012 13.2562 9.37099 13.2562H8.81794C8.40315 13.2562 8.12662 13.5171 8.12662 13.9086C8.12662 14.3001 8.40315 14.5611 8.81794 14.5611ZM1.99951 10C1.99951 5.59817 5.59811 1.99957 9.99994 1.99957C14.4018 1.99957 18.0004 5.59817 18.0004 10C18.0004 14.4018 14.4018 18.0004 9.99994 18.0004C5.59811 18.0004 1.99951 14.4018 1.99951 10ZM9.99994 3.39957C6.3713 3.39957 3.39951 6.37136 3.39951 10C3.39951 13.6286 6.3713 16.6004 9.99994 16.6004C13.6286 16.6004 16.6004 13.6286 16.6004 10C16.6004 6.37136 13.6286 3.39957 9.99994 3.39957Z"
              fill="#00A991"
            />
          </svg>
          <span className={classes.help}>Справка</span>
        </Box>
      </Box>
      {form !== "list" ? <Breadcrumbs /> : ""}
    </div>
  );
};
