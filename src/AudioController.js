/**
 * Igloo.inc Audio Controller
 * 
 * Multi-track ambient mixer and procedural SFX player
 * based on Web Audio API and worker-assisted audio buffering.
 */

export class AudioController {
  constructor({ volume = 1.0, muted = true, basePath = "" } = {}) {
    this.basePath = basePath;
    this.masterVolume = volume;
    this.isMuted = muted;
    this.audioContext = null;
    this.buffers = new Map();
    this.activeSources = new Map();
    this.gainNodes = new Map();
    this.lastPlayTime = new Map();
  }

  init() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn("[AudioController] Web Audio API not supported.");
      return;
    }

    this.audioContext = new AudioCtx();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = this.isMuted ? 0 : this.masterVolume;
    this.masterGain.connect(this.audioContext.destination);

    // Resume AudioContext on first user interaction
    const unlock = () => {
      if (this.audioContext && this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      const now = this.audioContext.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.masterVolume,
        now + 0.3
      );
    }
    return this.isMuted;
  }

  async loadBuffer(name, filename) {
    if (this.buffers.has(name)) return this.buffers.get(name);

    const url = `${this.basePath}/assets/audio/${filename}`;
    const resp = await fetch(url);
    const arrayBuffer = await resp.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.buffers.set(name, audioBuffer);
    return audioBuffer;
  }

  async playTrack(name, filename, { volume = 1.0, loop = false, fadeIn = 0.5 } = {}) {
    if (!this.audioContext) this.init();
    const buffer = await this.loadBuffer(name, filename);

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(fadeIn > 0 ? 0.001 : volume, this.audioContext.currentTime);
    if (fadeIn > 0) {
      gainNode.gain.exponentialRampToValueAtTime(volume, this.audioContext.currentTime + fadeIn);
    }

    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    source.start(0);

    this.activeSources.set(name, source);
    this.gainNodes.set(name, gainNode);
    return source;
  }

  playSFX(name, filename, { volume = 0.5, minInterval = 0.1 } = {}) {
    if (!this.audioContext) return;
    const now = performance.now();
    const last = this.lastPlayTime.get(name) || 0;
    if (now - last < minInterval * 1000) return;
    this.lastPlayTime.set(name, now);

    this.loadBuffer(name, filename).then((buffer) => {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(this.masterGain);
      source.start(0);
    });
  }

  fadeTrack(name, targetVolume, duration = 0.5) {
    const gainNode = this.gainNodes.get(name);
    if (!gainNode || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.linearRampToValueAtTime(targetVolume, now + duration);
  }
}
