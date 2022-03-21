export interface SPBTVStreamOpts {
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

export interface SpbtvHtml5Player {
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
  addEventListener: (event: SPBTV_HTML5_PLAYER_EVENT, cb: () => void) => void;
  removeEventListener: (event: SPBTV_HTML5_PLAYER_EVENT, cb: () => void) => void;

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
  getAbsoluteTimeRange: () => undefined | SpbtvPlayerAbsoluteTimeRange;

  // video quality
  getPlayingVideoQuality: () => number;
  getSelectedVideoQuality: () => number;
  setSelectedVideoQuality: (value: number) => void;
  getVideoQualityList: () => SpbtvHtml5PlayerVideoQuality[];

  // audio tracks
  getAudioTrackList: () => SpbtvPlayerAudioTrack[];
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
  uiConfig?: { hideControls: boolean; focusAtInit?: boolean; autoshowToolbox?: boolean };
  playback?: { supportTimeshift?: boolean };
  features?: {
    drm?: boolean;
    ads?: boolean;
    heartbeat?: boolean;
    metrics?: boolean;
  };
  streamOpts?: SPBTVStreamOpts;
}

interface SpbtvPlayerFn {
  (): {
    getProtocolAndDrm: (
      someParam: boolean,
      cb: (protocol: StreamProtocol, drm: DrmType) => void
    ) => void;
  };
  (id: null, params: SpbtvPlayerOptions): void;
  (id: string, params: SpbtvPlayerOptions): SpbtvHtml5Player;
}

export declare global {
  var _GLOBALS_: {
    REACT_APP_GRAPH_QL_ENDPOINT: string;
    REACT_APP_IMAGE_ENDPOINT: string;
  };

  var spbtvplayer: SpbtvPlayerFn;
}
