/**
 * Audio engine — loads real audio files from /public/audio/ at runtime.
 *
 * Place your files in public/audio/:
 *   tick.mp3      — short click for every interaction
 *   success.mp3   — form submit / verification
 *   shutter.mp3   — shutter-gate open
 *   jingle.mp3    — gate "with sound" intro
 *
 * All functions are no-ops if the audio directory has no loaded files,
 * so the site works silently until you drop assets in.
 */

type SoundName = 'tick' | 'success' | 'shutter' | 'jingle'

const AUDIO_DIR = '/audio'

class AudioEngine {
  private cache: Partial<Record<SoundName, HTMLAudioElement>> = {}
  private loaded = false
  private muted = false

  async load() {
    if (this.loaded) return
    this.loaded = true

    const names: SoundName[] = ['tick', 'success', 'shutter', 'jingle']
    for (const name of names) {
      try {
        // Probe with HEAD so a missing file doesn't log a 404 per playback
        const res = await fetch(`${AUDIO_DIR}/${name}.mp3`, { method: 'HEAD' })
        if (!res.ok) continue
        const audio = new Audio(`${AUDIO_DIR}/${name}.mp3`)
        audio.preload = 'auto'
        this.cache[name] = audio
      } catch {
        // File doesn't exist yet — that's fine, calls are no-ops
      }
    }
  }

  play(name: SoundName) {
    if (this.muted) return
    const audio = this.cache[name]
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  setMuted(muted: boolean) {
    this.muted = muted
  }

  isMuted() {
    return this.muted
  }
}

export const audio = new AudioEngine()

// ─── Public API (same signatures, drop-in replacement) ────────

export function playTick() {
  audio.play('tick')
}

export function playSuccess() {
  audio.play('success')
}

export function playShutter() {
  audio.play('shutter')
}

export function playJingle() {
  audio.play('jingle')
}
