import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import FullMovieModal from "./FullMovieModal";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    partialVisibilityGutter: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
    partialVisibilityGutter: 2,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
    partialVisibilityGutter: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 2,
  },
};

// Danh sách phim đầy đủ
const fullMovies = [
  {
    id: 1,
    title: "Gái Già Lắm Chiêu",
    videoId: "iXjhuUXUlNE",
    thumbnail: "https://img.youtube.com/vi/iXjhuUXUlNE/maxresdefault.jpg",
    description:
      "Câu chuyện hài hước về những bà mẹ hiện đại với đủ mọi chiêu trò để giữ con cái bên mình.",
    year: "2024",
    genre: "Hài, Gia đình",
    duration: "112 phút",
    rating: 8.2,
  },
  {
    id: 2,
    title: "Gái Già Lắm Chiêu 2",
    videoId: "Vw-gr7Kg2UI",
    thumbnail: "https://img.youtube.com/vi/Vw-gr7Kg2UI/maxresdefault.jpg",
    description:
      "Phần tiếp theo đầy bất ngờ với những tình huống hài hước và cảm động hơn.",
    year: "2024",
    genre: "Hài, Gia đình",
    duration: "118 phút",
    rating: 8.5,
  },
  {
    id: 3,
    title: "Làm Giàu Với Ma",
    videoId: "MtZ_hf7tLxk",
    thumbnail: "https://img.youtube.com/vi/MtZ_hf7tLxk/maxresdefault.jpg",
    description:
      "Chuyện kể về những người trẻ muốn làm giàu nhanh và những điều bất ngờ xảy ra.",
    year: "2024",
    genre: "Hài, Kinh dị",
    duration: "108 phút",
    rating: 7.8,
  },
  {
    id: 4,
    title: "Cám",
    videoId: "H6XYs7mDMus",
    thumbnail: "https://img.youtube.com/vi/H6XYs7mDMus/maxresdefault.jpg",
    description:
      "Phiên bản kinh dị của câu chuyện cổ tích Tấm Cám với góc nhìn mới lạ.",
    year: "2024",
    genre: "Kinh dị, Tâm lý",
    duration: "102 phút",
    rating: 8.0,
  },
  {
    id: 5,
    title: "Lật Mặt 8: Vòng Tay Nắng",
    videoId: "hUlBTt3NyGI",
    thumbnail: "https://img.youtube.com/vi/hUlBTt3NyGI/maxresdefault.jpg",
    description:
      "Phần mới nhất của series Lật Mặt với câu chuyện về tình bạn và lòng trung thành.",
    year: "2024",
    genre: "Hành động, Tâm lý",
    duration: "125 phút",
    rating: 8.3,
  },
  {
    id: 6,
    title: "Trên Bàn Nhậu Dưới Bàn Mưu",
    videoId: "rZYVIK0R6sg",
    thumbnail: "https://img.youtube.com/vi/rZYVIK0R6sg/maxresdefault.jpg",
    description:
      "Bộ phim hài hước về những cuộc nhậu và những âm mưu đằng sau.",
    year: "2024",
    genre: "Hài, Tâm lý",
    duration: "105 phút",
    rating: 7.9,
  },
  {
    id: 7,
    title: "Linh Miêu",
    videoId: "XsPl7SbL2kg",
    thumbnail: "https://img.youtube.com/vi/XsPl7SbL2kg/maxresdefault.jpg",
    description:
      "Bộ phim kinh dị Việt Nam với yếu tố tâm linh và bí ẩn hấp dẫn.",
    year: "2024",
    genre: "Kinh dị, Tâm linh",
    duration: "108 phút",
    rating: 8.2,
  },
  {
    id: 8,
    title: "Nụ Hôn Bạc Tỷ",
    videoId: "wr6MeifZCUs",
    thumbnail: "https://img.youtube.com/vi/wr6MeifZCUs/maxresdefault.jpg",
    description:
      "Câu chuyện tình yêu lãng mạn với những tình huống hài hước và cảm động.",
    year: "2024",
    genre: "Tình cảm, Hài",
    duration: "115 phút",
    rating: 7.8,
  },
  {
    id: 9,
    title: "Bộ Tứ Báo Thủ",
    videoId: "zKMOgOWn8lQ",
    thumbnail: "https://img.youtube.com/vi/zKMOgOWn8lQ/maxresdefault.jpg",
    description:
      "Bộ phim hành động hài với câu chuyện về nhóm bạn trẻ và những cuộc phiêu lưu.",
    year: "2024",
    genre: "Hành động, Hài",
    duration: "120 phút",
    rating: 8.0,
  },
  {
    id: 10,
    title: "Nhà Bà Nữ",
    videoId: "IkaP0KJWTsQ",
    thumbnail: "https://img.youtube.com/vi/IkaP0KJWTsQ/maxresdefault.jpg",
    description:
      "Phim tâm lý gia đình về những mối quan hệ phức tạp trong gia đình truyền thống.",
    year: "2024",
    genre: "Tâm lý, Gia đình",
    duration: "112 phút",
    rating: 8.1,
  },
  {
    id: 11,
    title: "Cô Dâu Hào Môn",
    videoId: "QJ8E9R70csY",
    thumbnail: "https://img.youtube.com/vi/QJ8E9R70csY/maxresdefault.jpg",
    description:
      "Câu chuyện về cuộc sống của một cô gái bước vào gia đình giàu có với nhiều bí mật.",
    year: "2024",
    genre: "Tâm lý, Chính kịch",
    duration: "118 phút",
    rating: 8.3,
  },
  {
    id: 12,
    title: "Yêu Nhầm Bạn Thân",
    videoId: "Z7AbUpnfcW8",
    thumbnail: "https://img.youtube.com/vi/Z7AbUpnfcW8/maxresdefault.jpg",
    description:
      "Câu chuyện tình yêu lãng mạn và hài hước về việc yêu nhầm người bạn thân của mình.",
    year: "2024",
    genre: "Tình cảm, Hài",
    duration: "105 phút",
    rating: 7.9,
  },
  {
    id: 13,
    title: "Mai",
    videoId: "HXWRTGbhb4U",
    thumbnail: "https://img.youtube.com/vi/HXWRTGbhb4U/maxresdefault.jpg",
    description:
      "Bộ phim tâm lý cảm động về cuộc đời và những trải nghiệm của cô gái tên Mai.",
    year: "2024",
    genre: "Tâm lý, Chính kịch",
    duration: "127 phút",
    rating: 8.5,
  },
  {
    id: 14,
    title: "Cua Lại Vợ Bầu",
    videoId: "lhTtrS98uf4",
    thumbnail: "https://img.youtube.com/vi/lhTtrS98uf4/maxresdefault.jpg",
    description:
      "Phim hài tình cảm về hành trình cua lại người vợ đang mang thai của mình.",
    year: "2024",
    genre: "Hài, Tình cảm",
    duration: "113 phút",
    rating: 7.7,
  },
  {
    id: 15,
    title: "Gặp Lại Chị Bầu",
    videoId: "Gggw9jwr1h4",
    thumbnail: "https://img.youtube.com/vi/Gggw9jwr1h4/maxresdefault.jpg",
    description:
      "Câu chuyện tình yêu và gia đình với những tình huống dễ thương và cảm động.",
    year: "2024",
    genre: "Tình cảm, Gia đình",
    duration: "109 phút",
    rating: 8.0,
  },
  {
    id: 16,
    title: "Chị Chị Em Em",
    videoId: "j3r7kq0UZMw",
    thumbnail: "https://img.youtube.com/vi/j3r7kq0UZMw/maxresdefault.jpg",
    description:
      "Phim về mối quan hệ chị em và những câu chuyện cuộc sống đầy cảm xúc.",
    year: "2024",
    genre: "Tâm lý, Gia đình",
    duration: "116 phút",
    rating: 8.2,
  },
  {
    id: 17,
    title: "Nhà Gia Tiên",
    videoId: "hXGozmNBwt4",
    thumbnail: "https://img.youtube.com/vi/hXGozmNBwt4/maxresdefault.jpg",
    description:
      "Bộ phim kinh dị về ngôi nhà cổ với những bí ẩn đáng sợ và linh hồn oan nghiệt.",
    year: "2024",
    genre: "Kinh dị, Tâm linh",
    duration: "115 phút",
    rating: 8.1,
  },
  {
    id: 18,
    title: "Chìa Khoá Trăm Tỷ",
    videoId: "OhQW4eX1NPI",
    thumbnail: "https://img.youtube.com/vi/OhQW4eX1NPI/maxresdefault.jpg",
    description:
      "Bộ phim hành động ly kỳ về cuộc đua giành chiếc chìa khoá bí ẩn trị giá trăm tỷ.",
    year: "2024",
    genre: "Hành động, Ly kỳ",
    duration: "122 phút",
    rating: 8.0,
  },
  {
    id: 19,
    title: "Mắt Biếc",
    videoId: "ITlQ0oU7tDA",
    thumbnail: "https://img.youtube.com/vi/ITlQ0oU7tDA/maxresdefault.jpg",
    description:
      "Chuyển thể từ tiểu thuyết nổi tiếng, câu chuyện tình yêu thuần khiết và đầy cảm xúc.",
    year: "2019",
    genre: "Tình cảm, Chính kịch",
    duration: "117 phút",
    rating: 8.4,
  },
  {
    id: 20,
    title: "Sắc Đẹp Dối Trá",
    videoId: "gknlpnjWJ-M",
    thumbnail: "https://img.youtube.com/vi/gknlpnjWJ-M/maxresdefault.jpg",
    description:
      "Câu chuyện đầy twist về những bí mật đằng sau vẻ ngoài hoàn hảo.",
    year: "2024",
    genre: "Tâm lý, Chính kịch",
    duration: "118 phút",
    rating: 8.2,
  },
  {
    id: 21,
    title: "Đất Rừng Phương Nam",
    videoId: "hktzirCnJmQ",
    thumbnail: "https://img.youtube.com/vi/hktzirCnJmQ/maxresdefault.jpg",
    description:
      "Tác phẩm kinh điển về cuộc sống miền Nam với thiên nhiên hùng vĩ và con người chất phác.",
    year: "2023",
    genre: "Chính kịch, Gia đình",
    duration: "135 phút",
    rating: 8.6,
  },
  {
    id: 22,
    title: "Quỷ Cẩu",
    videoId: "Cswx649vXVw",
    thumbnail: "https://img.youtube.com/vi/Cswx649vXVw/maxresdefault.jpg",
    description:
      "Bộ phim kinh dị đầy ám ảnh về những con quỷ hung dữ và lời nguyền kinh hoàng.",
    year: "2024",
    genre: "Kinh dị, Siêu nhiên",
    duration: "102 phút",
    rating: 7.9,
  },

  {
    id: 24,
    title: "Kẻ Ăn Hồn",
    videoId: "xWh0g4rKGjI",
    thumbnail: "https://img.youtube.com/vi/xWh0g4rKGjI/maxresdefault.jpg",
    description:
      "Câu chuyện kinh hoàng về sinh vật bí ẩn săn lùng và nuốt chửng linh hồn con người.",
    year: "2024",
    genre: "Kinh dị, Tâm linh",
    duration: "110 phút",
    rating: 8.0,
  },

  {
    id: 26,
    title: "Lật Mặt 5: 48H",
    videoId: "Zw9lINmT-zc",
    thumbnail: "https://img.youtube.com/vi/Zw9lINmT-zc/maxresdefault.jpg",
    description:
      "Phần mới nhất của series Lật Mặt với 48 giờ đầy căng thẳng và hành động gay cấn.",
    year: "2024",
    genre: "Hành động, Tâm lý",
    duration: "130 phút",
    rating: 8.5,
  },
];

