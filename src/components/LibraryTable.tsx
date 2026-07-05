import axios from 'axios'
import { FormEvent, useState } from 'react'
import { classNames } from '../common/classNames'
import { ILibraryWork } from '../common/types'
import useStore from '../store'
import EditLibraryWorkModal from './modals/EditLibraryWorkModal'

type Props = {
  selectedLibraryWorks: ILibraryWork[]
  setSelectedLibraryWorks: (active: ILibraryWork[]) => void
  page: number
  perPage: number
}

type TableHeader = {
  label: string
  align?: string
  width?: string
  minWidth?: string
}

const TABLE_HEADERS: TableHeader[] = [
  { label: '', width: 'w-12 sm:w-16' },
  { label: 'Index', align: 'text-center' },
  { label: 'Title', align: 'text-left', minWidth: 'min-w-[12rem]' },
  { label: 'Composer', align: 'text-left' },
  { label: 'Quantity', align: 'text-center' },
  { label: 'Last Performed', align: 'text-center' },
  { label: 'Checked Out?', align: 'text-center' },
]

const getRowClassName = (libraryWork: ILibraryWork, selectedLibraryWorks: ILibraryWork[]) => {
  if (libraryWork.attributes.checked_out) return 'bg-red-200'
  if (selectedLibraryWorks.includes(libraryWork)) return 'bg-gray-50'
  return undefined
}

const LibraryTable = ({ selectedLibraryWorks, setSelectedLibraryWorks, page, perPage }: Props) => {
  const accessToken = useStore((state) => state.accessToken)
  const libraryWorks = useStore((state) => state.libraryWorks)
  const getAndSetLibraryWorks = useStore((state) => state.getAndSetLibraryWorks)
  const showEditLibraryWorkModal = useStore((state) => state.showEditLibraryWorkModal)
  const setShowEditLibraryWorkModal = useStore((state) => state.setShowEditLibraryWorkModal)

  const [libraryWorkToUpdate, setLibraryWorkToUpdate] = useState<ILibraryWork>()

  const handleUpdateClick = (libraryWork: ILibraryWork) => {
    setLibraryWorkToUpdate(libraryWork)
    setShowEditLibraryWorkModal(true)
  }

  const handleCheckedOutChange = async (_e: FormEvent<HTMLInputElement>, libraryWork: ILibraryWork) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${libraryWork.id}`,
        { library_work: { checked_out: !libraryWork.attributes.checked_out } },
        { headers: { Authorization: `${accessToken}` } }
      )
      getAndSetLibraryWorks(page, perPage)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-screen md:w-full overflow-x-scroll">
      {showEditLibraryWorkModal && libraryWorkToUpdate && (
        <EditLibraryWorkModal libraryWorkToUpdate={libraryWorkToUpdate} />
      )}
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header.label || 'select'}
                scope="col"
                className={classNames(
                  'px-3 py-3.5 text-sm font-semibold text-gray-800',
                  header.align,
                  header.width,
                  header.minWidth
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {libraryWorks?.map((libraryWork) => (
            <tr
              key={libraryWork.id}
              className={getRowClassName(libraryWork, selectedLibraryWorks)}
            >
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
                        : selectedLibraryWorks.filter((selected) => selected !== libraryWork)
                    )
                  }
                />
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.index}
              </td>
              <td
                className={classNames(
                  'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                  selectedLibraryWorks.includes(libraryWork) ? 'text-sky-600' : 'text-gray-800'
                )}
              >
                <button onClick={() => handleUpdateClick(libraryWork)} className="hover:underline">
                  {libraryWork.attributes.work.title}
                </button>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.work.composer}
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.quantity}
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.last_performed
                  ? new Date(libraryWork.attributes.last_performed).toDateString()
                  : null}
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={libraryWork.attributes.checked_out}
                  onChange={(e) => handleCheckedOutChange(e, libraryWork)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LibraryTable
