import axios from "axios";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { ILibraryWork } from "../common/types";
import useStore from "../store";
import EditLibraryWorkModal from "./modals/EditLibraryWorkModal";

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  selectedLibraryWorks: ILibraryWork[]
  setSelectedLibraryWorks: (active: ILibraryWork[]) => void
  page: number,
  perPage: number
}

const LibraryTable = ({ selectedLibraryWorks, setSelectedLibraryWorks, page, perPage} : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const libraryWorks = useStore(state => state.libraryWorks)
  const getAndSetLibraryWorks = useStore(state => state.getAndSetLibraryWorks)
  const showEditLibraryWorkModal = useStore(state => state.showEditLibraryWorkModal)
  const setShowEditLibraryWorkModal = useStore(state => state.setShowEditLibraryWorkModal)

  const checkbox = useRef<any>();
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [libraryWorkToUpdate, setLibraryWorkToUpdate] = useState<ILibraryWork>()

  useLayoutEffect(() => {
    if (libraryWorks) {
      const isIndeterminate = selectedLibraryWorks.length > 0 && selectedLibraryWorks.length < libraryWorks.length
      setChecked(selectedLibraryWorks.length === libraryWorks.length && selectedLibraryWorks.length > 0)
      setIndeterminate(isIndeterminate)
      if(checkbox.current) {
        checkbox.current.indeterminate = isIndeterminate
      }
    }
  }, [selectedLibraryWorks])

  const toggleAll = () => {
    if (libraryWorks) {
      setSelectedLibraryWorks(checked || indeterminate ? [] : libraryWorks)
      setChecked(!checked && !indeterminate)

      setIndeterminate(false)
    }
  }

  const handleUpdateClick = (libraryWork: ILibraryWork) => {
    setLibraryWorkToUpdate(libraryWork)
    setShowEditLibraryWorkModal(true)
  }

  const handleCheckedOutChange = async (e: FormEvent<HTMLInputElement>, libraryWork: ILibraryWork) => {
    try {
      await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${libraryWork.id}`,
        data: {library_work: {checked_out: `${!libraryWork.attributes.checked_out}` }},
        headers: { Authorization: `${accessToken}` }
      })
      getAndSetLibraryWorks(page, perPage)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-screen md:w-full overflow-x-scroll">
      {showEditLibraryWorkModal && <EditLibraryWorkModal libraryWorkToUpdate={libraryWorkToUpdate!} />}
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
              <input
                type="checkbox"
                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 sm:left-6"
                ref={checkbox}
                checked={checked}
                onChange={toggleAll}
              />
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-800">
              Index
            </th>
            <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-800">
              Title
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
              Composer
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-800">
              Quantity
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-800">
              Last Performed
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-800">
              Checked Out?
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {libraryWorks?.map((libraryWork) => (
            <tr key={libraryWork.id} className={selectedLibraryWorks.includes(libraryWork) && !libraryWork.attributes.checked_out ? 'bg-gray-50' : libraryWork.attributes.checked_out ? 'bg-red-200' : undefined}>
              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                {selectedLibraryWorks.includes(libraryWork) && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-sky-600" />
                )}
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 sm:left-6"
                  value={libraryWork.id}
                  checked={selectedLibraryWorks.includes(libraryWork)}
                  onChange={(e) =>
                    setSelectedLibraryWorks(
                      e.target.checked
                        ? [...selectedLibraryWorks, libraryWork]
                        : selectedLibraryWorks.filter((p) => p !== libraryWork)
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.index}</td>
              <td
                className={classNames(
                  'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                  selectedLibraryWorks.includes(libraryWork) ? 'text-sky-600' : 'text-gray-800'
                )}
              >
                <button onClick={() => handleUpdateClick(libraryWork)} className='hover:underline'>
                  {libraryWork.attributes.work.title}
                </button>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.work.composer}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.quantity}</td>
              {libraryWork.attributes.last_performed
              ?
                <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{new Date(libraryWork.attributes.last_performed).toDateString()}</td>
              :
                <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"></td>
              }
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <input type="checkbox" checked={libraryWork.attributes.checked_out} onChange={(e) => handleCheckedOutChange(e, libraryWork)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LibraryTable
