export interface IUser {
  id?: number,
  type?: string,
  email: string,
  password: string,
  attributes: {name?: string, email: string},
}

export interface IStoreState {
  currentUser: IUser | null,
  api_token: string | null,
  isApiAuthorized: boolean,
  users: IUser[],
  user: IUser | null,
  getCurrentUser: () => void,
  signInUser: (user: {email: string, password: string}) => void,
  signOutUser: () => void,
  getApiToken: () => void,
  getUser: (id: number) => void,
  getUsers: () => void,
  updateUser: (user: IUser) => void,
  destroyUser: (id: number) => void,
}
