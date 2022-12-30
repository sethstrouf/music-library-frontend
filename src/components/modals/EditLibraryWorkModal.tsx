import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useStore from '../../store'
import { ILibraryWork } from '../../common/types'
import axios from 'axios'
import qs from 'qs'

type Props = {
  libraryWorkToUpdate: ILibraryWork
  setLibraryWorkToUpdate: (active: ILibraryWork) => void
}

const EditLibraryWorkModal = ({ libraryWorkToUpdate, setLibraryWorkToUpdate} : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const currentLibrary = useStore(state => state.currentLibrary)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const showEditLibraryWorkModal = useStore(state => state.showEditLibraryWorkModal)
  const setShowEditLibraryWorkModal = useStore(state => state.setShowEditLibraryWorkModal)

  const [index, setIndex] = useState<any>('')
  const [quantity, setQuantity] = useState<any>('')
  const [lastPerformedDate, setLastPeformedDate] = useState<any>('')

  useEffect(() => {
    if (libraryWorkToUpdate.attributes.index) {
      setIndex(libraryWorkToUpdate.attributes.index)
    } else {
      setIndex('')
    }

    if (libraryWorkToUpdate.attributes.quantity) {
      setQuantity(libraryWorkToUpdate.attributes.quantity)
    } else {
      setQuantity('')
    }

    if (libraryWorkToUpdate.attributes.last_performed) {
      setLastPeformedDate(libraryWorkToUpdate.attributes.last_performed)
    } else {
      setIndex('')
    }
  }, [showEditLibraryWorkModal])


  const updateWork = async (e: FormEvent | MouseEvent) => {
    e.preventDefault()

    try {
      const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${libraryWorkToUpdate.id}`,
        data: {
          library_work: {
            index: `${index}`,
            quantity: `${quantity}`,
            last_performed: `${lastPerformedDate}`,
          }
        },
        headers: { Authorization: `${accessToken}` }
      })
      getLibraryWorks()
    } catch (err) {
      console.error(err)
    } finally {
      setShowEditLibraryWorkModal(false)
    }
  }

  const getLibraryWorks = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works`,
        params: {
          library_work: { library_id: currentLibrary?.id }
        },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        headers: { Authorization: `${accessToken}` }
      })
      setLibraryWorks(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Transition.Root show={showEditLibraryWorkModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowEditLibraryWorkModal(false)}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                <form className='text-center sm:text-left' onSubmit={(e) => updateWork(e)}>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-800">
                      Update Information
                    </Dialog.Title>
                    <div className="mt-6 mb-4">
                      {libraryWorkToUpdate.attributes.work.title}
                    </div>
                  </div>

                  <div>
                    <div className="sm:pl-20 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                        <label htmlFor="index" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Library Index
                          <span className='text-xs italic text-gray-400'> (optional)</span>
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input
                            type="text"
                            name="index"
                            id="index"
                            autoComplete="given-name"
                            className="block w-44 mx-auto sm:mx-0 max-w-lg rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-xs sm:text-sm text-center sm:text-left"
                            value={index}
                            onChange={(e) => {setIndex(e.target.value)}}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:pl-20 space-y-6 sm:space-y-5 pt-4">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Quantity
                          <span className='text-xs italic text-gray-400'> (optional)</span>
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            autoComplete="given-name"
                            className="block w-44 mx-auto sm:mx-0 max-w-lg rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-xs sm:text-sm text-center sm:text-left"
                            value={quantity}
                            onChange={(e) => {setQuantity(e.target.value)}}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:pl-20 space-y-6 sm:space-y-5 pt-4">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                        <label htmlFor="last-performed" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Last Performed
                          <span className='text-xs italic text-gray-400'> (optional)</span>
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input type="date" id="last-performed" name="last-performed"
                            min="1900-01-01"
                            max="2023-12-31"
                            className="block w-44 mx-auto sm:mx-0 max-w-lg rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-xs sm:text-sm text-center sm:text-left"
                            value={lastPerformedDate}
                            onChange={(e) => {setLastPeformedDate(e.target.value)}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="mt-5 sm:mt-12 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={(e) => updateWork(e)}
                  >
                    Update Library
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setShowEditLibraryWorkModal(false)}
                    >
                    Cancel
                  </button>
                </div>
                    </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EditLibraryWorkModal
