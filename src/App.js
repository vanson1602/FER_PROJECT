import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import TV from "./pages/TV";
import Sports from "./pages/Sports";
import TVShows from "./pages/TVShows";
import Live from "./pages/Live";
import Animation from "./pages/Animation";
import VIP from "./pages/VIP";
import AdminMovies from "./pages/AdminMovies";
import AdminUsers from "./pages/AdminUsers";
import { MovieProvider } from "./context/MovieProvider";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

// Protected route component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component con để wrap Header và Routes
const AppContent = () => {
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchValue) => {
    // Reset search results
    setMovieSearch([]);

    // If search value is empty, return early
    if (!searchValue.trim()) {
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();

      // Only set results if we actually found movies
      if (data.results && Array.isArray(data.results)) {
        setMovieSearch(data.results);
      } else {
        setMovieSearch([]);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovieSearch([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<Home movieSearch={movieSearch} />}
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/live" element={<Live />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/vip" element={<VIP />} />

          {/* Admin Routes */}
          <Route
            path="/admin/movies"
            element={
              <AdminRoute>
                <AdminMovies />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <AppContent />
          <LoginModal />
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
