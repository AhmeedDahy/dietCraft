import { useState } from "react";
import { useForm } from "react-hook-form";

function CustomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [result, setResult] = useState(false);

  function onSubmit(data) {
    console.log("Form Data Submitted:", data);
    setResult(true);
  }

  const validationRules = {
    calories: { required: true, min: 0, max: 2000 },
    fatContent: { required: true, min: 0, max: 100 },
    saturatedFatContent: { required: true, min: 0, max: 13 },
    cholesterolContent: { required: true, min: 0, max: 300 },
    sodiumContent: { required: true, min: 0, max: 2300 },
    carbohydrateContent: { required: true, min: 0, max: 325 },
    fiberContent: { required: true, min: 0, max: 50 },
    sugarContent: { required: true, min: 0, max: 40 },
    proteinContent: { required: true, min: 0, max: 40 }
  };

  return (
    <div className="max-w-[900px] mx-auto py-5">
      <div className="pb-5 text-center text-gray-900">
        <h1 className="text-xl font-bold lg:text-4xl">
          Custom Food Recommendation
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-5 border border-gray-200 shadow-lg p-7"
      >
        <h2 className="mb-4 text-lg font-semibold">Nutritional values:</h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {Object.entries(validationRules).map(([field, rules], index) => (
            <div key={index}>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor={field}
              >
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="number"
                id={field}
                {...register(field, rules)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {errors[field] && errors[field].type === "required" && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              {errors[field] && errors[field].type === "min" && (
                <span className="text-sm text-red-500">
                  Minimum value is {rules.min}
                </span>
              )}
              {errors[field] && errors[field].type === "max" && (
                <span className="text-sm text-red-500">
                  Maximum value is {rules.max}
                </span>
              )}
            </div>
          ))}
        </div>
        <h2 className="mb-4 text-lg font-semibold">
          Recommendation options (OPTIONAL):
        </h2>
        <div className="mb-6">
          <label
            htmlFor="numRecommendations"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Number of recommendations
          </label>
          <input
            type="number"
            id="numRecommendations"
            defaultValue={5}
            {...register("numRecommendations", { min: 5, max: 20 })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {errors.numRecommendations &&
            errors.numRecommendations.type === "min" && (
              <span className="text-sm text-red-500">Minimum value is 5</span>
            )}
          {errors.numRecommendations &&
            errors.numRecommendations.type === "max" && (
              <span className="text-sm text-red-500">Maximum value is 20</span>
            )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="ingredients"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Specify ingredients (comma-separated)
          </label>
          <input
            type="text"
            id="ingredients"
            placeholder="e.g., apples, bananas, eggs"
            {...register("ingredients")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-[#095c43] hover:bg-[#053728] transition focus:ring-4 focus:outline-none font-medium rounded-lg text-sm max-md:w-full  px-5 py-2.5 text-white mx-auto"
        >
          Generate
        </button>
      </form>
      {result && (
        <p className="text-center text-green-600">
          Recommendations generated successfully!
        </p>
      )}
    </div>
  );
}

export default CustomForm;
