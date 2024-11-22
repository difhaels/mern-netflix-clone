import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";
export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    // Memantau status autentikasi pengguna
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email)
      } else {
        navigate("/login")
      }
    });
    // Unsubscribe dari listener saat komponen di-unmount
    return () => unsubscribe();
  }, [navigate]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [dispatch]); // gw tambah dispatch

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }));
  }, [dispatch, genresLoaded]); // gk sesuai video // update: sesuai video param yg ke 2

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
          })}
        </div>
      </div>
    </Container>
  )
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
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`