const mongoose = require("mongoose");

const TransporterSchema = new mongoose.Schema({
  type: {
    // bus | train .....future implementations: highwayBus
    required: true,
    type: String,
  },
  VRN: {
    // vehicle registration number or train id
    required: true,
    type: String,
  },
  activationStatus: {
    type: String,
    default: "Pending",
  },
  costID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "cost",
  },
});

const Transporter = mongoose.model("transporter", TransporterSchema);

module.exports = Transporter;
