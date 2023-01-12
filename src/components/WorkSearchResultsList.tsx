import axios from "axios"
import { useEffect } from "react"
import { IWork } from "../common/types"
import useStore from "../store"
import { alertService } from '../services/alert'
import noImageAvailable from "../images/no_image_available.jpg"
import EditWorkModal from "./modals/EditWorkModal"

type Props = {
  searchResults: IWork[]
  setShowAddWorkToLibraryModal: (active: boolean) => void
  setSelectedWork: (active: IWork) => void
  selectedWork: IWork | null
  worksAlreadyInLibrary: number[]
  setWorksAlreadyInLibrary: (active: number[]) => void
  handleSearch: () => void
}

const WorkSearchResultsList = ({ searchResults, setShowAddWorkToLibraryModal, setSelectedWork, selectedWork, worksAlreadyInLibrary, setWorksAlreadyInLibrary, handleSearch } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const currentLibrary = useStore(state => state.currentLibrary)
  const showEditWorkModal = useStore(state => state.showEditWorkModal)
  const setShowEditWorkModal = useStore(state => state.setShowEditWorkModal)

  useEffect(() => {
    getWorksAlreadyInLibrary()
  }, [searchResults, currentLibrary])

  const handleAdd = (work: IWork) => {
    setSelectedWork(work)
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

  const handleDelete = async (work: IWork) => {
    try {
      await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/works/${work.id}`,
        headers: { Authorization: `${accessToken}` }
      })
      alertService.showSuccess('Work removed')
      handleSearch()
    } catch (err) {
      console.error(err)
      alertService.showError('Unable to delete work')
    }
  }

  const showModal = (result: IWork) => {
    setSelectedWork(result)
    setShowEditWorkModal(true)
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      {showEditWorkModal && <EditWorkModal handleSearch={handleSearch} selectedWork={selectedWork} />}
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
                      {currentUser!.admin
                      ?
                        <button onClick={() => showModal(result)} className="truncate text-sm font-medium underline text-sky-800 hover:text-sky-900">{result.attributes.title}</button>
                      :
                        <p className="truncate text-sm font-medium text-sky-800">{result.attributes.title}</p>
                      }
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
                      onClick={() => handleAdd(result)}
                    >
                      + Add
                    </button>
                  }
                  {currentUser!.admin &&
                    <button
                    type="button"
                    className='ml-2 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium
                    text-white shadow-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto'
                    onClick={() => handleDelete(result)}
                    >
                      - Delete
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
function setState(): [any, any] {
  throw new Error("Function not implemented.")
}
