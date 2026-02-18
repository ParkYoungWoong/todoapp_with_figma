import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggle: () => void
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialTheme: Theme = prefersDark ? 'dark' : 'light'
applyTheme(initialTheme)

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: initialTheme,
      toggle: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        set({ theme: next })
      }
    }),
    {
      name: 'theme-store',
      onRehydrateStorage: () => state => {
        if (state) applyTheme(state.theme)
      }
    }
  )
)
