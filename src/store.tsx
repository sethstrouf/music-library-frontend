import axios from 'axios'
import create from 'zustand'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set, get) => ({
  currentUser: null,
  accessToken: null,
  users: [],
  currentLibrary: null,
  libraryWorks: [],
  setCurrentUser: (user) => {
    set({ currentUser: user })
  },
  setAccessToken: (token) => {
    set({ accessToken: token })
  },
  setUsers: (users) => {
    set({ users: users })
  },
  setCurrentLibrary: (library) => {
    set({ currentLibrary: library })
  },
  setLibraryWorks: (libraryWorks) => {
    set({ libraryWorks: libraryWorks})
  }
}))

export default useStore
