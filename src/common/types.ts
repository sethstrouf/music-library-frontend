export interface IUser {
  id?: number,
  type?: string,
  attributes: {name: string, email: string}
}

export interface IStoreState {
  users: IUser[],
  user: IUser | null,
  getUser: (id: number) => void,
  getUsers: () => void,
  createUser: (user: IUser) => void;
  updateUser: (user: IUser) => void;
  destroyUser: (id: number) => void;
}
