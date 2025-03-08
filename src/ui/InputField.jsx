/* eslint-disable react/prop-types */
function InputField({
  id,
  label,
  type,
  register,
  validation,
  error,
  defaultValue
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        defaultValue={defaultValue}
        type={type}
        {...register(id, validation)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 shadow-sm focus:ring-green-500 focus:border-green-500"
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
