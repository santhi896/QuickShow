

import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";



export const getNowPlayingMovies = async (req, res) => {
  try {
    console.log("🔍 Fetching now playing movies...");

    const apiKey = process.env.TMDB_API_KEY;
    console.log("✅ TMDb API Key:", apiKey);

    if (!apiKey) {
      console.error("❌ TMDb API key is missing");
      return res.status(500).json({
        success: false,
        message: "TMDb API key is missing from environment",
      });
    }

    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: 1,
        },
      }
    );

    console.log("🎬 Fetched now playing movies:", data.results.length);
    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error("❌ Error fetching now playing movies:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.status_message || error.message || "Internal Server Error",
    });
  }
};


export const addShow = async (req, res) => {
  try {
    const { movies } = req.body;

    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movies array is required",
      });
    }

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: "TMDb API key missing" });
    }

    let totalInserted = [];

    for (const movieObj of movies) {
      const { movieId, showInput, showPrice } = movieObj;

      if (!movieId || !Array.isArray(showInput) || showInput.length === 0 || showPrice === undefined) {
        console.warn("Skipping invalid movie entry:", movieObj);
        continue;
      }

      let movie = await Movie.findById(movieId);

      if (!movie) {
        try {
          const [movieDetailsResponse, creditsResponse] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, { params: { api_key: apiKey } }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { params: { api_key: apiKey } }),
          ]);

          const movieApiData = movieDetailsResponse.data;
          const movieCreditsData = creditsResponse.data;

          const movieDetails = {
            _id: movieId,
            title: movieApiData.title,
            overview: movieApiData.overview,
            poster_path: movieApiData.poster_path,
            backdrop_path: movieApiData.backdrop_path,
            genres: movieApiData.genres,
            casts: movieCreditsData.cast,
            release_date: movieApiData.release_date,
            original_language: movieApiData.original_language,
            tagline: movieApiData.tagline || "",
            vote_average: movieApiData.vote_average,
            runtime: movieApiData.runtime,
          };

          movie = await Movie.create(movieDetails);
        } catch (err) {
          console.error(`Failed to fetch movie ${movieId}:`, err.message);
          continue; // Skip this movie
        }
      }

      const showToCreate = [];

      for (const entry of showInput) {
        const { date, time } = entry;
        if (!date || !time) continue;

        const times = Array.isArray(time) ? time : [time];

        for (const t of times) {
          const formattedTime = t.length === 5 ? `${t}:00` : t;
          const dateTimeString = `${date}T${formattedTime}`;
          const showDateTime = new Date(dateTimeString);

          if (isNaN(showDateTime.getTime())) continue;

          showToCreate.push({
            movie: movie._id,
            showDateTime,
            showPrice,
            occupiedSeats: {},
          });
        }
      }

      if (showToCreate.length > 0) {
        const inserted = await Show.insertMany(showToCreate);
        totalInserted.push(...inserted);
      }
    }

    if (totalInserted.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid shows added. Please check your input.",
      });
    }

    return res.json({
      success: true,
      message: `${totalInserted.length} shows added successfully.`,
      insertedShows: totalInserted,
    });
  } catch (error) {
    console.error("addShow error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// API to get all upcoming shows from the database
export const getShows = async (req, res) => {
  try {
    // Remove the date filter
    const shows = await Show.find()
      .populate("movie")
      .sort({ showDateTime: 1 });

    console.log(`Found ${shows.length} show(s).`);
    if (shows.length > 0) {
      console.log("Sample show:", shows[0]);
    }

    res.json({ success: true, shows });
  } catch (error) {
    console.error("Error in getShows:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    console.log("🎥 Fetching shows for movieId:", movieId);

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    let movie = await Movie.findById(movieId);

    if (!movie) {
      console.warn("⚠️ Movie not found locally for ID:", movieId);
      const apiKey = process.env.TMDB_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          message: "TMDb API key missing in environment variables",
        });
      }

      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          { params: { api_key: apiKey } }
        );
        movie = movieResponse.data;
      } catch (fetchError) {
        console.error("Error fetching movie from TMDb:", fetchError.message);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch movie details from TMDb",
        });
      }
    }

    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


 
// export const getShowById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id || id.length !== 24) {
//       return res.status(400).json({ success: false, message: "Invalid show ID" });
//     }

//     // const show = await Show.findById(id).populate("movie");
//     const show = await Show.find({ movie: movieId });


//     if (!show) {
//       return res.status(404).json({ success: false, message: "Show not found" });
//     }

//     return res.json({ success: true, data: show });
//   } catch (error) {
//     console.error("❌ getShowById error:", error.message);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid show ID" });
    }

    const show = await Show.findById(id).populate("movie");

    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }

    return res.json({ success: true, data: show });
  } catch (error) {
    console.error("❌ getShowById error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


