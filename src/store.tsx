import { alertService } from './services/alert'
import axios from 'axios'
import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { IStoreState } from './common/types'

const useStore = create<IStoreState>((set) => ({
  users: [],
  user: null,
  getUser: async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_HOST}/users/${id}`)
      set({ user: await res.data })
    } catch (error) {
      alertService.showError('Cannot find user...')
      console.log(error)
    }
  },
  getUsers: async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_HOST}/users`)
      set({ users: await res.data })
    } catch (error) {
      alertService.showError('Cannot get user data...')
      console.log(error)
    }
  },
  createUser: async (user) => {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/users`, {user})
    if (res.data && res.data.id) {
      alertService.showSuccess(`Welcome, ${res.data.name}!`)
      set(state => ({ users: [...state.users, res.data] }))
    } else {
      alertService.showError('Subscription failed...')
    }
  },
  updateUser: async (user) => {
    const res = await axios.put(`${process.env.REACT_APP_API_HOST}/users/${user.id}`, {user})
    if (res.data && res.data.id) {
      alertService.showSuccess('User updated!')
      set({ users: [] })
    } else {
      alertService.showError('Cannot update user...')
    }
  },
  destroyUser: async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_HOST}/users/${id}`)
      set(state => ({ users: state.users.filter(user => user.id !== id) }))
      alertService.showSuccess('User removed!')
    } catch (error) {
      alertService.showError('Cannot delete user...')
      console.log(error)
    }
  },
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}

export default useStore
