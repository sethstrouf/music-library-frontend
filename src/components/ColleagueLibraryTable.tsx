import { ILibraryWork } from '../common/types'

type Props = {
  libraryWorks: ILibraryWork[]
}

const ColleagueLibraryTable = ({ libraryWorks }: Props) => {
  return (
    <div className="w-full overflow-auto">
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
              <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-800 text-left">
                {libraryWork.attributes.work.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.work.composer}
              </td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {libraryWork.attributes.quantity}
              </td>
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

export default ColleagueLibraryTable
