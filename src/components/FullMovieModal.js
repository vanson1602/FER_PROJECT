import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const FullMovieModal = ({ movie, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when movie changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [movie]);

  if (!movie) return null;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          border: "none",
          background: "none",
          overflow: "auto",
          borderRadius: "0",
          outline: "none",
          padding: "20px",
          margin: "0",
          maxWidth: "95vw",
          maxHeight: "95vh",
          width: "100%",
        },
      }}
      contentLabel={`Xem phim: ${movie.title}`}
    >
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-900 to-black border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {movie.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">⭐</span>
                {movie.rating}/10
              </span>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <span className="text-green-400">{movie.genre}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-800 rounded-full"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-white">Đang tải phim...</p>
              </div>
            </div>
          )}

          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie.videoId}?autoplay=1&rel=0&modestbranding=1&fs=1`}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Description */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-3">
                Nội dung phim
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {movie.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600/20 text-red-400 text-sm rounded-full border border-red-600/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Thông tin phim
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Năm sản xuất:</span>
                    <span className="text-white">{movie.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thời lượng:</span>
                    <span className="text-white">{movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Đánh giá:</span>
                    <span className="text-yellow-400">
                      ⭐ {movie.rating}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Thể loại:</span>
                    <span className="text-white">{movie.genre}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  Thêm vào danh sách
                </button>

                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullMovieModal;
