import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { MovieProvider } from "./context/MovieProvider";
import { AuthProvider } from "./context/AuthContext";

// Component con để wrap Header và Routes
const AppContent = () => {
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchValue) => {
    setMovieSearch([]);
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
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 via-white to-blue-50 min-h-screen">
      <Header onSearch={handleSearch} />
      <div className="pb-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home movieSearch={movieSearch} handleSearch={handleSearch} />
            }
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/live" element={<Live />} />
          <Route path="/animation" element={<Animation />} />
        </Routes>
      </div>
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
