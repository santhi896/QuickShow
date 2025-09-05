import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import LayOut from './pages/Admin/LayOut'
import DashBoard from './pages/Admin/DashBoard'
import AddShows from './pages/Admin/AddShows'
import ListShows from './pages/Admin/ListShows'
import ListBookings from './pages/Admin/ListBookings'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/Movies' element = {<Movies/>}/>
        <Route path='/Movies/:id' element = {<MovieDetails/>}/>
        <Route path='/Movies/:id/:date' element = {<SeatLayout/>}/>
        <Route path='/my-bookings' element = {<MyBookings/>}/>
        <Route path='/Favorite' element = {<Favorite/>}/>
        <Route path='/Admin/*' element = {<LayOut/>}>
        <Route index  element = {<DashBoard/>}/>
        <Route path='add-shows' element = {<AddShows/>}/>
        <Route path='list-shows' element ={<ListShows/>}/>
        <Route path='list-bookings' element ={<ListBookings/>}/>

        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}

    </>
  )
}

export default App
