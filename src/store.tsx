import axios from 'axios'
import qs from 'qs'
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
  showConfirmDeleteLibraryModal: false,
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
  setShowConfirmDeleteLibraryModal: (boolean) => {
    set({ showConfirmDeleteLibraryModal: boolean})
  },

  // API Calls

  getAndSetCurrentUser: async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/current_user`,
        headers: { Authorization: `${get().accessToken}` }
      })
      get().setCurrentUser(res.data);
    } catch (error) {
      console.error(error)
    }
  },
  getAndSetCurrentLibrary: async (libraryId) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${libraryId}`,
        headers: { Authorization: `${get().accessToken}` }
      })
      localStorage.setItem('currentLibraryId', res.data.id)
      get().setCurrentLibrary(res.data)
    } catch (error) {
      console.error(error)
    }
  },
  getAndSetLibraryWorks: async () => {
    if (get().currentLibrary) {
      try {
        const res = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works`,
          params: {
            library_work: { library_id: get().currentLibrary?.id }
          },
          paramsSerializer: (params) => {
            return qs.stringify(params)
          },
          headers: { Authorization: `${get().accessToken}` }
        })
        get().setLibraryWorks(res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}))

export default useStore
