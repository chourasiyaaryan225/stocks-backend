import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
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

    condition: {
      type: String,
      required: true,
      enum: ["GREATER_THAN", "LESS_THAN"],
    },

    targetPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    isTriggered: {
      type: Boolean,
      default: false,
    },

    triggeredAt: {
      type: Date,
      default: null,
    },

    triggeredPrice: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const Alert = mongoose.model(
  "Alert",
  alertSchema
);

export default Alert;