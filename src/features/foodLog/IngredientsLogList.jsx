/* eslint-disable react/prop-types */
import IngredientsLogItem from "./IngredientsLogItem";
function IngredientsLogList({ progressData }) {
  return (
    <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-md max-w-8xl">
      {progressData?.length !== 0 ? (
        progressData?.map((progress, index) => (
          <IngredientsLogItem key={index} progress={progress} />
        ))
      ) : (
        <>
          <h4 className="mb-2 text-2xl font-bold text-gray-800">
            Log Your Ingredients
          </h4>
          <p className="text-gray-600">
            No ingredients entries yet. Start adding your ingredients!
          </p>
        </>
      )}
    </div>
  );
}

export default IngredientsLogList;
