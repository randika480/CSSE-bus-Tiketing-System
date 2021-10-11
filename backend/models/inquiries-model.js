const mongoose = require("mongoose");

const InquiriesSchema = new mongoose.Schema({
  type: {
    // inspection | passengerPlaced | managerPlaced
    type: String,
    required: true,
  },
  // if inquiry placed by a passenger
  placedPassengerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passenger",
  },
  // if inquiry placed by a inspector
  placedInspectorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inspector",
  },
  // if inquiry placed by a manager
  placedManagerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manager",
  },
  note: {
    type: String,
    required: true,
  },
  // if inquiry placed by a inspector or manager about a passenger
  adversaryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "token",
  },
});

const Inquiry = mongoose.model("inquiry", InquiriesSchema);

module.exports = Inquiry;
