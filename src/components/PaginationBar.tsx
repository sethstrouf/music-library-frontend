import useStore from "../store"

type Props = {
  perPage: number
  setPerPage: (active: any) => void
  setPage: (active: any) => void
}

const PaginationBar = ({ perPage, setPerPage, setPage } : Props ) => {
  const libraryWorksMeta = useStore(state => state.libraryWorksMeta)

  return (
    <nav
      className="flex items-center justify-between border rounded-t-lg border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{libraryWorksMeta?.from}</span> to <span className="font-medium">{libraryWorksMeta?.to}</span> of{' '}
          <span className="font-medium">{libraryWorksMeta?.count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-center">
        <button
          className={libraryWorksMeta?.prev ? "mr-2 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" : "mr-2 relative inline-flex items-center bg-white px-4 py-2 text-sm font-medium text-gray-400 pointer-events-none"}
          onClick={() => setPage(libraryWorksMeta?.prev)}
        >
          Previous
        </button>
        <button
          className={libraryWorksMeta?.next ? "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" : "relative inline-flex items-center bg-white px-4 py-2 text-sm font-medium text-gray-400 pointer-events-none"}
          onClick={() => setPage(libraryWorksMeta?.next)}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:block">
        <div className="text-sm text-gray-700">
          <label htmlFor="itemsPerPage" className="pr-2 text-sm font-medium text-gray-700">Results per page</label>

          <select value={perPage} onChange={(e) => setPerPage(e.target.value)} name="itemsPerPage" id="itemsPerPage" className="inline-flex w-20 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <option value="25" disabled={perPage == 25}>25</option>
            <option value="50" disabled={perPage == 50}>50</option>
            <option value="100" disabled={perPage == 100}>100</option>
          </select>
        </div>
      </div>
    </nav>
  )
}

export default PaginationBar
