import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import VIPMovieModal from '../components/VIPMovieModal';

const VIP = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated, openLoginModal } = useAuth();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:3001/movies');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMovieClick = (movie) => {
        if (isAuthenticated) {
            setSelectedMovie(movie);
            setShowModal(true);
        } else {
            openLoginModal();
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black text-white px-6 py-10">
            <div className="max-w-7xl mx-auto">
                {/* VIP Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                            👑 VIP MOVIES
                        </span>
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 mx-auto rounded-full mb-6"></div>
                    {!isAuthenticated && (
                        <div className="bg-gradient-to-r from-yellow-900/20 via-red-900/20 to-purple-900/20 p-6 rounded-xl border border-yellow-500/20 backdrop-blur-sm">
                            <p className="text-xl text-yellow-400 font-semibold mb-2">
                                🔒 Nội dung dành riêng cho thành viên VIP
                            </p>
                            <p className="text-gray-400">
                                Đăng nhập để trải nghiệm kho phim đặc sắc và độc quyền
                            </p>
                            <button
                                onClick={openLoginModal}
                                className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Đăng nhập ngay
                            </button>
                        </div>
                    )}
                </div>

                {/* VIP Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <div className="relative">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                                    <span className="mr-1">VIP</span>
                                    <span className="text-yellow-200">👑</span>
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/70 text-yellow-400 px-2 py-1 rounded text-sm font-bold">
                                    ⭐ {movie.rating}/10
                                </div>

                                {/* Overlay khi hover */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {isAuthenticated ? (
                                        <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <p className="text-white text-sm font-semibold">Xem ngay</p>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4">
                                            <div className="mb-3">
                                                <svg className="w-12 h-12 text-yellow-400 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M12 15v2m0 0v2m0-2h2m-2 0h-2m9-6V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6a3 3 0 003 3h12a3 3 0 003-3z" />
                                                    <path d="M10 9V7a2 2 0 114 0v2" />
                                                </svg>
                                            </div>
                                            <p className="text-white text-sm font-semibold mb-2">Đăng nhập để xem</p>
                                            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full text-xs font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg">
                                                Đăng nhập ngay
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{movie.title}</h3>
                                <div className="flex items-center text-sm text-gray-400 mb-2">
                                    <span>{movie.duration}</span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2">{movie.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <VIPMovieModal
                movie={selectedMovie}
                isOpen={showModal}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default VIP; 