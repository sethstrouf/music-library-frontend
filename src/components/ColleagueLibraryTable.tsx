import { ILibraryWork } from '../common/types'

type Props = {
  libraryWorks: ILibraryWork[]
}

const ColleagueLibraryTable = ({ libraryWorks }: Props) => {
  return (
    <div className="table-shell overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="table-head">
          <tr>
            <th scope="col" className="table-cell text-left min-w-[12rem]">Title</th>
            <th scope="col" className="table-cell text-left">Composer</th>
            <th scope="col" className="table-cell text-center">Quantity</th>
            <th scope="col" className="table-cell text-center">Checked out</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {libraryWorks?.map((libraryWork) => (
            <tr key={libraryWork.id}>
              <td className="table-cell font-medium text-slate-900">{libraryWork.attributes.work.title}</td>
              <td className="table-cell">{libraryWork.attributes.work.composer}</td>
              <td className="table-cell text-center">{libraryWork.attributes.quantity ?? '—'}</td>
              <td className="table-cell text-center">
                <input type="checkbox" checked={libraryWork.attributes.checked_out} readOnly className="rounded border-slate-300" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ColleagueLibraryTable
