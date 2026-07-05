type Props = {
  placeholder: string
  searchQuery: string
  setSearchQuery: (active: string) => void
}

const ColleagueSearchBar = ({ placeholder, searchQuery, setSearchQuery }: Props) => {
  return (
    <div className="mx-auto max-w-xl">
      <label htmlFor="colleagueSearch" className="sr-only">
        Search colleagues
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <i className="fa-solid fa-magnifying-glass text-slate-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="colleagueSearch"
          id="colleagueSearch"
          className="input-field pl-10"
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
