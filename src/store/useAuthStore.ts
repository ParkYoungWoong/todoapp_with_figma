import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import DEFAULT_USER from '@/data/defaultUser.json'

interface AuthStore {
  user: typeof DEFAULT_USER | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export { DEFAULT_USER }

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      login: (email, password) => {
        if (
          email === DEFAULT_USER.email &&
          password === DEFAULT_USER.password
        ) {
          set({
            user: {
              name: DEFAULT_USER.name,
              profileImage: DEFAULT_USER.profileImage,
              email,
              password
            }
          })
          return true
        }
        return false
      },
      logout: () => set({ user: null })
    }),
    { name: 'auth-store', version: 0 }
  )
)
