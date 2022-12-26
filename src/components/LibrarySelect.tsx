import axios from "axios"
import { ChangeEvent } from "react"
import useStore from "../store"

const LibrarySelect = () => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const currentLibrary = useStore(state => state.currentLibrary)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)

  const handleDropdownChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const library_id = e.target.value

    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${library_id}`,
        headers: { Authorization: `${accessToken}` }
      })
      localStorage.setItem('currentLibraryId', res.data.id)
      setCurrentLibrary(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {currentUser?.libraries && currentUser?.libraries.length > 1 && currentLibrary &&
        <div className='pt-4 flex flex-col md:flex-row gap-4'>
          <label htmlFor="librarySelect" className="pt-2.5 ml-1 text-sm font-medium text-gray-700 hidden">
            Choose Library
          </label>
          <select
            id="librarySelect"
            name="librarySelect"
            className="mt-1 w-72 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            onChange={e => handleDropdownChange(e)}
            value={currentLibrary.id}
            >
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