type Props = {
  placeholder: string
  searchQuery: string
  setSearchQuery: (active: string) => void
}

const ColleagueSearchBar = ({ placeholder, searchQuery, setSearchQuery }: Props) => {
  return (
    <div>
      <label htmlFor="workSearch" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 rounded-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <i className="fa-solid fa-magnifying-glass h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="workSearch"
          id="workSearch"
          className="block w-full rounded-xl border-gray-300 pl-10 focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-2"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  )
}

export default ColleagueSearchBar
