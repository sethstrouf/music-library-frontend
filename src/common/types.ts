export interface IUser {
  id?: number,
  type?: string,
  email: string,
  password: string,
  attributes: {name?: string, email: string}
}

export interface IStoreState {
  authUser: IUser | null,
  authToken: string | null,
  setAuthUser: (user: IUser | null) => void,
  setAuthToken: (token: string | null) => void,
}
