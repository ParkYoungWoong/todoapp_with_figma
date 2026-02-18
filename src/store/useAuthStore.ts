import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import DEFAULT_USER from '@/data/defaultUser.json'

type Gender = 'male' | 'female'

interface User {
  name: string
  profileImage: string
  email: string
  password: string
  gender: Gender
}

interface AuthStore {
  users: User[]
  user: User | null
  login: (email: string, password: string) => boolean
  signup: (
    name: string,
    email: string,
    password: string,
    gender: Gender
  ) => boolean
  logout: () => void
  deleteAccount: () => void
}

const PROFILE_IMAGES = {
  male: 'https://heropy.dev/images/profile_m.jpg',
  female: 'https://heropy.dev/images/profile_w.jpg'
}

const defaultUsers: User[] = [
  {
    ...DEFAULT_USER,
    gender: 'male' as Gender
  }
]

export { DEFAULT_USER, PROFILE_IMAGES }
export type { Gender }

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: defaultUsers,
      user: null,
      login: (email, password) => {
        const found = get().users.find(
          u => u.email === email && u.password === password
        )
        if (found) {
          set({ user: found })
          return true
        }
        return false
      },
      signup: (name, email, password, gender) => {
        if (get().users.some(u => u.email === email)) return false
        const newUser: User = {
          name,
          email,
          password,
          gender,
          profileImage: PROFILE_IMAGES[gender]
        }
        set(state => ({ users: [...state.users, newUser] }))
        return true
      },
      logout: () => set({ user: null }),
      deleteAccount: () => {
        const current = get().user
        if (!current) return
        localStorage.removeItem('todo-store')
        set(state => ({
          user: null,
          users: state.users.filter(u => u.email !== current.email)
        }))
      }
    }),
    { name: 'auth-store', version: 1 }
  )
)
