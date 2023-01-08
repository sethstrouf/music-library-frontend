export interface IUser {
  id?: number,
  type?: string,
  email: string,
  first_name: string,
  last_name: string,
  name: string,
  admin: boolean
  libraries: ILibrary[],
  attributes: {name?: string, email: string}
}

export interface IWork {
  id?: number,
  title: string,
  composer: string
  genre: string
  publishing_year: number
  attributes: {title: string, composer: string, genre: string, publishing_year: number, image_url: string}
}

export interface ILibrary {
  id?: number,
  name?: string,
  attributes: {name: string, library_works: ILibraryWork[]}
}

export interface ILibraryWork {
  id?: number,
  work_id: number,
  attributes: {index: number, quantity: number, last_performed: Date, checked_out: boolean, library: ILibrary, work: IWork}
}

export interface IStoreState {
  currentUser: IUser | null,
  accessToken: string | null,
  users: IUser[] | null,
  currentLibrary: ILibrary | null,
  libraryWorks: ILibraryWork[] | null,
  showAddLibraryModal: boolean,
  showAddWorkToLibraryModal: boolean,
  showChangeLibraryNameModal: boolean,
  showEditLibraryWorkModal: boolean,
  setCurrentUser: (user: IUser | null) => void,
  setAccessToken: (token: string | null) => void,
  setUsers: (users: [] | null) => void,
  setCurrentLibrary: (library: ILibrary | null) => void,
  setLibraryWorks: (libraryWorks: [] | null) => void
  setShowAddLibraryModal: (boolean: boolean) => void
  setShowAddWorkToLibraryModal: (boolean: boolean) => void
  setShowChangeLibraryNameModal: (boolean: boolean) => void
  setShowEditLibraryWorkModal: (boolean: boolean) => void
}
