import { FormEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import useStore from '../store'

type Props = {
  showAddLibaryModal: boolean
  setShowAddLibraryModal: (active: boolean) => void
}

const AddLibraryModal = ({ showAddLibaryModal, setShowAddLibraryModal } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const setCurrentUser = useStore(state => state.setCurrentUser)

  const [libraryName, setLibraryName] = useState('')
  const libraryNameInput = useRef(null)

  const updateCurrentUser = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/current_user`,
        headers: { Authorization: `${accessToken}` }
      })
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  const createLibrary = async (e: FormEvent | MouseEvent) => {
    e.preventDefault()

    if(libraryName) {
      try {
        const res = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries`,
          data: {library: {name: `${libraryName}` }},
          headers: { Authorization: `${accessToken}` }
        })
        setLibraryWorks([])
        setCurrentLibrary(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLibraryName('')
        setShowAddLibraryModal(false)
        updateCurrentUser()
      }
    }
  }

  return (
    <Transition.Root show={showAddLibaryModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={libraryNameInput} onClose={() => setShowAddLibraryModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <form onSubmit={(e) => createLibrary(e)} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Create Library
                    </Dialog.Title>
                    <div className="mt-2">
                      <label htmlFor="libraryName" className="sr-only">
                        Library Name
                      </label>
                      <input
                        type="text"
                        name="libraryName"
                        id="libraryName"
                        className="mt-4 mb-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                        placeholder="Name your library"
                        value={libraryName}
                        ref={libraryNameInput}
                        onChange={(e) => setLibraryName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={(e) => createLibrary(e)}
                  >
                    Create Library
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setShowAddLibraryModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddLibraryModal
