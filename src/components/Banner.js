import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import IconPlay from "../assets/play-button.png";
import { MovieContext } from "../context/MovieProvider";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Custom Arrow Components
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
      aria-label="Previous slide"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
      aria-label="Next slide"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

const Banner = () => {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleTrailer } = useContext(MovieContext);
  const { isAuthenticated, openLoginModal } = useAuth();

  useEffect(() => {
    const fetchBannerMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        };

        // Lấy phim trending để làm banner
        const url =
          "https://api.themoviedb.org/3/trending/movie/week?language=vi&page=1";
        const response = await fetch(url, options);
        const data = await response.json();

        // Chỉ lấy 5 phim đầu để làm banner
        setBannerMovies(data.results.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching banner movies:", error);
        setLoading(false);
      }
    };

    fetchBannerMovies();
  }, []);

  const handleWatchTrailer = (movieId) => {
    if (isAuthenticated) {
      handleTrailer(movieId);
    } else {
      openLoginModal();
    }
  };

  const getRatingStars = (voteAverage) => {
    const rating = Math.round(voteAverage / 2); // Convert 10-point to 5-point scale
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <img key={i} src={IconRating} alt="rating" className="w-6 h-6" />
        );
      } else if (i === rating && voteAverage % 2 >= 1) {
        stars.push(
          <img key={i} src={IconRatingHalf} alt="rating" className="w-6 h-6" />
        );
      } else {
        stars.push(
          <img
            key={i}
            src={IconRating}
            alt="rating"
            className="w-6 h-6 opacity-30"
          />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-black flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative overflow-hidden">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        showDots={true}
        arrows={true}
        renderArrowsWhenDisabled={false}
        pauseOnHover={true}
        swipeable={true}
        draggable={true}
        transitionDuration={800}
        containerClass="carousel-container h-full"
        itemClass="carousel-item-padding-40-px h-full"
        dotListClass="custom-dot-list-style"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {bannerMovies.map((movie, index) => (
          <BannerSlide
            key={movie.id}
            movie={movie}
            movieIndex={index + 1}
            onWatchTrailer={handleWatchTrailer}
            getRatingStars={getRatingStars}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </Carousel>
    </div>
  );
};

const BannerSlide = ({
  movie,
  movieIndex,
  onWatchTrailer,
  getRatingStars,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const { openLoginModal } = useAuth();

  const handleDetailClick = () => {
    if (isAuthenticated) {
      navigate(`/movie/${movie.id}`);
    } else {
      openLoginModal();
    }
  };

  const backgroundImage = movie.backdrop_path
    ? `${process.env.REACT_APP_IMG_URL}${movie.backdrop_path}`
    : `${process.env.REACT_APP_IMG_URL}${movie.poster_path}`;

  const posterImage = movie.poster_path
    ? `${process.env.REACT_APP_IMG_URL}${movie.poster_path}`
    : null;

  return (
    <div
      className="w-full h-[600px] bg-center bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="w-full h-full flex items-center justify-between space-x-8 p-8 relative z-20 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex flex-col space-y-6 items-start w-[55%] animate-fade-in-left">
          <div className="flex items-center space-x-3">
            <span className="text-white bg-gradient-to-r from-red-600 to-red-400 text-sm py-1 px-3 rounded-full font-semibold">
              🔥 Trending
            </span>
            <span className="text-green-400 text-sm font-semibold">
              #{movieIndex} Xu hướng tuần này
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              {movie.title || movie.original_title}
            </h1>

            <div className="flex items-center space-x-2">
              {getRatingStars(movie.vote_average)}
              <span className="text-white text-sm ml-2">
                {movie.vote_average?.toFixed(1)}/10 ({movie.vote_count} đánh
                giá)
              </span>
            </div>

            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl">
              {movie.overview ||
                "Phim hấp dẫn với cốt truyện lôi cuốn và diễn xuất tuyệt vời. Đây là một tác phẩm không thể bỏ lỡ trong năm nay."}
            </p>

            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <span>
                📅{" "}
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
              <span>•</span>
              <span>🎬 Phim lẻ</span>
              <span>•</span>
              <span>🌟 Phổ biến</span>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={() => onWatchTrailer(movie.id)}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <img src={IconPlay} alt="play" className="w-5 h-5" />
                <span>
                  {isAuthenticated ? "Xem Trailer" : "Đăng nhập để xem"}
                </span>
              </button>

              <button
                onClick={handleDetailClick}
                className="flex items-center space-x-2 px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                <span>📋</span>
                <span>Chi tiết</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Movie Poster */}
        {posterImage && (
          <div className="w-[40%] flex items-center justify-center animate-fade-in-right">
            <div className="relative group cursor-pointer">
              <div className="w-[280px] h-[400px] relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={posterImage}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    onClick={() => onWatchTrailer(movie.id)}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300 transform hover:scale-110"
                  >
                    <img src={IconPlay} alt="play" className="w-10 h-10 ml-1" />
                  </div>
                </div>

                {/* Auth Status Badge */}
                {!isAuthenticated && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    🔒 Cần đăng nhập
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default Banner;
