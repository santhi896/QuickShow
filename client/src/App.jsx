// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favorite from './pages/Favorite'
// import {Toaster} from 'react-hot-toast'
// import Footer from './components/Footer'
// import LayOut from './pages/Admin/LayOut'
// import DashBoard from './pages/Admin/DashBoard'
// import AddShows from './pages/Admin/AddShows'
// import ListShows from './pages/Admin/ListShows'
// import ListBookings from './pages/Admin/ListBookings'
// import { useAppContext } from './context/AppContext'
// import { SignIn } from '@clerk/clerk-react'

// const App = () => {

//   const isAdminRoute = useLocation().pathname.startsWith('/admin')

//   const {user} = useAppContext();
//   return (
//     <>
//       <Toaster/>
//       {!isAdminRoute && <Navbar/>}
//       <Routes>
//         <Route path='/' element = {<Home/>}/>
//         <Route path='/Movies' element = {<Movies/>}/>
//         <Route path='/Movies/:id' element = {<MovieDetails/>}/>
//         <Route path='/Movies/:id/:date' element = {<SeatLayout/>}/>
//         <Route path='/my-bookings' element = {<MyBookings/>}/>
//         <Route path='/Favorite' element = {<Favorite/>}/>
//         <Route path='/admin/*' element = {user ? <LayOut/> : (
//           <div className='min-h-screen flex justify-center items-center'>
//             <SignIn fallbackRedirectUrl={'/admin'}/>
//           </div>
//         )}>
//         <Route index  element = {<DashBoard/>}/>
//         <Route path='add-shows' element = {<AddShows/>}/>
//         <Route path='list-shows' element ={<ListShows/>}/>
//         <Route path='list-bookings' element ={<ListBookings/>}/>

//         </Route>
//       </Routes>
//       {!isAdminRoute && <Footer/>}

//     </>
//   )
// }

// export default App



// import React from 'react';
// import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Movies from './pages/Movies';
// import MovieDetails from './pages/MovieDetails';
// import SeatLayout from './pages/SeatLayout';
// import MyBookings from './pages/MyBookings';
// import Favorite from './pages/Favorite';
// import LayOut from './pages/Admin/LayOut';
// import DashBoard from './pages/Admin/DashBoard';
// import AddShows from './pages/Admin/AddShows';
// import ListShows from './pages/Admin/ListShows';
// import ListBookings from './pages/Admin/ListBookings';
// import { useAppContext } from './context/AppContext';
// import { SignIn } from '@clerk/clerk-react';
// import { Toaster } from 'react-hot-toast'; // or react-toastify — not both

// const App = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   const { user, isAdmin } = useAppContext(); // ✅ Call the hook

//   const renderAdminRoutes = () => {
//     if (!user) {
//       return (
//         <div className="min-h-screen flex justify-center items-center">
//           <SignIn fallbackRedirectUrl={'/admin'} />
//         </div>
//       );
//     }

//     if (!isAdmin) {
//       return <Navigate to="/" />;
//     }

//     return (
//       <Routes>
//         <Route path="/admin" element={<LayOut />}>
//           <Route index element={<DashBoard />} />
//           <Route path="add-shows" element={<AddShows />} />
//           <Route path="list-shows" element={<ListShows />} />
//           <Route path="list-bookings" element={<ListBookings />} />
//         </Route>
//       </Routes>
//     );
//   };

//   return (
//     <>
//       <Toaster />
//       {!isAdminRoute && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/movies/:id" element={<MovieDetails />} />
//         <Route path="/movies/:id/:date" element={<SeatLayout />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/favorite" element={<Favorite />} />
//       </Routes>
//       {isAdminRoute && renderAdminRoutes()}
//       {!isAdminRoute && <Footer />}
//     </>
//   );
// };

// export default App;




import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favorite from './pages/Favorite';
import LayOut from './pages/Admin/LayOut';
import DashBoard from './pages/Admin/DashBoard';
import AddShows from './pages/Admin/AddShows';
import ListShows from './pages/Admin/ListShows';
import ListBookings from './pages/Admin/ListBookings';
import { useAppContext } from './context/AppContext';
import { SignIn } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  const { user, isAdmin } = useAppContext(); // ✅ Make sure this is a HOOK

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />

        <Route path="/favorite" element={<Favorite />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
  element={
    !user ? (
      <div className="min-h-screen flex justify-center items-center">
        <SignIn fallbackRedirectUrl="/admin" />
      </div>
    ) : isAdmin === null ? (
      <div className="min-h-screen flex justify-center items-center">
        <p>Checking admin access...</p>
      </div>
    ) : isAdmin === true ? (
      <LayOut />
    ) : (
      <Navigate to="/" />
    )
  }
        >
          <Route index element={<DashBoard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
