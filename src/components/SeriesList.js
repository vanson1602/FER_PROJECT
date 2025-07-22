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

// Mapping genre IDs cho phim bộ
const genreMap = {
  all: null,
  drama: [18], // Drama
  comedy: [35], // Comedy
  action: [10759], // Action & Adventure
  crime: [80], // Crime
  mystery: [9648], // Mystery
  scifi: [10765], // Sci-Fi & Fantasy
  family: [10751], // Family
};

const SeriesList = ({ selectedGenre = "all", searchTerm = "" }) => {
  const [series, setSeries] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API key từ Bearer token
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4ZmRkMTVjMWNmYTNmMjA3NDc1ZjNlNjY5ZjUzOSIsIm5iZiI6MTc1MTcyNzc0OC4wOTIsInN1YiI6IjY4NjkzZTg0NDQ1ZjVhYWQxYzcwMjNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVp__O0YYWl7bP2VRFd5xi4cdr-iNnNaaSPUg9s_PPM";

  useEffect(() => {
    fetchGenres();
    fetchSeries();
  }, []);

  // Fetch danh sách thể loại từ TMDB
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=vi-VN",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
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

  const fetchSeries = async () => {
    try {
      setLoading(true);

      // Fetch multiple pages để có nhiều series hơn
      const pages = [1, 2, 3];
      const allResults = [];

      for (const page of pages) {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/airing_today?language=vi-VN&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          allResults.push(...(data.results || []));
        }
      }

      setSeries(allResults);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching series:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cải thiện filter với genre thực tế
  const filteredSeries = series.filter((show) => {
    // Filter theo search term
    const matchesSearch =
      searchTerm === "" ||
      show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (show.overview &&
        show.overview.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter theo genre
    let matchesGenre = true;
    if (selectedGenre !== "all" && genreMap[selectedGenre]) {
      const selectedGenreIds = genreMap[selectedGenre];
      matchesGenre =
        show.genre_ids &&
        show.genre_ids.some((id) => selectedGenreIds.includes(id));
    }

    return matchesSearch && matchesGenre;
  });

  // Hàm tìm kiếm theo TMDB API
  const searchSeries = async (query) => {
    if (!query.trim()) {
      fetchSeries();
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
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSeries(data.results || []);
      }
    } catch (err) {
      console.error("Error searching series:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when searchTerm changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchSeries(searchTerm);
      } else {
        fetchSeries();
      }
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-purple-400">Đang tải phim bộ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="text-red-500 text-xl">❌ Lỗi: {error}</div>
        <button
          onClick={fetchSeries}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!series || series.length === 0) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a]">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-2xl font-bold text-purple-400 mb-2">
          Không tìm thấy phim bộ
        </h3>
        <p className="text-gray-400">
          {searchTerm
            ? `Không có phim bộ nào phù hợp với "${searchTerm}"`
            : "Không có phim bộ nào trong thể loại này"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Xem tất cả phim bộ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📺 Phim Bộ{" "}
          {searchTerm
            ? `(Kết quả tìm kiếm: ${filteredSeries.length})`
            : `Đang Phát Sóng (${filteredSeries.length} phim)`}
        </h2>
        <button
          onClick={fetchSeries}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          🔄 Làm mới
        </button>
      </div>

      {/* Carousel */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 text-xl">Đang tải...</div>
        </div>
      ) : !filteredSeries || filteredSeries.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600 text-xl">Không tìm thấy phim bộ nào</div>
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
          {filteredSeries.map((show) => (
            <SeriesCard key={show.id} show={show} allGenres={allGenres} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

const SeriesCard = ({ show, allGenres }) => {
  const { handleTrailer } = useContext(MovieContext);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const posterUrl = show.poster_path
    ? `${imageBaseUrl}w500${show.poster_path}`
    : `https://via.placeholder.com/500x750?text=${encodeURIComponent(
      show.name
    )}`;

  const handleClick = () => {
    // Gọi API để lấy trailer cho TV series
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

          {/* Air Date Badge */}
          {show.first_air_date && (
            <div className="absolute top-3 left-3 bg-[#0f1117]/80 text-gray-200 px-2 py-1 rounded text-xs font-bold">
              📅 {new Date(show.first_air_date).getFullYear()}
            </div>
          )}

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

          {/* Year & Episodes */}
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
                className="px-2 py-0.5 bg-[#1f2937] text-gray-300 text-xs rounded"
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

export default SeriesList;
