const mongoose = require("mongoose");

const CostSchema = new mongoose.Schema({
  type: {
    // bus | train .....future implementations: highwayBus
    required: true,
    type: String,
  },
  costPerKm: {
    required: true,
    type: Number,
  },
});

const Cost = mongoose.model("cost", CostSchema);

module.exports = Cost;
