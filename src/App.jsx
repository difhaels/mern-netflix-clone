import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import UserLiked from './pages/UserLiked'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Player' element={<Player/>}/>
        <Route path='/Movies' element={<Movies/>}/>
        <Route path='/Tv' element={<TVShows/>}/>
        <Route path='/mylist' element={<UserLiked/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/' element={<Netflix/>}/>
      </Routes>
    </BrowserRouter>
  )
}
