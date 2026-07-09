import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  sla: {
    high: { type: Number, default: 24 },
    medium: { type: Number, default: 48 },
    low: { type: Number, default: 72 }
  },
  categories: {
    type: [String],
    default: ["road-damage", "water-leakage", "garbage", "electrical", "safety", "other"]
  },
  locations: {
    type: [String],
    default: ["big-top", "food-stalls", "living-quarters", "main-path", "animal-zone", "performance"]
  },
  updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;