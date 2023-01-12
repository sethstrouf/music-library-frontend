import { v4 as uuidv4 } from 'uuid'

type Props = {
  label: string
  value: any
  setter: (active: any) => void
  options: any
}

const SelectInput = ({label, value, setter, options}: Props ) => {

  return (
    <>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {label}
      </label>
      <select
        id={label}
        name={label}
        className="mx-auto w-44 block rounded-md border-gray-300 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        onChange={e => setter(e.target.value)}
        value={value}
      >
        {options.map((option: any) => (
          <option key={uuidv4()} value={option.value}>{option.label}</option>
        ))}
      </select>
      <br />
    </>
  )

}

export default SelectInput
