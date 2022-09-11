import { alertService } from './services/alert'
import axios from 'axios'
import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { IStoreState } from './common/types'
import produce from 'immer'
import getApiAuthToken from './services/api_auth_token'

const useStore = create<IStoreState>((set, get) => ({
  currentUser: null,
  api_token: null,
  isApiAuthorized: false,
  users: [],
  user: null,
  getCurrentUser: async () => {
    if (localStorage.hasOwnProperty('user')) {
      const user = localStorage.getItem('user')
      if (user) {
        set({ currentUser: JSON.parse(user) })
      }
    } else {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_HOST}/api/v1/current_user`, {withCredentials: true})
        set({ currentUser: await res.data })
      } catch (error) {
        console.log(error)
      }
    }
  },
  signInUser: async (user) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_HOST}/api/login`, {user: user}, {withCredentials: true})
      localStorage.setItem('user', JSON.stringify(res.data))
      set({ currentUser: await res.data })
    } catch (error) {
      alertService.showError('Could not sign in...')
      console.log(error)
    }
  },
  signOutUser: async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_HOST}/api/logout`, {withCredentials: true})
      localStorage.clear()
      set({ currentUser: null })
    } catch (error) {
      alertService.showError('Could not sign out...')
      console.log(error)
    }
  },
  getApiToken: async () => {
    const token = getApiAuthToken()
    set({api_token: await token })
    if (get().api_token !== null) {
      set({isApiAuthorized: true})
    }
  },
  getUser: async (id) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_HOST}/api/v1/users/${id}`,
        headers: { Authorization: `${get().api_token}` }
      })
      set({ user: await res.data.data })
    } catch (error) {
      alertService.showError('Cannot find user...')
      console.log(error)
    }
  },
  getUsers: async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_HOST}/api/v1/users`,
        headers: { Authorization: `${get().api_token}` }
      })
      set({ users: res.data.data })
    } catch (error) {
      alertService.showError('Cannot get user data...')
      console.log(error)
    }
  },
  updateUser: async (user) => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_HOST}/api/v1/users`,
        data: {user},
        headers: { Authorization: `${get().api_token}` }
      })
      alertService.showSuccess('User updated!')
      const index = get().users.findIndex(obj => obj.id === user.id)
      set(state => ({ users: produce(state.users, draft => { draft[index] = user })}))
    } catch (error) {
      console.log(error);
      alertService.showError('Cannot update user...')
    }
  },
  destroyUser: async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_HOST}/api/v1/users/${id}`,
        headers: { Authorization: `${get().api_token}` }
      })
      set(state => ({ users: state.users.filter(user => Number(user.id) !== id) }))
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
