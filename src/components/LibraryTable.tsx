import { useLayoutEffect, useRef, useState } from "react";
import { ILibraryWork } from "../common/types";
import useStore from "../store";

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  selectedLibraryWorks: ILibraryWork[]
  setSelectedLibraryWorks: (active: ILibraryWork[]) => void
}

  const LibraryTable = ({ selectedLibraryWorks, setSelectedLibraryWorks } : Props) => {
  const libraryWorks = useStore(state => state.libraryWorks)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)

  const checkbox = useRef<any>();
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState(false)

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

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300">
      <thead className="bg-gray-50">
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
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
            Index
          </th>
          <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-800">
            Title
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
            Composer
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
            Quantity
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-800">
            Last Performed
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {libraryWorks?.map((libraryWork) => (
          <tr key={libraryWork.id} className={selectedLibraryWorks.includes(libraryWork) ? 'bg-gray-50' : undefined}>
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
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.work.index}</td>
            <td
              className={classNames(
                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                selectedLibraryWorks.includes(libraryWork) ? 'text-sky-600' : 'text-gray-800'
              )}
            >
              {libraryWork.attributes.work.title}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.work.composer}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.quantity}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(libraryWork.attributes.last_performed).toDateString()}</td>
            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <a href="#" className="text-sky-600 hover:text-sky-900">
                Edit<span className="sr-only">, {libraryWork.attributes.work.title}</span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LibraryTable
