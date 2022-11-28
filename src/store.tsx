import create from 'zustand'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set, get) => ({
  currentUser: null,
  accessToken: null,
  users: [],
  setCurrentUser: (user) => {
    set({ currentUser: user })
  },
  setAccessToken: (token) => {
    set({ accessToken: token })
  },
  setUsers: (users) => {
    set({ users: users })
  }
}))

export default useStore
