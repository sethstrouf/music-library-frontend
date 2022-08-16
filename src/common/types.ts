export interface IUser {
  id?: number,
  name: string,
  email: string
}

export interface IStoreState {
  users: IUser[],
  user: IUser | null,
  getUser: (id: number) => void,
  getUsers: () => void,
  postUser: (user: IUser) => void;
}
