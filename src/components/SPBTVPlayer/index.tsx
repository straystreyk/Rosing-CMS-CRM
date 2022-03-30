import * as React from "react";
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

interface SPBTVStreamOpts {
  autoplay?: boolean;
  posterUrl?: string | null;
  adConfig?: {
    url: string;
    preCount: number;
    showDisableAds: boolean;
    midRoll: {
      timeToFirst: number | null;
      timeToNext: number | null;
      count: number;
    };
  };
  metrics?: {
    apiHost?: string | null;
    apiUrl?: string | null;
    interval?: number;
    params?: {
      application_id?: string | null;
      application_version?: string | null;
      user_type?: string | null;
      user_id?: string | null;
      resource_uid?: string | null;
      resource_type?: string | null;
      watch_session_id?: string | null;
    };
  };
  drmConfig?: {
    widevine?: {
      proxy_url?: string;
    };
    fairplay?: {
      certificate_url?: string;
      ksm_url?: string;
      ksm_protocol?: "base64" | "binary";
    };
  };
}

interface SpbtvHtml5Player {
  mute: () => void;
  play: () => void;
  pause: () => void;
  unmute: () => void;
  destroy: () => void;
  getMuted: () => boolean;
  getVolume: () => number;
  getPaused: () => boolean;
  seek: (val: number) => void;
  setVolume: (val: number) => void;
  getDuration: () => number | undefined;
  getCurrentTime: () => number | undefined;
  getBufferLength: () => number | undefined;
  afterInitialize: (cb: () => void) => void;
  attachSource: (url: string, params: SPBTVStreamOpts) => void;
  addEventListener: (event: unknown, cb: () => void) => void;

  getZoomButtonVisible: () => boolean;
  getZoomModeEnabled: () => boolean;
  setZoomModeEnabled: (zoom: boolean) => void;
  getCurrentVideoInfo: () => { width: number; height: number; bitrate: number };
  getSelectionRange: () => { start: number; end: number };
  setSelectionStartPos: () => void;
  setSelectionEndPos: () => void;

  // live
  getIsLive: () => boolean;
  getTimeshiftAvailable: () => boolean;
  getAbsoluteCurrentTime: () => number;

  // video quality
  getPlayingVideoQuality: () => number;
  getSelectedVideoQuality: () => number;
  setSelectedVideoQuality: (value: number) => void;

  // audio tracks
  getCurrentAudioTrack: () => number;
  setCurrentAudioTrack: (index: number) => void;

  // ad
  getAdIsPlaying: () => boolean;
}

interface SpbtvPlayerOptions {
  adConfig?: {
    adNotification?: string;
    showDisableAds?: boolean;
  };
  controls?: {
    largePlayButton: boolean;
    bufferingSpinner: boolean;
    contextMenu: { enable: boolean };
  };
  uiConfig?: { hideControls?: boolean; focusAtInit?: boolean; autoshowToolbox?: boolean };
  playback?: { supportTimeshift?: boolean };
  features?: {
    drm?: boolean;
    ads?: boolean;
    heartbeat?: boolean;
    metrics?: boolean;
  };
  streamOpts?: SPBTVStreamOpts;
}

export interface SpbtvPlayerFn {
  (id: null, params: SpbtvPlayerOptions): void;
  (id: string, params: SpbtvPlayerOptions): SpbtvHtml5Player;
}

const UnsafeSPBTVPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const [player, setPlayer] = React.useState<SpbtvHtml5Player | null>(null);
  const classes = useStyles();
  React.useEffect(() => {
    setPlayer(() =>
      spbtvplayer("playerID", {
        uiConfig: {
          focusAtInit: false,
        },
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
