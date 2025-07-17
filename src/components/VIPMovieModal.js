import React from 'react';
import Modal from 'react-modal';

const VIPMovieModal = ({ movie, isOpen, onClose }) => {
    // Extract video ID from YouTube URL
    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = movie?.videoUrl ? getYouTubeVideoId(movie.videoUrl) : null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    position: 'relative',
                    background: '#111',
                    overflow: 'hidden',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0',
                    width: '90%',
                    maxWidth: '1200px',
                    maxHeight: '90vh',
                    margin: '0 auto',
                    inset: 'auto',
                }
            }}
        >
            <div className="relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Video player */}
                <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={movie?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Movie info */}
                <div className="p-6 bg-gradient-to-b from-black/80 to-black text-white">
                    <h2 className="text-2xl font-bold mb-2">{movie?.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                        <span className="flex items-center">
                            <span className="text-yellow-400 mr-1">⭐</span>
                            {movie?.rating}/10
                        </span>
                        <span>•</span>
                        <span>{movie?.duration}</span>
                        <span>•</span>
                        <span>{new Date(movie?.releaseDate).getFullYear()}</span>
                    </div>
                    <p className="text-gray-400">{movie?.description}</p>
                </div>
            </div>
        </Modal>
    );
};

export default VIPMovieModal; 