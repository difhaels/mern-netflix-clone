import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Search() {
  const { searchResults, searchQuery } = useSelector((state) => state.netflix);

  if (!searchResults || searchResults.length === 0) {
    return (
      <Container>
        <Navbar />
        <div className="content">
          <h1>No results found for "{searchQuery}"</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      <div className="content flex column">
        <h1>Search Results for "{searchQuery}"</h1>
        <div className="grid flex">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((movie, index) => (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={false}
              />
            ))
          ) : (
          <p>No movies found</p> // Pesan jika tidak ada hasil
        )}
      </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  }
`;
