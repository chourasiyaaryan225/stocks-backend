import mongoose from "mongoose";
const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    exchange: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);
watchlistSchema.index(
  { user: 1, symbol: 1 },
  { unique: true }
);

const Watchlist = mongoose.model("Watchlist",watchlistSchema);

export default Watchlist;