const FullMovieList = ({ selectedGenre = "all", searchTerm = "" }) => {
  const { isAuthenticated, openLoginModal } = useAuth();
  const location = useLocation();
  const isMoviesView = location.pathname === "/movies";
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Add null check for fullMovies
  if (!fullMovies || !Array.isArray(fullMovies)) {
    return null;
  }

  const handleMovieClick = (movie) => {
    if (isAuthenticated) {
      setSelectedMovie(movie);
      setShowModal(true);
    } else {
      openLoginModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // Map genre IDs to Vietnamese genre names
  const genreMapping = {
    horror: ["Kinh dị", "Tâm linh"],
    action: ["Hành động", "Chiến tranh"],
    comedy: ["Hài", "Hài hước"],
    romance: ["Tình cảm", "Lãng mạn"],
    drama: ["Tâm lý", "Chính kịch"],
    family: ["Gia đình"],
  };

  // Filter movies based on selected genre and search term
  const filteredMovies = fullMovies.filter((movie) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by genre
    let matchesGenre = true;
    if (selectedGenre !== "all") {
      const genreKeywords = genreMapping[selectedGenre] || [];
      matchesGenre = genreKeywords.some((keyword) =>
        movie.genre.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="bg-gradient-to-b from-[#1a1a1a]/95 via-[#0f0f0f]/95 to-black/95 text-white px-6 py-10 mb-10 min-h-screen backdrop-blur-sm">
      {!isMoviesView && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            🎬 Phim Điện Ảnh
          </h2>
          {!isAuthenticated && (
            <span className="text-orange-500 text-sm font-medium bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
              </svg>
              Đăng nhập để xem phim đầy đủ
            </span>
          )}
        </div>
      )}

      {isMoviesView && (
        <div className="text-center mb-8">
          <p className="text-gray-400 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-lg">
            {filteredMovies.length > 0 ? (
              <>
                Tìm thấy{" "}
                <span className="font-bold text-blue-400">
                  {filteredMovies.length}
                </span>{" "}
                phim
                {searchTerm && (
                  <span className="text-gray-300">
                    {" "}cho "<span className="text-blue-400 font-medium">{searchTerm}</span>"
                  </span>
                )}
                {selectedGenre !== "all" && (
                  <span className="text-gray-300">
                    {" "}trong thể loại{" "}
                    <span className="font-medium text-green-400">
                      {[
                        "horror",
                        "action",
                        "comedy",
                        "romance",
                        "drama",
                        "family",
                      ].find((g) => g === selectedGenre)
                        ? [
                          "Kinh dị",
                          "Hành động",
                          "Hài hước",
                          "Tình cảm",
                          "Tâm lý",
                          "Gia đình",
                        ][
                        [
                          "horror",
                          "action",
                          "comedy",
                          "romance",
                          "drama",
                          "family",
                        ].indexOf(selectedGenre)
                        ]
                        : "Khác"}
                    </span>
                  </span>
                )}
              </>
            ) : (
              "Không tìm thấy phim phù hợp"
            )}
          </p>
        </div>
      )}

      {isMoviesView ? (
        <div className="flex justify-center w-full">
          {filteredMovies.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-7xl mb-6 animate-bounce">🎬</div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                Không tìm thấy phim
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                {searchTerm
                  ? `Không có phim nào phù hợp với "${searchTerm}"`
                  : "Không có phim nào trong thể loại này"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 font-medium"
              >
                Xem tất cả phim
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 max-w-screen-2xl">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                  isAuthenticated={isAuthenticated}
                  isMoviesView={isMoviesView}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          className="flex items-center"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
        >
          {fullMovies.map((movie) => (
            <div key={movie.id} className="px-2">
              <MovieCard
                movie={movie}
                onClick={() => handleMovieClick(movie)}
                isAuthenticated={isAuthenticated}
                isMoviesView={false}
              />
            </div>
          ))}
        </Carousel>
      )}

      {showModal && selectedMovie && (
        <FullMovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

const MovieCard = ({ movie, onClick, isAuthenticated, isMoviesView }) => {
  const cardSize = isMoviesView
    ? "w-[320px] h-[500px]"
    : "w-[280px] h-[440px]";

  return (
    <div
      className={`${cardSize} relative group cursor-pointer transform transition-all duration-500 hover:z-10`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className={`group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500 ease-out ${isMoviesView ? "w-full h-full" : "w-full h-full"}`}>
        <div className={`relative w-full ${isMoviesView ? "h-[260px]" : "h-[220px]"} overflow-hidden rounded-t-xl`}>
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `${process.env.REACT_APP_IMG_URL}/placeholder.jpg`;
            }}
          />

          {/* Overlay khi hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            {isAuthenticated ? (
              <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 transform group-hover:scale-110 transition-all duration-500 shadow-lg shadow-red-500/50">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Xem phim</p>
              </div>
            ) : (
              <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-3">
                  <svg
                    className="w-12 h-12 text-yellow-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium mb-3">
                  Đăng nhập để xem
                </p>
                <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg shadow-green-500/50 transform hover:scale-105">
                  Đăng nhập ngay
                </button>
              </div>
            )}
          </div>

          {/* Badge trạng thái */}
          {!isAuthenticated && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
              </svg>
              VIP
            </div>
          )}
        </div>

        {/* Thông tin phim */}
        <div className={`bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-b-xl border border-gray-700/50 ${isMoviesView ? "h-[240px]" : "h-[220px]"} flex flex-col backdrop-blur-sm shadow-xl`}>
          <h3 className="text-gray-100 text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {movie.title}
          </h3>

          <div className="flex items-center mb-3 text-sm">
            <div className="flex items-center bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{movie.rating}</span>
            </div>
            <span className="text-gray-600 mx-2">•</span>
            <span className="text-gray-400 font-medium">{movie.year}</span>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {movie.genre.split(", ").map((genre, index) => (
              <span key={index} className="text-blue-400 text-xs bg-blue-400/10 px-3 py-1 rounded-full font-medium border border-blue-400/20">
                {genre}
              </span>
            ))}
            <span className="text-gray-400 text-xs bg-gray-700/50 px-3 py-1 rounded-full font-medium">
              {movie.duration}
            </span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-3 flex-1 group-hover:text-gray-300 transition-colors duration-300">
            {movie.description}
          </p>

          <button className={`mt-4 w-full py-3 rounded-lg font-medium transition-all duration-500 transform group-hover:scale-105 ${isAuthenticated
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25"
              : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-300"
            }`}>
            {isAuthenticated ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Xem ngay
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
                </svg>
                Cần đăng nhập
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullMovieList;
