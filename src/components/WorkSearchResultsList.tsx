import { IWork } from "../common/types"

type Props = {
  searchResults: IWork[]
  setShowAddWorkToLibraryModal: (active: boolean) => void
  setSelectedWork: (active: IWork) => void
}

const WorkSearchResultsList = ({ searchResults, setShowAddWorkToLibraryModal, setSelectedWork } : Props) => {
  const handleClick = (work: IWork) => {
    setSelectedWork(work)
    setShowAddWorkToLibraryModal(true)
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {searchResults.map((result) => (
          <li key={result.id}>
            <a className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    {/* <img className="h-12 w-12 rounded-full" src={result.attributes.result.imageUrl} alt="" /> */}
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-sky-800">{result.attributes.title}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">{result.attributes.composer}</span>
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div>
                        <p className="text-sm text-gray-800">
                          Published: {result.attributes.publishing_year}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-800">
                          Genre: {result.attributes.genre}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                  onClick={() => handleClick(result)}
                >
                  + Add
                </button>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkSearchResultsList
