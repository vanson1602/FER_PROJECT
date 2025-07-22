import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StarRating = ({ value, onChange, readonly, size = "normal" }) => {
    const [hover, setHover] = useState(null);

    const starClass = size === "large"
        ? "w-8 h-8 text-3xl"
        : "w-6 h-6 text-xl";

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isHalf = value && value + 0.5 === star;
                return (
                    <button
                        type="button"
                        key={star}
                        className={`${starClass} ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => !readonly && onChange(star)}
                        onMouseEnter={() => !readonly && setHover(star)}
                        onMouseLeave={() => !readonly && setHover(null)}
                    >
                        <span className="text-yellow-400">
                            {(hover || value) >= star ? (
                                "★"
                            ) : isHalf ? (
                                "⯨"
                            ) : (
                                "☆"
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const { user, isAuthenticated } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        fetchMovie();
        fetchComments();
        fetchRatings();
    }, [id]);

    useEffect(() => {
        if (isAuthenticated && ratings.length > 0) {
            const userRating = ratings.find(r => r.userId === user.id);
            if (userRating) {
                setUserRating(userRating.rating);
            }
        }
    }, [ratings, isAuthenticated, user]);

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/vip_movies/${id}`);
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/comments?movieId=${id}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const fetchRatings = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ratings?movieId=${id}`);
            setRatings(response.data);
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    };

    const handleRating = async (rating) => {
        if (!isAuthenticated) {
            alert("Vui lòng đăng nhập để đánh giá!");
            return;
        }

        try {
            const existingRating = ratings.find(r => r.userId === user.id);
            if (existingRating) {
                // Update existing rating
                await axios.put(`http://localhost:3001/ratings/${existingRating.id}`, {
                    ...existingRating,
                    rating,
                    createdAt: new Date().toISOString()
                });
            } else {
                // Create new rating
                const newRating = {
                    id: Date.now().toString(),
                    movieId: id,
                    userId: user.id,
                    username: user.username,
                    rating,
                    createdAt: new Date().toISOString()
                };
                await axios.post("http://localhost:3001/ratings", newRating);
            }

            // Refresh ratings
            fetchRatings();
        } catch (error) {
            console.error("Error saving rating:", error);
            alert("Có lỗi xảy ra khi lưu đánh giá. Vui lòng thử lại!");
        }
    };

    const calculateAverageRating = () => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
        return (sum / ratings.length).toFixed(1);
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
                movieId: id,
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

    if (!movie) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    const averageRating = calculateAverageRating();

    return (
        <div className="min-h-screen bg-[#0f1117]">
            {/* Video Player Section */}
            <div className="w-full bg-black">
                <div className="max-w-[1920px] mx-auto">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                            src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                            title={movie.title}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1200px] mx-auto px-4 py-6">
                {/* Title and Basic Info */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>

                    {/* Rating Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <StarRating value={averageRating} readonly size="large" />
                                <span className="text-yellow-400 text-xl font-bold">{averageRating}</span>
                                <span className="text-gray-400">({ratings.length} đánh giá)</span>
                            </div>
                        </div>

                        {isAuthenticated && (
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-400">Đánh giá của bạn:</span>
                                <StarRating
                                    value={userRating}
                                    onChange={handleRating}
                                    size="large"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-400">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.genre}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-700 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("info")}
                            className={`py-4 px-2 font-medium text-sm border-b-2 ${activeTab === "info"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-transparent text-gray-400 hover:text-gray-300"
                                }`}
                        >
                            Thông tin phim
                        </button>
                        <button
                            onClick={() => setActiveTab("comments")}
                            className={`py-4 px-2 font-medium text-sm border-b-2 ${activeTab === "comments"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-transparent text-gray-400 hover:text-gray-300"
                                }`}
                        >
                            Bình luận ({comments.length})
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                    {activeTab === "info" ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Movie Description */}
                            <div className="md:col-span-2">
                                <h2 className="text-xl font-semibold text-white mb-4">Nội dung phim</h2>
                                <p className="text-gray-300 leading-relaxed mb-6">{movie.description}</p>

                                {/* Recent Ratings */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-white mb-4">Đánh giá gần đây</h3>
                                    <div className="space-y-4">
                                        {ratings.slice(0, 5).map((rating) => (
                                            <div key={rating.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold">
                                                            {rating.username.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-semibold">{rating.username}</p>
                                                        <p className="text-sm text-gray-400">
                                                            {new Date(rating.createdAt).toLocaleDateString("vi-VN")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <StarRating value={rating.rating} readonly />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {movie.genre?.split(", ").map((genre, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Movie Info Sidebar */}
                            <div>
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Thông tin chi tiết
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Năm phát hành</span>
                                            <span className="text-white">{movie.year}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Thời lượng</span>
                                            <span className="text-white">{movie.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Đánh giá</span>
                                            <span className="text-yellow-400">⭐ {averageRating}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Comments Section */}
                            {isAuthenticated ? (
                                <form onSubmit={handleSubmitComment} className="mb-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-1">
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Viết bình luận của bạn..."
                                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !newComment.trim()}
                                            className={`px-6 py-3 rounded-lg font-semibold ${isSubmitting || !newComment.trim()
                                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                                }`}
                                        >
                                            {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-gray-800 rounded-lg p-6 text-center mb-8">
                                    <p className="text-gray-300">
                                        Vui lòng đăng nhập để bình luận về bộ phim này
                                    </p>
                                </div>
                            )}

                            {/* Comments List */}
                            <div className="space-y-6">
                                {comments.length === 0 ? (
                                    <p className="text-center text-gray-400 py-8">
                                        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                                    </p>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="bg-gray-800 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold">
                                                            {comment.username.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-white">
                                                            {comment.username}
                                                        </h4>
                                                        <span className="text-sm text-gray-400">
                                                            {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-300">{comment.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail; 