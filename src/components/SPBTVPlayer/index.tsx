import * as React from "react";
import { SpbtvHtml5Player } from "../../global";
import { MainLoader } from "../MainLoader";
import { loadPlayerAssets, gePlayerAssetsLoaded } from "../../helpers";
import { makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { authClient } from "../Providers";
import { GET_STREAM } from "./requests";

const useStyles = makeStyles({
  Player: {
    marginTop: 30,
    marginBottom: 30,
  },
});

const UnsafeSPBTVPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const [player, setPlayer] = React.useState<SpbtvHtml5Player | null>(null);
  const classes = useStyles();
  React.useEffect(() => {
    setPlayer(() =>
      spbtvplayer("playerID", {
        streamOpts: {
          autoplay: true,
        },
      })
    );
  }, [player, setPlayer]);

  if (player) {
    player.attachSource(streamUrl, {});
  }
  return <div className={classes.Player} id="playerID" style={{ height: "36vw" }}></div>;
};

export const SPBTVPlayer: React.FC<{ streamSourceId: string }> = ({ streamSourceId }) => {
  const [loaded, updateLoaded] = React.useState(gePlayerAssetsLoaded);

  const { loading, error, data } = useQuery(GET_STREAM, {
    client: authClient,
    variables: { resourceId: streamSourceId, protocol: "dash" },
  });

  React.useEffect(() => {
    if (loaded) return;
    let disposed = false;
    loadPlayerAssets().then(() => {
      if (!disposed) updateLoaded(true);
    });
    return () => {
      disposed = true;
    };
  }, [loaded]);

  if (error) return <>error</>;

  return !loaded || loading ? (
    <MainLoader size={50} flex centered />
  ) : (
    <UnsafeSPBTVPlayer streamUrl={data.stream.url} />
  );
};
