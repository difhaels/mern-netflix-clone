import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]); // gw tambah dispatch

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }));
  }, [dispatch, genresLoaded]); // gk sesuai video // update: sesuai video param yg ke 2

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    // Memantau status autentikasi pengguna
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      // if (currentUser) {
      //   // Jika pengguna sudah login, arahkan ke halaman utama
      //   navigate("/");
      // }
    });

    // Unsubscribe dari listener saat komponen di-unmount
    return () => unsubscribe();
  }, [navigate]);

  return(
    <Container>
      <div className="navbar">
        <Navbar isScolled={isScrolled}/>
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie"/>
        {
          movies.length ? <Slider movies={movies}/> : <NotAvailable />
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`