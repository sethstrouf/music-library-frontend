import { FormEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { alertService } from '../../services/alert'
import axios from 'axios'
import useStore from '../../store'
import { IWork } from '../../common/types'
import TextInput from '../TextInput'
import SelectInput from '../SelectInput'

type Props = {
  handleSearch: () => void
  selectedWork: IWork | null
}

const EditWorkModal = ({ handleSearch, selectedWork } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const showEditWorkModal = useStore(state => state.showEditWorkModal)
  const setShowEditWorkModal = useStore(state => state.setShowEditWorkModal)

  const DURATIONS = useStore(state => state.DURATIONS)
  const TEMPI = useStore(state => state.TEMPI)
  const GENRES = useStore(state => state.GENRES)
  const SEASONS = useStore(state => state.SEASONS)
  const ENSEMBLES = useStore(state => state.ENSEMBLES)
  const VOICINGS = useStore(state => state.VOICINGS)
  const INSTRUMENTATIONS = useStore(state => state.INSTRUMENTATIONS)
  const DIFFICULTIES = useStore(state => state.DIFFICULTIES)

  const [title, setTitle] = useState<string>(selectedWork!.attributes.title || '')
  const [composer, setComposer] = useState<string>(selectedWork!.attributes.composer || '')
  const [arranger, setArranger] = useState<string>(selectedWork!.attributes.arranger || '')
  const [editor, setEditor] = useState<string>(selectedWork!.attributes.editor || '')
  const [lyricist, setLyricist] = useState<string>(selectedWork!.attributes.lyricist || '')
  const [text, setText] = useState<string>(selectedWork!.attributes.text || '')
  const [publisher, setPublisher] = useState<string>(selectedWork!.attributes.publisher || '')
  const [publishingYear, setPublishingYear] = useState<any>(selectedWork!.attributes.publishing_year || '')
  const [language, setLanguage] = useState<any>(selectedWork!.attributes.language || '')

  const [tempo, setTempo] = useState<any>(selectedWork!.attributes.tempo || '')
  const [duration, setDuration] = useState<any>(selectedWork!.attributes.duration || '')
  const [genre, setGenre] = useState<string>(selectedWork!.attributes.genre || '')
  const [season, setSeason] = useState<any>(selectedWork!.attributes.season || '')
  const [ensemble, setEnsemble] = useState<any>(selectedWork!.attributes.ensemble || '')
  const [voicing, setVoicing] = useState<any>(selectedWork!.attributes.voicing || '')
  const [instrumentation, setInstrumentation] = useState<any>(selectedWork!.attributes.instrumentation || '')
  const [difficulty, setDifficulty] = useState<any>(selectedWork!.attributes.difficulty || '')

  const addButton = useRef<any>()

  const updateWork = async (e: FormEvent | MouseEvent) => {
    e.preventDefault()

    const data = {
      title: title, composer: composer, arranger: arranger, editor: editor,
      lyricist: lyricist, genre: genre, text: text, publisher: publisher,
      publishing_year: publishingYear, language: language, duration: duration,
      tempo: tempo, season: season, ensemble: ensemble, voicing: voicing,
      instrumentation: instrumentation, difficulty: difficulty
    }

    try {
      await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/works/${selectedWork!.id}`,
        data: { work: data },
        headers: { Authorization: `${accessToken}` }
      })
      handleSearch()
      alertService.showSuccess(`${selectedWork?.attributes.title} updated successfully!`)
      setShowEditWorkModal(false)
    } catch (err) {
      console.error(err)
      if (title == '') {
        alertService.showError('Title required')
      }
      if (composer == '' && arranger == '') {
        alertService.showError('Composer or arranger required')
      }
      if (title != '' && composer != '' && arranger != '') {
        alertService.showError('Failed to update')
      }
    }
  }

  return (
    <Transition.Root show={showEditWorkModal} as={Fragment}>
      <Dialog as="div" initialFocus={addButton} className="relative z-10" onClose={() => setShowEditWorkModal(false)}>
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
                      {selectedWork!.attributes.title}
                    </Dialog.Title>
                  </div>

                  <div>
                    <div className="sm:pl-20 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                        <TextInput label='Title' value={title} setter={setTitle} />
                        <TextInput label='Composer' value={composer} setter={setComposer} />
                        <TextInput label='Arranger' value={arranger} setter={setArranger} />
                        <TextInput label='Editor' value={editor} setter={setEditor} />
                        <TextInput label='Lyricist' value={lyricist} setter={setLyricist} />
                        <TextInput label='Text' value={text} setter={setText} />
                        <TextInput label='Publisher' value={publisher} setter={setPublisher} />
                        <TextInput label='Publishing Year' value={publishingYear} setter={setPublishingYear} />
                        <TextInput label='Language' value={language} setter={setLanguage} />
                      </div>
                    </div>

                    <div className="sm:pl-20 space-y-6 sm:space-y-5 pt-4">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                        <SelectInput label='Duration' value={duration} setter={setDuration} options={DURATIONS} />
                        <SelectInput label='Tempo' value={tempo} setter={setTempo} options={TEMPI} />
                        <SelectInput label='Genre' value={genre} setter={setGenre} options={GENRES} />
                        <SelectInput label='Season' value={season} setter={setSeason} options={SEASONS} />
                        <SelectInput label='Ensemble' value={ensemble} setter={setEnsemble} options={ENSEMBLES} />
                        <SelectInput label='Voicing' value={voicing} setter={setVoicing} options={VOICINGS} />
                        <SelectInput label='Instrumentation' value={instrumentation} setter={setInstrumentation} options={INSTRUMENTATIONS} />
                        <SelectInput label='Difficulty' value={difficulty} setter={setDifficulty} options={DIFFICULTIES} />
                      </div>
                    </div>

                    <div className="sm:pl-20 space-y-6 sm:space-y-5 pt-4">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                      </div>
                    </div>
                  </div>

                <div className="mt-5 sm:mt-12 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    ref={addButton}
                    onClick={(e) => updateWork(e)}
                  >
                    Update Work
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setShowEditWorkModal(false)}
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

export default EditWorkModal
