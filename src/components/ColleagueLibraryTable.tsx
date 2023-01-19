import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { ILibraryWork } from "../common/types";
import useStore from "../store";
import EditLibraryWorkModal from "./modals/EditLibraryWorkModal";

type Props = {
  libraryWorks: ILibraryWork[]
}

const LibraryTable = ({ libraryWorks } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const getAndSetLibraryWorks = useStore(state => state.getAndSetLibraryWorks)
  const showEditLibraryWorkModal = useStore(state => state.showEditLibraryWorkModal)
  const setShowEditLibraryWorkModal = useStore(state => state.setShowEditLibraryWorkModal)

  const checkbox = useRef<any>();
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [libraryWorkToUpdate, setLibraryWorkToUpdate] = useState<ILibraryWork>()

  const handleCheckedOutChange = async (e: FormEvent<HTMLInputElement>, libraryWork: ILibraryWork) => {
    try {
      await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${libraryWork.id}`,
        data: {library_work: {checked_out: `${!libraryWork.attributes.checked_out}` }},
        headers: { Authorization: `${accessToken}` }
      })
      getAndSetLibraryWorks(1, 1)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full overflow-auto">
      {showEditLibraryWorkModal && <EditLibraryWorkModal libraryWorkToUpdate={libraryWorkToUpdate!} />}
      <table className="min-w-full table-fixed divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
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
              Checked Out?
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {libraryWorks?.map((libraryWork) => (
            <tr key={libraryWork.id}>
              <td
                className={'whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-800 text-left'}
              >
                {libraryWork.attributes.work.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.work.composer}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{libraryWork.attributes.quantity}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                <input type="checkbox" checked={libraryWork.attributes.checked_out} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LibraryTable
