const KEY = 'fekrino-settings'

const defaults = {
  theme: 'dark',       // 'dark' | 'light' | 'auto'
  fontSize: 'medium',  // 'small' | 'medium' | 'large'
  reduceMotion: false,
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

export function saveSettings(settings) {
  localStorage.setItem(KEY, JSON.stringify(settings))
  applySettings(settings)
}

export function applySettings(settings) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const shouldBeDark =
    settings.theme === 'dark' ||
    (settings.theme === 'auto' && prefersDark)

  root.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light')
  root.setAttribute('data-font', settings.fontSize)
  root.setAttribute('data-motion', settings.reduceMotion ? 'reduced' : 'normal')
}

export function resetSettings() {
  localStorage.removeItem(KEY)
  applySettings(defaults)
  return defaults
}