export interface IUser {
  id?: number,
  type?: string,
  email: string,
  password: string,
  attributes: {name?: string, email: string},
}

export interface IStoreState {
  authUser: IUser | null,
  authToken: string | null,
  api_token: string | null,
  isApiAuthorized: boolean,
  users: IUser[],
  user: IUser | null,
  setAuthUser: (user: IUser) => void,
  setAuthToken: (token: string) => void,
  signOutUser: () => void,
  getApiToken: () => void,
  getUser: (id: number) => void,
  updateUser: (user: IUser) => void,
  destroyUser: (id: number) => void,
}
