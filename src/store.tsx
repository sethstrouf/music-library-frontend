import create from 'zustand'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set, get) => ({
  authUser: null,
  authToken: null,
  setAuthUser: (user) => {
    set({ authUser: user })
  },
  setAuthToken: (token) => {
    set({ authToken: token })
  },
}))

export default useStore
