import useStore from '../store'

type Props = {
  perPage: number
  setPerPage: (active: any) => void
  setPage: (active: any) => void
}

const PaginationBar = ({ perPage, setPerPage, setPage }: Props) => {
  const libraryWorksMeta = useStore((state) => state.libraryWorksMeta)

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{libraryWorksMeta?.from}</span> to{' '}
          <span className="font-semibold text-slate-900">{libraryWorksMeta?.to}</span> of{' '}
          <span className="font-semibold text-slate-900">{libraryWorksMeta?.count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-center gap-2">
        <button
          className={libraryWorksMeta?.prev ? 'btn-secondary' : 'btn-secondary cursor-not-allowed opacity-40'}
          disabled={!libraryWorksMeta?.prev}
          onClick={() => setPage(libraryWorksMeta?.prev)}
        >
          Previous
        </button>
        <button
          className={libraryWorksMeta?.next ? 'btn-secondary' : 'btn-secondary cursor-not-allowed opacity-40'}
          disabled={!libraryWorksMeta?.next}
          onClick={() => setPage(libraryWorksMeta?.next)}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:block">
        <label htmlFor="itemsPerPage" className="mr-2 text-sm font-medium text-slate-600">
          Per page
        </label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
          name="itemsPerPage"
          id="itemsPerPage"
          className="input-field inline-block w-20 py-1.5"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </nav>
  )
}

export default PaginationBar
