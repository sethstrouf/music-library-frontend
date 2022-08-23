export interface IUser {
  id?: number,
  type?: string,
  attributes: {name: string, email: string}
}

export interface IStoreState {
  api_token: string | null,
  isApiAuthorized: boolean,
  users: IUser[],
  user: IUser | null,
  getApiToken: () => void,
  getUser: (id: number) => void,
  getUsers: () => void,
  createUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  destroyUser: (id: number) => void;
}
