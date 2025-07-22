import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieProvider";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 2,
    partialVisibilityGutter: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    slidesToSlide: 2,
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
};

// Updated genre mapping based on TMDB TV genres
const genreMap = {
  all: null,
  drama: [18], // Drama
  comedy: [35], // Comedy
  action: [10759], // Action & Adventure
  crime: [80], // Crime
  reality: [10764, 10767], // Reality, Talk Show
  romance: [10749], // Romance
  documentary: [99], // Documentary
};

const TVShowCard = ({ show, allGenres }) => {
  const { handleTrailer } = useContext(MovieContext);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const posterUrl = show.poster_path
    ? `${imageBaseUrl}w500${show.poster_path}`
    : `https://via.placeholder.com/500x750?text=${encodeURIComponent(
        show.name
      )}`;

  const handleClick = () => {
    // Call API to get trailer for TV show
    handleTrailer(show.id, "tv", show.name);
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || !allGenres.length) return [];
    return genreIds
      .slice(0, 2) // Only show first 2 genres
      .map((id) => allGenres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
  };

  const genres = getGenreNames(show.genre_ids);

  return (
    <div className="mx-2 mb-8 h-full">
      <div className="bg-[#1f1f1f] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group h-full flex flex-col">
        {/* Poster Image */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/500x750?text=${encodeURIComponent(
                show.name
              )}`;
            }}
          />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-[#1f1f1f]/80 text-yellow-400 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
            <span>⭐</span> {show.vote_average?.toFixed(1)}/10
          </div>

          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleClick}
          >
            <div className="bg-blue-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-blue-700">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l7-5-7-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <div className="mb-2">
            <h3 className="font-bold text-lg text-white group-hover:text-blue-500 transition-colors leading-tight">
              {show.name}
            </h3>
          </div>

          {/* Year & Duration */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-sm">
              {show.first_air_date
                ? new Date(show.first_air_date).getFullYear()
                : "N/A"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">
              {show.number_of_episodes || "?"} tập
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-2">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-[#2a2a2a] text-gray-300 text-xs rounded"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">
            {show.overview || "Không có mô tả"}
          </p>

          {/* Watch Button */}
          <button
            onClick={handleClick}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-all duration-300 font-semibold text-sm mt-auto"
          >
            ▶ Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
};

const TVShowList = ({ selectedGenre = "all", searchTerm = "" }) => {
  const [tvShows, setTvShows] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const API_KEY = "58c8fdd15c1cfa3f207475f3e669f539";

  useEffect(() => {
    fetchGenres();
    fetchTVShows();
  }, [page]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=vi-VN",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4ZmRkMTVjMWNmYTNmMjA3NDc1ZjNlNjY5ZjUzOSIsIm5iZiI6MTc1MTcyNzc0OC4wOTIsInN1YiI6IjY4NjkzZTg0NDQ1ZjVhYWQxYzcwMjNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVp__O0YYWl7bP2VRFd5xi4cdr-iNnNaaSPUg9s_PPM`,
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setAllGenres(data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchTVShows = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?language=vi-VN&page=${page}&sort_by=popularity.desc&with_original_language=en`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4ZmRkMTVjMWNmYTNmMjA3NDc1ZjNlNjY5ZjUzOSIsIm5iZiI6MTc1MTcyNzc0OC4wOTIsInN1YiI6IjY4NjkzZTg0NDQ1ZjVhYWQxYzcwMjNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVp__O0YYWl7bP2VRFd5xi4cdr-iNnNaaSPUg9s_PPM`,
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTvShows((prevShows) => {
          const newShows = [...prevShows, ...(data.results || [])];
          // Remove duplicates based on id
          return Array.from(
            new Map(newShows.map((show) => [show.id, show])).values()
          );
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching TV shows:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTVShows = tvShows.filter((show) => {
    const matchesSearch =
      searchTerm === "" ||
      show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (show.overview &&
        show.overview.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesGenre = true;
    if (selectedGenre !== "all" && genreMap[selectedGenre]) {
      const selectedGenreIds = genreMap[selectedGenre];
      matchesGenre =
        show.genre_ids &&
        show.genre_ids.some((id) => selectedGenreIds.includes(id));
    }

    return matchesSearch && matchesGenre;
  });

  const searchTVShows = async (query) => {
    if (!query.trim()) {
      fetchTVShows();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          query
        )}&language=vi-VN&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4ZmRkMTVjMWNmYTNmMjA3NDc1ZjNlNjY5ZjUzOSIsIm5iZiI6MTc1MTcyNzc0OC4wOTIsInN1YiI6IjY4NjkzZTg0NDQ1ZjVhYWQxYzcwMjNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVp__O0YYWl7bP2VRFd5xi4cdr-iNnNaaSPUg9s_PPM`,
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTvShows(data.results || []);
      }
    } catch (err) {
      console.error("Error searching TV shows:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchTVShows(searchTerm);
      } else {
        setPage(1);
        setTvShows([]);
        fetchTVShows();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && tvShows.length === 0) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-blue-400">Đang tải TV shows...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="text-red-500 text-xl">❌ Lỗi: {error}</div>
        <button
          onClick={fetchTVShows}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!tvShows || tvShows.length === 0) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-2xl font-bold text-blue-400 mb-2">
          Không tìm thấy TV Show
        </h3>
        <p className="text-gray-400">
          {searchTerm
            ? `Không có TV Show nào phù hợp với "${searchTerm}"`
            : "Không có TV Show nào trong thể loại này"}
        </p>
        <button
          onClick={() => {
            setPage(1);
            setTvShows([]);
            fetchTVShows();
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Xem tất cả TV Show
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          📺 TV Shows{" "}
          {searchTerm
            ? `(Kết quả tìm kiếm: ${filteredTVShows.length})`
            : `(${filteredTVShows.length} shows)`}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setPage(1);
              setTvShows([]);
              fetchTVShows();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 Làm mới
          </button>
          {!searchTerm && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📥 Tải thêm
            </button>
          )}
        </div>
      </div>
      {/* Carousel */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 text-xl">Đang tải...</div>
        </div>
      ) : !filteredTVShows || filteredTVShows.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 text-xl">Không tìm thấy chương trình nào</div>
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={!searchTerm} // Không auto play khi đang search
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-equal-height px-2"
          sliderClass="carousel-slider"
          arrows={true}
          showDots={false}
          swipeable={true}
          draggable={true}
        >
          {filteredTVShows.map((show) => (
            <TVShowCard key={show.id} show={show} allGenres={allGenres} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

const TVShowCard = ({ show, allGenres }) => {
  const { handleTrailer } = useContext(MovieContext);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const posterUrl = show.poster_path
    ? `${imageBaseUrl}w500${show.poster_path}`
    : `https://via.placeholder.com/500x750?text=${encodeURIComponent(
      show.name
    )}`;

  const handleClick = () => {
    // Gọi API để lấy trailer cho TV show
    handleTrailer(show.id, "tv", show.name);
  };

  // Lấy tên thể loại
  const getGenreNames = (genreIds) => {
    if (!genreIds || !allGenres.length) return [];
    return genreIds
      .slice(0, 2) // Chỉ hiển thị 2 thể loại đầu
      .map((id) => allGenres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
  };

  const genres = getGenreNames(show.genre_ids);

  return (
    <div className="mx-2 mb-8 h-full">
      <div className="bg-[#0f1117] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group h-full flex flex-col">
        {/* Poster Image */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={posterUrl}
            alt={show.name}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/500x750?text=${encodeURIComponent(
                show.name
              )}`;
            }}
          />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-[#0f1117]/80 text-yellow-400 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
            <span>⭐</span> {show.vote_average?.toFixed(1)}/10
          </div>

          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleClick}
          >
            <div className="bg-red-600 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-red-700">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l7-5-7-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <div className="mb-2">
            <h3 className="font-bold text-lg text-white group-hover:text-red-500 transition-colors leading-tight">
              {show.name}
            </h3>
          </div>
    

      {loading && tvShows.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-blue-400">Đang tải thêm...</p>
        </div>
      )}
    </div>
  );
};

export default TVShowList;
