import { createContext } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { useState, useRef, useCallback } from "react";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 1,
    rel: 0,
    showinfo: 0,
    modestbranding: 1,
  },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const playerRef = useRef(null);
  const isCleaningUp = useRef(false);

  // API key - sử dụng environment variable hoặc fallback
  const API_KEY =
    process.env.REACT_APP_API_KEY ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGM4ZmRkMTVjMWNmYTNmMjA3NDc1ZjNlNjY5ZjUzOSIsIm5iZiI6MTc1MTcyNzc0OC4wOTIsInN1YiI6IjY4NjkzZTg0NDQ1ZjVhYWQxYzcwMjNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VVp__O0YYWl7bP2VRFd5xi4cdr-iNnNaaSPUg9s_PPM";

  const handleTrailer = async (id, type = "movie", title = "") => {
    setTrailerKey("");
    setCurrentTitle(title);
    isCleaningUp.current = false;

    try {
      // URL khác nhau cho movie và TV show
      const url =
        type === "movie"
          ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
          : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Ưu tiên trailer, nếu không có thì lấy video đầu tiên
        const trailer =
          data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          ) || data.results.find((video) => video.site === "YouTube");

        if (trailer) {
          setTrailerKey(trailer.key);
          setModalIsOpen(true);
        } else {
          alert(
            "Không tìm thấy trailer cho " +
              (type === "movie" ? "phim" : "chương trình") +
              " này"
          );
        }
      } else {
        alert(
          "Không có video nào khả dụng cho " +
            (type === "movie" ? "phim" : "chương trình") +
            " này"
        );
      }
    } catch (error) {
      setModalIsOpen(false);
      console.error("Error fetching trailer:", error);
      alert("Có lỗi khi tải trailer. Vui lòng thử lại sau.");
    }
  };

  const closeModal = useCallback(() => {
    if (isCleaningUp.current) return;
    isCleaningUp.current = true;

    // Đóng modal ngay lập tức
    setModalIsOpen(false);
    setTrailerKey("");
    setCurrentTitle("");

    // Reset cleanup flag và player ref
    setTimeout(() => {
      playerRef.current = null;
      isCleaningUp.current = false;
    }, 500);
  }, []);

  // YouTube player event handlers
  const onPlayerReady = useCallback((event) => {
    if (!isCleaningUp.current) {
      playerRef.current = event.target;
    }
  }, []);

  const onPlayerError = useCallback(
    (error) => {
      console.error("YouTube player error:", error);
      closeModal();
    },
    [closeModal]
  );

  const onPlayerEnd = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <MovieContext.Provider value={{ handleTrailer, closeModal }}>
      {children}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%,-50%)",
              padding: "20px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#000",
              maxWidth: "90vw",
              maxHeight: "90vh",
            },
          }}
          contentLabel="Video Trailer"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className="text-center">
            {currentTitle && (
              <h3 className="text-white text-xl font-bold mb-4">
                🎬 {currentTitle}
              </h3>
            )}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-red-400 text-2xl font-bold z-10"
            >
              ✕
            </button>
            {trailerKey && (
              <YouTube
                videoId={trailerKey}
                opts={opts}
                onReady={onPlayerReady}
                onError={onPlayerError}
                onEnd={onPlayerEnd}
              />
            )}
          </div>
        </Modal>
      )}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node,
};

export { MovieProvider, MovieContext };
