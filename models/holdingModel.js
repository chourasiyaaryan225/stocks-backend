import mongoose from "mongoose";
const holdingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
      default: null,
      trim: true,
    },

    exchange: {
      type: String,
      default: null,
      trim: true,
    },

    currency: {
      type: String,
      default: null,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    buyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Holding = mongoose.model("Holding",holdingSchema);

export default Holding;