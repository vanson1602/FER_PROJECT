import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieProvider";

const MovieSearch = ({ title, data }) => {
  const { handleTrailer } = useContext(MovieContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-white px-10 py-6 mb-10">
      <h2 className="uppercase text-xl mb-6">{title}</h2>

      {/* Danh sách phim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {currentData &&
          currentData.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow-xl w-[320px] h-[420px] transition-transform hover:scale-105 duration-300"
            >
              <img
                src={`${process.env.REACT_APP_IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleTrailer(item.id)}
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all"
                >
                  ▶ Xem ngay
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 text-white">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            ◀
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-green-500 font-bold"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

MovieSearch.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieSearch;
