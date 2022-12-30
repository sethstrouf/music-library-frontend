import axios from 'axios'
import create from 'zustand'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set, get) => ({
  currentUser: null,
  accessToken: null,
  users: [],
  currentLibrary: null,
  libraryWorks: [],
  showAddLibraryModal: false,
  showAddWorkToLibraryModal: false,
  showChangeLibraryNameModal: false,
  showEditLibraryWorkModal: false,
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
  },
  setShowAddLibraryModal: (boolean) => {
    set({ showAddLibraryModal: boolean})
  },
  setShowAddWorkToLibraryModal: (boolean) => {
    set({ showAddWorkToLibraryModal: boolean})
  },
  setShowChangeLibraryNameModal: (boolean) => {
    set({ showChangeLibraryNameModal: boolean})
  },
  setShowEditLibraryWorkModal: (boolean) => {
    set({ showEditLibraryWorkModal: boolean})
  },
}))

export default useStore
