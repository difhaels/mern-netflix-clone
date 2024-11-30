import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Menyimpan input pengguna

  const navigate = useNavigate(); // Untuk navigasi antar halaman

  const apiKey = "YOUR_API_KEY"; // Ganti dengan API Key TMDB Anda

  const fetchMovies = async () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      const movies = response.data.results;
      navigate("/search-results", { state: { movies, query: searchQuery } }); // Kirim data ke halaman baru
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchMovies(); // Panggil API dan navigasi hanya jika tombol Enter ditekan
    }
  };

  return (
    <div className={`search ${showSearch ? "show-search" : ""}`}>
      <button
        className="search-button"
        onFocus={() => setShowSearch(true)}
        onBlur={() => {
          if (!inputHover) setShowSearch(false);
        }}
      >
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery} // Hubungkan ke state
        onChange={(e) => setSearchQuery(e.target.value)} // Update state saat pengguna mengetik
        onKeyPress={handleKeyPress} // Tangkap tombol Enter
        onMouseEnter={() => setInputHover(true)}
        onMouseLeave={() => setInputHover(false)}
        onBlur={() => {
          setShowSearch(false);
          setInputHover(false);
        }}
      />
    </div>
  );
}
