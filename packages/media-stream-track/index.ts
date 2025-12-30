function uuid() {
  return [
    Math.random().toString(16).substring(2, 10),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 14)
  ].join('-');
}

type BooleanFlags<T> = {
  [P in keyof T]: boolean;
};

type MediaTrackSettings = {
  width?: number;
  height?: number;
  aspectRation?: number;
  frameRate?: number;
  facingMode?: string;
  resizeMode?: string;
  sampleRate?: number;
  sampleSize?: number;
  echoCancellation?: boolean | string;
  autoGainControl?: boolean;
  noiseSuppresssion?: boolean;
  latency?: number;
  channelCount?: number;
  deviceId?: string;
  groupId?: string;
  backgroundBlur?: boolean;
};

type MediaTrackCapabilities = BooleanFlags<MediaTrackSettings>;

type Constrain<T> = {
  exact: T;
  ideal: T;
};

type Range = {
  max: number;
  min: number;
};

type ConstrainBoolean<T = boolean> = Constrain<T> | T;

type ConstrainDOMString<T = string> = Constrain<T> | T;

type ConstrainULong<T = number> = (Constrain<T> & Range) | T;

type ConstrainDouble<T = number> = (Constrain<T> & Range) | T;

type AnyConstraints = {
  deviceId: ConstrainDOMString;
  groupId: ConstrainDOMString;
};

type AudioConstraints = {
  autoGainControl: ConstrainBoolean;
  channelCount: ConstrainULong;
  echoCancellation: ConstrainBoolean | ConstrainDOMString;
  latency: ConstrainDouble;
  noiseSuppresssion: ConstrainBoolean;
  sampleRate: ConstrainULong;
  sampleSize: ConstrainULong;
  volume: ConstrainDouble;
};

type PointOfInterest = {
  x: number;
  y: number;
};

type ImageConstraints = {
  whiteBalanceMode: 'none' | 'manual' | 'single-shot' | 'continuous';
  exposureMode: 'none' | 'manual' | 'single-shot' | 'continuous';
  focusMode: 'none' | 'manual' | 'single-shot' | 'continuous';
  pointOfInterest: PointOfInterest | PointOfInterest[];
  exposureCompensation: ConstrainDouble;
  colorTemperature: ConstrainDouble;
  iso: ConstrainDouble;
  brightness: ConstrainDouble;
  contrast: ConstrainDouble;
  sharpness: ConstrainDouble;
  focusDistance: ConstrainDouble;
  zoom: ConstrainDouble;
  torch: boolean;
};

type VideoConstraints = {
  aspectRatio: ConstrainDouble;
  facingMode: ConstrainDOMString;
  frameRate: ConstrainDouble;
  height: ConstrainULong;
  width: ConstrainULong;
  resizeMode: ConstrainDOMString<'crop-and-scale' | 'none'>;
};

type ScreenShareConstraints = {
  displaySurface: ConstrainDOMString<'browser' | 'monitor' | 'window'>;
  logicalSurface: ConstrainBoolean;
  suppressLocalAudioPlayback: ConstrainBoolean;
  restrictOwnAudio: ConstrainBoolean;
};

type MediaTrackConstraints = AnyConstraints &
  (
    | AudioConstraints
    | ImageConstraints
    | VideoConstraints
    | ScreenShareConstraints
  );

export class MediaStreamTrack extends EventTarget {
  contentHint:
    | ''
    | 'speech'
    | 'speech-recognition'
    | 'music'
    | 'motion'
    | 'detail'
    | 'text';
  enabled: boolean;
  id: string;
  kind: 'audio' | 'video';
  label: string;
  muted: boolean;
  readyState: 'live' | 'ended';
  oncapturehandlechange: null;
  onended: null;
  onmute: null;
  onunmute: null;

  constructor() {
    super();

    this.contentHint = '';
    this.enabled = true;
    this.id = uuid();
    this.kind = 'audio';
    /* OneOf "Internal microphone" | "External USB Webcam" */
    this.label = '';
    this.muted = false;
    this.readyState = 'live';
    this.oncapturehandlechange = null;
    this.onended = null;
    this.onmute = null;
    this.onunmute = null;
  }

  applyConstraints(constraints: MediaTrackConstraints) {
    if (this.readyState === 'ended') {
      return Promise.resolve();
    }
  }

  clone() {}

  getCapabilities(): MediaTrackCapabilities {
    return {
      width: true,
      height: true,
      aspectRation: true,
      frameRate: true,
      facingMode: true,
      resizeMode: true,
      sampleRate: true,
      sampleSize: true,
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppresssion: true,
      latency: true,
      channelCount: true,
      deviceId: true,
      groupId: true,
      backgroundBlur: true
    };
  }

  getConstraints() {}

  getSettings(): MediaTrackSettings | void {}

  stop() {
    this.readyState = 'ended';
  }
}
