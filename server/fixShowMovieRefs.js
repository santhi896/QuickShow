import mongoose from 'mongoose';
import 'dotenv/config';
import Show from './models/Show.js';   // Adjust the path if needed
import Movie from './models/Movie.js'; // Adjust the path if needed

async function fixShows() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to DB");

  const shows = await Show.find();

  for (const show of shows) {
  console.log(`Show ${show._id} has movie field:`, show.movie);

  // Since your movie's TMDB ID is stored as _id (string), query like this:
  const movie = await Movie.findOne({ _id: show.movie });

  if (movie) {
    await Show.updateOne({ _id: show._id }, { $set: { movie: movie._id } });
    console.log(`Updated show ${show._id}`);
  } else {
    console.log(`No matching movie found for show ${show._id}`);
  }
}


  console.log("Done updating shows");
  await mongoose.disconnect();
}

fixShows().catch(err => {
  console.error(err);
  process.exit(1);
});
