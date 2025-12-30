import { MediaStreamTrack } from '@mocks/media-stream-track';

const trackSet: Record<string, MediaStreamTrack> = {};

function uuid() {
  return [
    Math.random().toString(16).substring(2, 10),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 6),
    Math.random().toString(16).substring(2, 14)
  ].join('-');
}

type Track = InstanceType<typeof MediaStreamTrack>;
type TrackList = Track[];
type Handler = (e: Event) => void;

export class MediaStream extends EventTarget {
  active: boolean;
  id: string;
  onactive: null;
  onaddtrack: Handler | null;
  oninactive: null;
  onremovetrack: Handler | null;

  constructor(streamOrTracks: MediaStream | TrackList) {
    super();

    this.active = true;
    this.id = uuid();
    this.onactive = null;
    this.onaddtrack = null;
    this.oninactive = null;
    this.onremovetrack = null;
  }

  addTrack(track: Track) {
    trackSet[uuid()] = track;

    let event = new Event('addtrack');

    this.dispatchEvent(event);

    if (typeof this.onaddtrack === 'function') {
      this.onaddtrack(event);
    }
  }

  clone() {
    return new MediaStream(this.getTracks());
  }

  getAudioTracks() {
    return (
      Object.values(trackSet).filter(track => track.kind === 'audio') ?? []
    );
  }

  getTrackById(id: string) {
    return trackSet[id];
  }

  getTracks() {
    return Object.values(trackSet) ?? [];
  }

  getVideoTracks() {
    return (
      Object.values(trackSet).filter(track => track.kind === 'video') ?? []
    );
  }

  removeTrack(track: Track) {
    delete trackSet[track?.id];

    let event = new Event('removetrack');

    this.dispatchEvent(event);

    if (typeof this.onremovetrack === 'function') {
      this.onremovetrack(event);
    }
  }
}
