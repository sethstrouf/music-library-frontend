export interface IUser {
  id?: number,
  type?: string,
  email: string,
  first_name: string,
  last_name: string,
  name: string,
  password: string,
  attributes: {name?: string, email: string}
}

export interface IStoreState {
  currentUser: IUser | null,
  accessToken: string | null,
  users: IUser[] | null,
  setCurrentUser: (user: IUser | null) => void,
  setAccessToken: (token: string | null) => void,
  setUsers: (users: [] | null) => void,
}
