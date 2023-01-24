import { ChangeEvent, useEffect, useState } from "react"
import { IUser } from "../common/types"
import useStore from "../store"

type Props = {
  user: IUser
  setColleagueLibraryId: (active: any) => void
}

const ColleagueLibrarySelect = ({ user, setColleagueLibraryId } : Props) => {
  const setShowColleagueLibraryModal = useStore(state => state.setShowColleagueLibraryModal)

  const [libraryId, setLibraryId] = useState<number>()

  useEffect(() => {
    // Set initial library so 'View Library' link works
    if (user.attributes.libraries.length) {
      setLibraryId(user.attributes.libraries[0].id)
    } else {
      setLibraryId(0)
    }
  }, [])

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const libraryId = parseInt(e.target.value)
    setColleagueLibraryId(libraryId)
    setShowColleagueLibraryModal(true)
  }

  const handleViewLibrary = () => {
    setColleagueLibraryId(libraryId)
    setShowColleagueLibraryModal(true)
  }

  return (
    <>
        <div className='w-full ml-4 sm:ml-0'>
          <label htmlFor="librarySelect" className="block text-center pb-1 text-sm text-gray-800 underline hover:text-gray-600 cursor-pointer" onClick={() => handleViewLibrary()}>
            View Library
          </label>
          <select
            id="librarySelect"
            name="librarySelect"
            className="w-72 block rounded-md border-gray-300 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            onChange={e => handleDropdownChange(e)}
          >
            {user?.attributes.libraries && user.attributes.libraries.map((library) => (
              <option key={library.id} value={library.id}>{library.name}</option>
            ))}
          </select>
        </div>
    </>
  )
}

export default ColleagueLibrarySelect
