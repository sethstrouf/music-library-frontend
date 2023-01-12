type Props = {
  label: string
  value: string
  setter: (active: any) => void
}

const TextInput = ({label, value, setter}: Props ) => {

  return (
    <>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <input
          type="text"
          name={label}
          id={label}
          className="block w-44 mx-auto sm:mx-0 max-w-lg rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:max-w-xs sm:text-sm text-center sm:text-left"
          value={value}
          onChange={(e) => {setter(e.target.value)}}
        />
      </div>
    </>
  )

}

export default TextInput
