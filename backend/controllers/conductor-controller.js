const ConductorModel = require("../models/conductor-model");
const TokenModel = require("../models/token-model");
const PassengerModel = require("../models/passenger-model");

// get profile details
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({ profile: req.user });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getProfile",
    });
  }
};

// get passenger count for current journey
// get passenger token data
exports.getPassengerCount = async (req, res) => {
  const { journeyID } = req.body;
  // current timestamp in milliseconds
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hour = date_ob.getHours();
  let min = date_ob.getMinutes();
  let sec = date_ob.getSeconds();
  let passengerCount = 0;
  let passengerData = [];
  try {
    const passengersInJourney = await TokenModel.find({
      "journeyHistory.journeyID": journeyID,
    });
    passengersInJourney.forEach((passengerToken) => {
      passengerToken.journeyHistory.forEach((passengerJourney) => {
        let gettingYear = passengerJourney.gettingTimeStamp.getFullYear();
        let gettingMonth = passengerJourney.gettingTimeStamp.getMonth() + 1;
        let gettingDate = passengerJourney.gettingTimeStamp.getDate();
        let gettingHour = passengerJourney.gettingTimeStamp.getHours();
        let gettingMin = passengerJourney.gettingTimeStamp.getMinutes();
        let gettingSec = passengerJourney.gettingTimeStamp.getSeconds();
        if (
          gettingYear === year &&
          gettingMonth === month &&
          gettingDate === date
        ) {
          let gettingTimeInSec =
            gettingHour * 3600 + gettingMin * 60 + gettingSec;
          let currentTimeInSec = hour * 3600 + min * 60 + sec;
          if (
            gettingTimeInSec < currentTimeInSec &&
            passengerJourney.paymentStatus === "Pending"
          ) {
            passengerCount++;
            passengerData.push(passengerToken);
          }
        }
      });
    });
    res.status(200).json({ passengerCount, passengerData });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getPassengerCount",
    });
  }
};

// get passenger details on current journey
exports.getPassengerDetails = async (req, res) => {
  const { passengerID } = req.body;
  try {
    const passenger = await PassengerModel.findOne({ _id: passengerID }).select(
      "+password"
    );
    res.status(200).json({ passenger });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getPassengerDetails",
    });
  }
};
