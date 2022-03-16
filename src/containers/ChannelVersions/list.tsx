import * as React from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Error } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

import { GET_ALL_CHANNEL_VERSIONS } from "./requests";
import { authClient } from "../../components/Providers";

const useStyles = makeStyles({
  ChannelVersionsWrapper: {
    marginTop: 30,
  },
  ChannelVersionForm: {
    "& .MuiCardContent-root": {
      padding: "0px 10px",
    },
  },
  ChannelVersionEdit: {
    paddingTop: 10,
    background: "#F0F8FF",
    "& > div": {
      marginTop: 0,
    },
    "& .MuiPaper-root": {
      background: "#F0F8FF",
    },
  },
  ChannelVersionName: {
    padding: "20px 10px",
    backgroundColor: "#F2F7FB",
    fontWeight: 600,
  },
  ChannelVersion: {
    marginBottom: 20,
    cursor: "pointer",
    transition: "0.15s all ease",
    "&:hover": {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
    },
  },
});

const ChannelVersion = (props: any) => {
  const [show, setShow] = React.useState(false);
  const channelVersion = React.useRef(null);
  const styles = useStyles();

  return <div className={cn(styles.ChannelVersion, show && "active")}></div>;
};

export const ChannelVersionsList = (props: any) => {
  const { loading, error, data } = useQuery(GET_ALL_CHANNEL_VERSIONS, {
    client: authClient,
    variables: { channelId: props.id },
  });
  const styles = useStyles();

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  if (error) return <Error error={error} />;

  const { allChannelVersions } = data;

  if (!allChannelVersions.length) {
    return <div>У этого канала пока нет версий каналов</div>;
  }

  return (
    <div className={styles.ChannelVersionsWrapper}>
      {allChannelVersions.map((el: any) => {
        return <ChannelVersion key={el.id} el={el} {...props} />;
      })}
    </div>
  );
};
