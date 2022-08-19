import { alertService } from './services/alert'
import axios from 'axios'
import create from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { IStoreState } from './common/types'
import produce from 'immer'

const useStore = create<IStoreState>((set, get) => ({
  users: [],
  user: null,
  getUser: async (id) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_HOST}/users/${id}`,
        headers: { Authorization: `${process.env.REACT_APP_BEARER_TOKEN}` }
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
        url: `${process.env.REACT_APP_API_HOST}/users`,
        headers: { Authorization: `${process.env.REACT_APP_BEARER_TOKEN}` }
      })
      set({ users: res.data.data })
    } catch (error) {
      alertService.showError('Cannot get user data...')
      console.log(error)
    }
  },
  createUser: async (user) => {
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_HOST}/users`,
      data: {user},
      headers: { Authorization: `${process.env.REACT_APP_BEARER_TOKEN}` }
    })
    if (res.data.data && res.data.data.id) {
      alertService.showSuccess(`Welcome, ${res.data.data.attributes.name}!`)
      set(state => ({ users: produce(state.users, draft => { draft.push(res.data.data) })}))
    } else {
      alertService.showError('Subscription failed...')
    }
  },
  updateUser: async (user) => {
    const res = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_HOST}/users/${user.id}`,
      data: {user},
      headers: { Authorization: `${process.env.REACT_APP_BEARER_TOKEN}` }
    })
    if (res.data.data && res.data.data.id) {
      alertService.showSuccess('User updated!')
      const index = get().users.findIndex(obj => obj.id === user.id)
      set(state => ({ users: produce(state.users, draft => { draft[index] = user })}))
    } else {
      alertService.showError('Cannot update user...')
    }
  },
  destroyUser: async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_HOST}/users/${id}`,
        headers: { Authorization: `${process.env.REACT_APP_BEARER_TOKEN}` }
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
