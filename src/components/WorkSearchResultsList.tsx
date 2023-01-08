import axios from "axios"
import { useEffect } from "react"
import { IWork } from "../common/types"
import useStore from "../store"
import { alertService } from '../services/alert'
import noImageAvailable from "../images/no_image_available.jpg"

type Props = {
  searchResults: IWork[]
  setShowAddWorkToLibraryModal: (active: boolean) => void
  setSelectedWork: (active: IWork) => void
  worksAlreadyInLibrary: number[]
  setWorksAlreadyInLibrary: (active: number[]) => void
  handleSearch: () => void
}

const WorkSearchResultsList = ({ searchResults, setShowAddWorkToLibraryModal, setSelectedWork, worksAlreadyInLibrary, setWorksAlreadyInLibrary, handleSearch } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const currentLibrary = useStore(state => state.currentLibrary)

  useEffect(() => {
    getWorksAlreadyInLibrary()
  }, [searchResults, currentLibrary])

  const handleClick = (work: IWork) => {
    setSelectedWork(work)
    {console.log(work.attributes.image_url)}

    setShowAddWorkToLibraryModal(true)
  }

  const getWorksAlreadyInLibrary = () => {
    let tempArray: number[] = []
    searchResults.forEach(result => {
      currentLibrary?.attributes.library_works.forEach(libraryWork => {
        if(libraryWork.work_id == result.id) {
          tempArray.push(result.id)
        }
      })
    })
    setWorksAlreadyInLibrary(tempArray)
  }

  const handleImageUpload = async (e: any, work: IWork) => {
    const image = e.target.files[0]
    if (image.type == 'image/jpeg' || image.type == 'image/png' ) {
      const formData = new FormData();
      formData.append("image", image);
      try {
        await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/works/${work.id}`,
          data: formData,
          headers: { Authorization: `${accessToken}` }
        })
        handleSearch()
      } catch (err) {
        console.error(err)
      }
    } else {
      alertService.showError('File must be jpg or png')
    }
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
                    {result.attributes.image_url
                    ?
                      <img className="h-18 w-12" src={result.attributes.image_url} alt="" />
                    :
                      <img className="h-18 w-12" src={noImageAvailable} alt="" />
                    }
                    {currentUser!.admin &&
                      <input className="pt-2 " type="file" name="newImage"accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(e, result)} />
                    }
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
                  {result.id && worksAlreadyInLibrary.includes(result.id)
                  ?
                    <p className="pr-3 text-sm text-gray-700 italic">In library</p>
                  :
                    <button
                      type="button"
                      className={`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
                      text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto
                      ${!currentLibrary ? "bg-gray-400 pointer-events-none" : "bg-sky-600"}`}
                      onClick={() => handleClick(result)}
                    >
                      + Add
                    </button>
                  }
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
