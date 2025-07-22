import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieProvider";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const { handleTrailer } = useContext(MovieContext);
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  // Add early return if data is undefined or null
  if (!data) {
    return null;
  }

  const handleMovieClick = (movieId) => {
    if (isAuthenticated) {
      navigate(`/movie/${movieId}`);
    } else {
      openLoginModal();
    }
  };

  return (
    <div className="text-gray-800 p-10 mb-10">
      <h2 className="uppercase text-xl mb-4 font-bold">{title}</h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-[220px] h-[320px] relative group"
            onClick={() => handleMovieClick(item.id)}
          >
            <div
              className="group-hover:scale-105 cursor-pointer
                            transition-transform duration-500 ease-in-out w-full h-full"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay khi chưa login */}
                {!isAuthenticated && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <div className="mb-3">
                        <svg
                          className="w-12 h-12 text-green-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
                          <path d="M10 9V7a2 2 0 114 0v2" />
                        </svg>
                      </div>
                      <p className="text-white text-sm font-semibold mb-2">
                        Đăng nhập để xem phim
                      </p>
                      <button className="bg-green-400 text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-green-500 transition-colors">
                        Đăng nhập ngay
                      </button>
                    </div>
                  </div>
                )}

                {/* Overlay khi đã login */}
                {isAuthenticated && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2 transform group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white text-sm font-semibold">
                        Xem ngay
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-2 right-2">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {item.title || item.original_title}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-gray-300 text-xs ml-1">
                      {item.vote_average?.toFixed(1)}
                    </span>
                    {!isAuthenticated && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        🔒
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieList;
