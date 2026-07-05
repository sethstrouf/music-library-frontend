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
  { label: 'Last performed', align: 'text-center' },
  { label: 'Checked out', align: 'text-center' },
]

const getRowClassName = (libraryWork: ILibraryWork, selectedLibraryWorks: ILibraryWork[]) => {
  if (libraryWork.attributes.checked_out) return 'bg-red-50'
  if (selectedLibraryWorks.includes(libraryWork)) return 'bg-brand-50/60'
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
    <div className="w-full overflow-x-auto">
      {showEditLibraryWorkModal && libraryWorkToUpdate && (
        <EditLibraryWorkModal libraryWorkToUpdate={libraryWorkToUpdate} />
      )}
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="table-head">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header.label || 'select'}
                scope="col"
                className={classNames('table-cell', header.align, header.width, header.minWidth)}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {libraryWorks?.map((libraryWork) => (
            <tr key={libraryWork.id} className={getRowClassName(libraryWork, selectedLibraryWorks)}>
              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                {selectedLibraryWorks.includes(libraryWork) && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-brand-500" />
                )}
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 sm:left-6"
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
              <td className="table-cell text-center">{libraryWork.attributes.index}</td>
              <td
                className={classNames(
                  'table-cell font-medium',
                  selectedLibraryWorks.includes(libraryWork) ? 'text-brand-700' : 'text-slate-900'
                )}
              >
                <button onClick={() => handleUpdateClick(libraryWork)} className="text-left hover:underline">
                  {libraryWork.attributes.work.title}
                </button>
              </td>
              <td className="table-cell">{libraryWork.attributes.work.composer}</td>
              <td className="table-cell text-center">{libraryWork.attributes.quantity}</td>
              <td className="table-cell text-center">
                {libraryWork.attributes.last_performed
                  ? new Date(libraryWork.attributes.last_performed).toLocaleDateString()
                  : '—'}
              </td>
              <td className="table-cell text-center">
                <input
                  type="checkbox"
                  checked={libraryWork.attributes.checked_out}
                  onChange={(e) => handleCheckedOutChange(e, libraryWork)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
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
