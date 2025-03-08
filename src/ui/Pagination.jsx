/* eslint-disable react/prop-types */
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startEntry = (currentPage - 1) * postsPerPage + 1;
  const endEntry = Math.min(currentPage * postsPerPage, totalPosts);

  const handlePaginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-end">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900">{startEntry}</span> to{" "}
        <span className="font-semibold text-gray-900">{endEntry}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalPosts}</span>{" "}
        Entries
      </span>

      <div className="inline-flex justify-between w-full mt-2 xs:mt-0 sm:justify-end">
        <button
          onClick={() => handlePaginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 justify-center transition px-4 h-10 text-base font-medium text-white border rounded-s ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-900"
          }`}
        >
          <IoMdArrowBack />
          Prev
        </button>

        <button
          onClick={() => handlePaginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 justify-center transition px-4 h-10 text-base font-medium text-white border-0 border-s rounded-e ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-900"
          }`}
        >
          Next
          <IoMdArrowForward />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
