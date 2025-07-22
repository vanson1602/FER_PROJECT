import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import FullMovieList from "../components/FullMovieList";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import CozeChat from "./Chat";


const Home = ({ movieSearch = [], handleSearch }) => {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      };
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
      const url2 =
        "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1";

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
     
      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchMovie();
  }, []);

  const renderContent = () => {
    // Nếu có search results, hiển thị kết quả tìm kiếm
    if (movieSearch.length > 0) {
      return <MovieSearch title={`kết quả tìm kiếm`} data={movieSearch} />;
    }

    // Home view - hiển thị tất cả content
    return (
      <>
        <Banner />
        <FullMovieList />
        <MovieList title={"Phim Hot"} data={movie} />
        <MovieList title={"Phim Đề Cử"} data={movieRate} />
        <CozeChat></CozeChat>
        
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default Home;
