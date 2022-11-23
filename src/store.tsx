import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
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

if (import.meta.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}

export default useStore
