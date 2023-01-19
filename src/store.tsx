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
  libraryWorksMeta: null,
  showAddLibraryModal: false,
  showAddWorkToLibraryModal: false,
  showChangeLibraryNameModal: false,
  showEditLibraryWorkModal: false,
  showConfirmDeleteLibraryModal: false,
  showEditWorkModal: false,
  showAddWorkModal: false,
  showSearchColleaguesModal: false,
  showColleagueLibraryModal: false,
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
  setLibraryWorksMeta: (metadata) => {
    set({ libraryWorksMeta: metadata})
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
  setShowEditWorkModal: (boolean) => {
    set({ showEditWorkModal: boolean})
  },
  setShowAddWorkModal: (boolean) => {
    set({ showAddWorkModal: boolean})
  },
  setShowSearchColleaguesModal: (boolean) => {
    set({ showSearchColleaguesModal: boolean})
  },
  setShowColleagueLibraryModal: (boolean) => {
    set({ showColleagueLibraryModal: boolean })
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
  getAndSetLibraryWorks: async (page = 1, perPage = 10) => {
    if (get().currentLibrary) {
      get().setLibraryWorks([])
      try {
        const res = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works`,
          params: {
            library_work: { library_id: get().currentLibrary?.id },
            page: page,
            per_page: perPage
          },
          paramsSerializer: (params) => {
            return qs.stringify(params)
          },
          headers: { Authorization: `${get().accessToken}` }
        })
        get().setLibraryWorks(res.data.data)
        get().setLibraryWorksMeta(res.data.meta)
      } catch (error) {
        console.error(error)
      }
    }
  },


  // Constant Options
  DURATIONS: [
    {label: '', value: ''},
    {label: '0-2 minutes', value: 'zero_to_two'},
    {label: '2-4 minutes', value: 'two_to_four'},
    {label: '4-6 minutes', value: 'four_to_six'},
    {label: '6-10 minutes', value: 'six_to_ten'},
    {label: '10-20 minutes', value: 'ten_to_twenty'},
    {label: '20-60 minutes', value: 'twenty_to_sixty'},
    {label: '60+ minutes', value: 'sixty_plus'}
  ],

  TEMPI: [
    {label: '', value: ''},
    {label: 'very slow', value: 'very_slow'},
    {label: 'slow', value: 'slow'},
    {label: 'medium', value: 'medium'},
    {label: 'fast', value: 'fast'},
    {label: 'very fast', value: 'very_fast'},
  ],

  GENRES: [
    {label: '', value: ''},
    {label: 'folk', value: 'folk'},
    {label: 'patriotic', value: 'patriotic'},
    {label: 'cultural', value: 'cultural'},
    {label: 'march', value: 'march'},
    {label: 'classical', value: 'classical'},
    {label: 'modern', value: 'modern'},
    {label: 'theater', value: 'theater'},
    {label: 'spiritual', value: 'spiritual'},
    {label: 'holiday', value: 'holiday'},
  ],

  SEASONS: [
    {label: 'fall', value: 'fall'},
    {label: 'winter', value: 'holiday'},
    {label: 'spring', value: 'holiday'},
    {label: 'graduation', value: 'holiday'},
  ],

  ENSEMBLES: [
    {label: 'choir', value: 'choir'},
    {label: 'band', value: 'band'},
    {label: 'jazz band', value: 'jazz_band'},
    {label: 'marching band', value: 'marching_band'},
    {label: 'pep band', value: 'pep_band'},
    {label: 'orchestra', value: 'orchestra'},
    {label: 'vocal chamber', value: 'vocal_chamber'},
    {label: 'instrumental chamber', value: 'instrumental_chamber'},
    {label: 'string chamber', value: 'string_chamber'},
  ],

  VOICINGS: [
    {label: 'Unison', value: 'unison'},
    {label: 'SA', value: 'sa'},
    {label: 'SSA', value: 'ssa'},
    {label: 'SSAA', value: 'ssaa'},
    {label: 'SAB', value: 'sab'},
    {label: 'SAT', value: 'sat'},
    {label: 'SATB', value: 'satb'},
    {label: 'TB', value: 'tb'},
    {label: 'TTB', value: 'ttb'},
    {label: 'SSAATTBB', value: 'ssaattbb'},
  ],

  INSTRUMENTATIONS: [
    {label: 'woodwinds', value: 'woodwinds'},
    {label: 'brass', value: 'brass'},
    {label: 'percussion', value: 'percussion'},
    {label: 'strings', value: 'strings'},
  ],

  DIFFICULTIES: [
    {label: 'very easy', value: 'very_easy'},
    {label: 'easy', value: 'easy'},
    {label: 'medium', value: 'medium'},
    {label: 'difficult', value: 'difficult'},
    {label: 'very difficult', value: 'very_difficult'},
  ]
}))

export default useStore
