import { alertService } from './services/alert'
import Axios from 'axios'
import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set) => ({
  users: [],
  user: null,
  getUser: async (id) => {
    try {
      const res = await Axios.get(`${process.env.REACT_APP_API_HOST}/users/${id}`)
      set({ user: await res.data })
    } catch (error) {
      alertService.showError('Cannot find user...')
      console.log(error)
    }
  },
  getUsers: async () => {
    try {
      const res = await Axios.get(`${process.env.REACT_APP_API_HOST}/users`)
      set({ users: await res.data })
    } catch (error) {
      alertService.showError('Cannot get user data...')
      console.log(error)
    }
  },
  postUser: async (user) => {
    const res = await Axios.post(`${process.env.REACT_APP_API_HOST}/users`, {user})
    if (res.data && res.data.id) {
      alertService.showSuccess(`Welcome, ${res.data.name}!`)
      set(state => ({ users: [...state.users, res.data] }))
    } else {
      alertService.showError('Subscription failed!')
    }
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}

export default useStore
