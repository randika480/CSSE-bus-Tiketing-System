const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
  transporterID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "transporter",
  },
  conductorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "conductor",
  },
  departure: {
    required: true,
    type: String,
  },
  destination: {
    required: true,
    type: String,
  },
  takeOffTime: {
    required: true,
    type: String,
  },
  arrivalTime: {
    required: true,
    type: String,
  },
  availability: {
    // assumption - can only assign one value from below list
    // daily | weekdays | weekend | monday | tuesday | wednesday | thursday | friday | saturday | sunday
    // if the value is monday -> it means every monday
    type: String,
    default: "daily",
  },
  availableTerminals: [
    // covering locations from terminal collection
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "terminal",
    },
  ],
});

const Journey = mongoose.model("journey", JourneySchema);

module.exports = Journey;
