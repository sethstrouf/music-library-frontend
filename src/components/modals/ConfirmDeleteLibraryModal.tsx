import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import useStore from '../../store'
import { alertService } from '../../services/alert'

const ConfirmDeleteLibraryModal = () => {
  const accessToken = useStore(state => state.accessToken)
  const currentLibrary = useStore(state => state.currentLibrary)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const getAndSetCurrentUser = useStore(state => state.getAndSetCurrentUser)
  const showConfirmDeleteLibraryModal = useStore(state => state.showConfirmDeleteLibraryModal)
  const setShowConfirmDeleteLibraryModal = useStore(state => state.setShowConfirmDeleteLibraryModal)

  const deleteButtonRef = useRef<any>()

  const deleteLibrary = async () => {
    if (currentLibrary) {
      try {
        await axios({
          method: 'delete',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${currentLibrary.id}`,
          headers: { Authorization: `${accessToken}` }
        })
        getAndSetCurrentUser()
        setCurrentLibrary(null)
        localStorage.removeItem('currentLibraryId');
        alertService.showSuccess('Library deleted.')
      } catch (error) {
        alertService.showError('Unable to delete library. Please try again.')
        console.error(error)
      } finally {
        setShowConfirmDeleteLibraryModal(false)
      }
    }
  }

  return (
    <Transition.Root show={showConfirmDeleteLibraryModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={deleteButtonRef} onClose={() => setShowConfirmDeleteLibraryModal(false)}>
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
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-800">
                      Delete this library?
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-slate-600">
                      This permanently removes the library and all works in it. This cannot be undone.
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => deleteLibrary()}
                  >
                    Delete library
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    ref={deleteButtonRef}
                    onClick={() => setShowConfirmDeleteLibraryModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ConfirmDeleteLibraryModal
