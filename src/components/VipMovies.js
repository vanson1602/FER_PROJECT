import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import YouTube from "react-youtube";

const VipMovies = () => {
  const { user, isAuthenticated } = useAuth();
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    youtubeId: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3001";

  // Fetch movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/vip_movies`);
      setMovies(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching VIP movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Extract YouTube ID from URL or ID
  const extractYouTubeId = (url) => {
    if (!url) return "";
    if (url.length === 11) return url;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  // Add new movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const youtubeId = extractYouTubeId(newMovie.youtubeId);

      const movieData = {
        title: newMovie.title,
        youtubeId: youtubeId,
        description: newMovie.description,
      };

      const response = await axios.post(`${API_URL}/vip_movies`, movieData);

      if (response.data) {
        setMovies((prevMovies) => [...prevMovies, response.data]);
        setNewMovie({ title: "", youtubeId: "", description: "" });
        alert("Movie added successfully!");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      setError("Failed to add movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update movie
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    if (!editingMovie || !editingMovie.id) {
      setError("Invalid movie data for update");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const youtubeId = extractYouTubeId(editingMovie.youtubeId);

      const movieData = {
        id: editingMovie.id,
        title: editingMovie.title,
        youtubeId: youtubeId,
        description: editingMovie.description,
      };

      const response = await axios({
        method: "PUT",
        url: `${API_URL}/vip_movies/${editingMovie.id}`,
        data: movieData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === editingMovie.id ? response.data : movie
          )
        );
        setEditingMovie(null);
        alert("Movie updated successfully!");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      setError("Failed to update movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete movie
  const handleDeleteMovie = async (movieId) => {
    if (!movieId) {
      setError("Invalid movie ID for deletion");
      return;
    }

    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        setLoading(true);
        setError(null);

        await axios({
          method: "DELETE",
          url: `${API_URL}/vip_movies/${movieId}`,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
        alert("Movie deleted successfully!");
      } catch (error) {
        console.error("Error deleting movie:", error);
        setError("Failed to delete movie. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isAdmin = user?.role === "admin";

  if (loading && !movies.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">VIP Movies</h2>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Admin Controls */}
      {isAdmin && (
        <div className="mb-8 bg-gray-900 p-6 rounded-lg">
          {!editingMovie && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Add New Movie
            </button>
          )}

          {(showAddForm || editingMovie) && (
            <>
              <h3 className="text-xl font-bold text-white mb-4">
                {editingMovie ? "Edit Movie" : "Add New Movie"}
              </h3>
              <form
                onSubmit={editingMovie ? handleUpdateMovie : handleAddMovie}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Movie Title"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={editingMovie ? editingMovie.title : newMovie.title}
                    onChange={(e) =>
                      editingMovie
                        ? setEditingMovie({
                            ...editingMovie,
                            title: e.target.value,
                          })
                        : setNewMovie({ ...newMovie, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="YouTube Video URL or ID"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={
                      editingMovie ? editingMovie.youtubeId : newMovie.youtubeId
                    }
                    onChange={(e) =>
                      editingMovie
                        ? setEditingMovie({
                            ...editingMovie,
                            youtubeId: e.target.value,
                          })
                        : setNewMovie({
                            ...newMovie,
                            youtubeId: e.target.value,
                          })
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Description"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={
                      editingMovie
                        ? editingMovie.description
                        : newMovie.description
                    }
                    onChange={(e) =>
                      editingMovie
                        ? setEditingMovie({
                            ...editingMovie,
                            description: e.target.value,
                          })
                        : setNewMovie({
                            ...newMovie,
                            description: e.target.value,
                          })
                    }
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : editingMovie
                      ? "Update"
                      : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMovie(null);
                      setShowAddForm(false);
                      setNewMovie({
                        title: "",
                        youtubeId: "",
                        description: "",
                      });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Movies Grid */}
      {isAuthenticated ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <YouTube
                  videoId={movie.youtubeId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-400 mb-4">{movie.description}</p>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingMovie(movie)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">
            Please login to view VIP content
          </p>
        </div>
      )}
    </div>
  );
};

export default VipMovies;
