import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminMovies = () => {
    const { isAuthenticated, isAdmin } = useAuth();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        videoUrl: "",
        rating: 0,
        releaseDate: "",
        duration: "",
        description: "",
    });

    // Fetch movies on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:3001/movies");
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải danh sách phim");
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/" />;
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "rating" ? parseFloat(value) : value,
        });

        // Auto-generate thumbnail from YouTube URL
        if (name === "videoUrl") {
            const videoId = extractYouTubeId(value);
            if (videoId) {
                setFormData(prev => ({
                    ...prev,
                    image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    videoUrl: `https://www.youtube.com/embed/${videoId}`
                }));
            }
        }
    };

    // Extract YouTube video ID from URL
    const extractYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Open add movie modal
    const handleAddMovie = () => {
        setFormData({
            title: "",
            image: "",
            videoUrl: "",
            rating: 0,
            releaseDate: "",
            duration: "",
            description: "",
        });
        setShowAddModal(true);
    };

    // Open edit movie modal
    const handleEditMovie = (movie) => {
        setCurrentMovie(movie);
        setFormData({
            title: movie.title,
            image: movie.image,
            videoUrl: movie.videoUrl,
            rating: movie.rating,
            releaseDate: movie.releaseDate,
            duration: movie.duration,
            description: movie.description,
        });
        setShowEditModal(true);
    };

    // Submit add movie form
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/movies", formData);
            setMovies([...movies, response.data]);
            setShowAddModal(false);
            setError(null);
        } catch (err) {
            setError("Không thể thêm phim mới");
        }
    };

    // Submit edit movie form
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/movies/${currentMovie.id}`,
                formData
            );
            setMovies(
                movies.map((movie) => (movie.id === currentMovie.id ? response.data : movie))
            );
            setShowEditModal(false);
            setError(null);
        } catch (err) {
            setError("Không thể cập nhật phim");
        }
    };

    // Delete movie
    const handleDeleteMovie = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
            try {
                await axios.delete(`http://localhost:3001/movies/${id}`);
                setMovies(movies.filter((movie) => movie.id !== id));
                setError(null);
            } catch (err) {
                setError("Không thể xóa phim");
            }
        }
    };

    // Modal component for adding/editing movies
    const MovieFormModal = ({ isOpen, onClose, title, onSubmit }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-[#1e1e1e] rounded-lg shadow-2xl p-6 w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Tên phim
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                URL Video YouTube
                            </label>
                            <input
                                type="text"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleInputChange}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                required
                            />
                        </div>

                        {formData.videoUrl && (
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={formData.videoUrl}
                                    title="Preview"
                                    className="w-full h-64 rounded"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-white text-sm font-bold mb-2">
                                    Đánh giá (0-10)
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-bold mb-2">
                                    Ngày phát hành
                                </label>
                                <input
                                    type="date"
                                    name="releaseDate"
                                    value={formData.releaseDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-bold mb-2">
                                    Thời lượng
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                    placeholder="VD: 120 phút"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[#333] text-white border border-[#555] rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                {title === "Thêm phim mới" ? "Thêm" : "Cập nhật"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1e1e1e] text-white p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Quản lý phim</h1>
                    <button
                        onClick={handleAddMovie}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Thêm phim mới
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-[#2e2e2e] rounded-lg overflow-hidden shadow-lg"
                        >
                            <div className="relative">
                                <iframe
                                    src={movie.videoUrl}
                                    title={movie.title}
                                    className="w-full h-48"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {movie.description}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span>⭐ {movie.rating}</span>
                                    <span>{movie.duration}</span>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEditMovie(movie)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMovie(movie.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <MovieFormModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    title="Thêm phim mới"
                    onSubmit={handleAddSubmit}
                />

                <MovieFormModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    title="Chỉnh sửa phim"
                    onSubmit={handleEditSubmit}
                />
            </div>
        </div>
    );
};

export default AdminMovies;