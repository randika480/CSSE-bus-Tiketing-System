const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  // assumption - token ID will be the _id of this doc
  passengerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "passenger",
  },
  accountBalance: {
    // assumption - according to case study there should be an initial account balance when creating token
    // assumption - account balance can get minus values from fines
    type: Number,
    default: 500,
  },
  tokenStatus: {
    // if account balance <= -500 account status will get suspended
    // Active | Suspended
    type: String,
    default: "Active",
  },
  journeyHistory: [
    {
      journeyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "journey",
      },
      getInLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "terminal",
      },
      getOffLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "terminal",
      },
      cost: Number,
      paymentStatus: {
        // Pending | Paid
        type: String,
        default: "Pending",
      },
      gettingTimeStamp: {
        type: Date,
        default: Date(),
      },
      getOffTimeStamp: {
        type: Date,
      },
    },
  ],
});

const Token = mongoose.model("token", TokenSchema);

module.exports = Token;
