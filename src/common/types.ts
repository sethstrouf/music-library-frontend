export interface IUser {
  id?: number,
  type?: string,
  email: string,
  password: string,
  attributes: {name?: string, email: string}
}

export interface IStoreState {
  currentUser: IUser | null,
  accessToken: string | null,
  users: [] | null,
  setCurrentUser: (user: IUser | null) => void,
  setAccessToken: (token: string | null) => void,
  setUsers: (users: [] | null) => void,
}
