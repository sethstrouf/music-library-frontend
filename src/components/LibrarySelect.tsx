import { ChangeEvent } from "react"
import useStore from "../store"

const LibrarySelect = () => {
  const currentUser = useStore(state => state.currentUser)
  const getAndSetCurrentLibrary = useStore(state => state.getAndSetCurrentLibrary)
  const currentLibrary = useStore(state => state.currentLibrary)

  const handleDropdownChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const libraryId = e.target.value
    getAndSetCurrentLibrary(libraryId)
  }

  return (
    <>
      {currentUser?.libraries &&
        <div className='w-full'>
          <label htmlFor="librarySelect" className="sr-only">
            Choose Library
          </label>
          <select
            id="librarySelect"
            name="librarySelect"
            className="w-72 block rounded-md border-gray-300 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            onChange={e => handleDropdownChange(e)}
            value={currentLibrary?.id}
          >
            {!currentLibrary && <option></option>}
            {currentUser.libraries.map((library) => (
              <option key={library.id} value={library.id}>{library.name}</option>
            ))}
          </select>
        </div>
      }
    </>
  )
}

export default LibrarySelect
