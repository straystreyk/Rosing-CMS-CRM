import * as React from "react";
import { SpbtvHtml5Player } from "../../types/global";
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
  const playerDiv = React.useRef<HTMLDivElement | null>(null);
  const classes = useStyles();

  React.useEffect(() => {
    if (playerDiv.current) {
      setPlayer(() =>
        spbtvplayer(playerDiv.current!.id, {
          streamOpts: {
            autoplay: true,
          },
        })
      );
    }
  }, [setPlayer, playerDiv.current]);

  if (player) {
    player.afterInitialize(() => {
      player.attachSource(streamUrl, {});
    });
  }

  return (
    <div className={classes.Player} ref={playerDiv} id="playerID" style={{ height: "36vw" }} />
  );
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

  return loading ? (
    <MainLoader size={50} flex centered />
  ) : (
    <UnsafeSPBTVPlayer streamUrl={data.stream.url} />
  );
};
