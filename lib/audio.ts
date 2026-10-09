'use client'

let audioCtx: AudioContext | null = null

function ctx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function noise(duration: number, vol = 0.3) {
  const c = ctx()
  const size = c.sampleRate * duration
  const buf = c.createBuffer(1, size, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / size)
  const src = c.createBufferSource()
  src.buffer = buf
  const gain = c.createGain()
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  const filt = c.createBiquadFilter()
  filt.type = 'bandpass'
  filt.frequency.value = 2000
  src.connect(filt).connect(gain).connect(c.destination)
  src.start()
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.15) {
  const c = ctx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime)
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain).connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

function chord(freqs: number[], duration: number, type: OscillatorType = 'triangle') {
  freqs.forEach((f) => tone(f, duration, type, 0.08))
}

// ─── Public API ──────────────────────────────────────────────

export function playShutter() {
  noise(1.2, 0.4)
  setTimeout(() => noise(0.6, 0.2), 400)
}

export function playJingle() {
  // Percussive clicks
  for (let i = 0; i < 8; i++) {
    setTimeout(() => tone(800 + i * 200, 0.06, 'square', 0.06), i * 350)
  }
  // Warm pad
  setTimeout(() => {
    chord([261.63, 329.63, 392.00, 523.25], 2.5, 'triangle') // C major
    setTimeout(() => chord([293.66, 369.99, 440.00, 587.33], 2.0, 'sine'), 1800) // D major
  }, 400)
}

export function playTick() {
  tone(1800, 0.03, 'square', 0.04)
}

export function playSuccess() {
  setTimeout(() => tone(523.25, 0.15, 'sine', 0.1), 0)
  setTimeout(() => tone(659.25, 0.2, 'sine', 0.12), 120)
}
