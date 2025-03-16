/* eslint-disable react/prop-types */
function SelectField({ id, label, options, register, validation, error }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={id}
        {...register(id, validation)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        <option value="" disabled hidden selected>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default SelectField;
