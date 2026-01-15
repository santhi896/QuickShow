

import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: String,               // TMDB movie ID (String)
      ref: 'Movie',               // Reference to Movie model
      required: true
    },
    showDateTime: {
      type: Date,
      required: true
    },
    showPrice: {
      type: Number,
      required: true
    },
    occupiedSeats: {
      type: Object,
      default: {},
    }
  },
  {
    minimize: false,  // Keep empty objects like occupiedSeats: {}
    timestamps: true  // Adds createdAt and updatedAt fields
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
