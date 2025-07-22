import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const FullMovieModal = ({ movie, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset loading state when movie changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);

    // Fetch comments for this movie
    fetchComments();

    return () => clearTimeout(timer);
  }, [movie]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/comments?movieId=${movie.id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để bình luận!");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = {
        id: Date.now().toString(),
        movieId: movie.id,
        userId: user.id,
        username: user.username,
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      };

      await axios.post("http://localhost:3001/comments", comment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Có lỗi xảy ra khi đăng bình luận. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          background: "#1a1a1a",
          overflow: "auto",
          borderRadius: "16px",
          outline: "none",
          padding: "20px",
          margin: "0",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
        },
      }}
      contentLabel={`Xem phim: ${movie.title}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Movie content */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{movie.title}</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${movie.videoId}`}
            title={movie.title}
            className="w-full h-[400px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-gray-300 mb-4">{movie.description}</p>

        {/* Movie details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <span className="font-semibold text-gray-300">Thể loại:</span> {movie.genre}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Năm phát hành:</span> {movie.year}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Thời lượng:</span> {movie.duration}
          </div>
          <div>
            <span className="font-semibold text-gray-300">Đánh giá:</span> ⭐ {movie.rating}/10
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Bình luận</h3>

        {/* Comment form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className={`px-6 py-2 rounded-lg font-semibold ${isSubmitting || !newComment.trim()
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 mb-6 text-center">
            <p className="text-gray-300">Vui lòng đăng nhập để bình luận</p>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {comment.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-semibold text-white">{comment.username}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FullMovieModal;
