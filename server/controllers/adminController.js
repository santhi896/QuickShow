// API to check if user is admin

import Booking from "../models/Bookings.js"
import Show from "../models/Show.js"
import User from "../models/User.js"
import Movie from "../models/Movie.js";


export const isAdmin = async (req, res) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: "Unauthorized: user not found or role missing" });
    }

    const isAdmin = req.user.role === 'admin';
    return res.status(200).json({ success: true, isAdmin });
  } catch (error) {
    console.error("Error in isAdmin API:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





export const getDashboardData = async (req, res) => {
  try {
    // ✅ Fetch all shows regardless of date
    const rawShows = await Show.find({}).populate('movie');

    console.log("[Dashboard] Total Shows Fetched:", rawShows.length);

    // ✅ Format activeShows safely to avoid frontend crashes
    const activeShows = rawShows.map(show => {
      const movie = show.movie;

      return {
        _id: show._id,
        showDateTime: show.showDateTime,
        showPrice: show.showPrice,
        movie: movie
          ? {
              _id: movie._id,
              title: movie.title || "Unknown",
              poster_path: movie.poster_path || null,
            }
          : null,
      };
    });

    console.log("[Dashboard] Processed Active Shows:", activeShows.length);

    // ✅ Get all paid bookings
    const bookings = await Booking.find({ isPaid: true });
    console.log("[Dashboard] Total Paid Bookings:", bookings.length);

    // ✅ Total revenue from bookings
    const totalRevenue = bookings.reduce((acc, b) => {
      if (typeof b.amount !== "number") {
        console.warn("[Dashboard] Non-numeric amount in booking", b._id, b.amount);
        return acc;
      }
      return acc + b.amount;
    }, 0);

    // ✅ Total registered users
    const totalUser = await User.countDocuments();
    console.log("[Dashboard] Total Users:", totalUser);

    // ✅ Build response object
    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue,
      activeShows,
      totalUser,
    };

    return res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("[Dashboard Error]", error.stack || error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


// API to get all the shows


// export const getAllShows = async (req,res) => {
//      try{
//           const shows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({ showDateTime:1 })
//           res.json({success:true,shows})
//      }catch(error){
//            console.error(error);
//        res.json({success:false,message:error.message})
//      }
// }


export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({})
      .populate('movie')
      .sort({ showDateTime: 1 });

    console.log("[getAllShows] Total shows returned:", shows.length);

    res.json({ success: true, shows });
  } catch (error) {
    console.error("[getAllShows Error]", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all the bookings


export const getAllBookings = async (req,res) => {

    try{
      const bookings = (await Booking.find({}).populate('User').populate({path:"show", populate:{path:"Movie"}})).
      sort({createdAt:-1})
      res.json({success:true,bookings})
    }catch(error){
      console.error(error);
       res.json({success:false,message:error.message})
    }
}

