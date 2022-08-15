export interface IUser {
  id?: number,
  name: string,
  email: string
}

export interface IStoreState {
  users: IUser[],
  getUsers: () => void,
  postUser: (user: IUser) => void;
}
