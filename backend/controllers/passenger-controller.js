const PassengerModel = require("../models/passenger-model");
const TokenModel = require("../models/token-model");
const JourneyModel = require("../models/journey-model");
const TerminalModel = require("../models/terminal-model");

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

// get passenger token details
exports.getPassengerToken = async (req, res) => {
  try {
    const passengerToken = await TokenModel.findOne({
      passengerID: req.user._id,
    });
    res.status(200).json({ passengerToken });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getToken",
    });
  }
};

// get passenger Journey History
exports.getJourneyHistory = async (req, res) => {
  try {
    const history = await TokenModel.findOne({
      passengerID: req.user._id,
    })
      .populate("journeyHistory.getInLocation")
      .populate("journeyHistory.getOffLocation");
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getJourneyHistory",
    });
  }
};

// get all journeys
exports.getAllJourneys = async (req, res) => {
  try {
    const journeys = await JourneyModel.find();
    res.status(200).json({ journeys });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getAllJourneys",
    });
  }
};

// get specific journey details
exports.getJourney = async (req, res) => {
  const journeyID = req.params.id;
  try {
    const journey = await JourneyModel.findOne({ _id: journeyID }).populate(
      "availableTerminals"
    );

    res.status(200).json({ journey });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getJourney",
    });
  }
};

// get specific terminal details
exports.getTerminal = async (req, res) => {
  const terminalID = req.params.id;
  try {
    const terminal = await TerminalModel.findOne({ _id: terminalID });
    res.status(200).json({ terminal });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in getTerminal",
    });
  }
};

// initiate journey
exports.initiateJourney = async (req, res) => {
  const { tokenID, journeyID, getInLocation } = req.body;
  try {
    await TokenModel.updateOne(
      { _id: tokenID },
      {
        $push: {
          journeyHistory: { journeyID, getInLocation },
        },
      }
    );
    res.status(200).json({ desc: "Journey initiated" });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in initiateJourney",
    });
  }
};

// complete journey
// exports.completeJourney = async (req, res) => {
//   const { tokenID, initiatedJourneyID, getOffLocation } = req.body;
//   const getOffTimeStamp = Date();
//   try {
//     const totalCost = await calculateJourneyCost(
//       res,
//       tokenID,
//       getOffLocation,
//       initiatedJourneyID
//     );
//     console.log(totalCost);
//     await TokenModel.findOneAndUpdate(
//       { _id: tokenID },
//       {
//         $inc: {
//           accountBalance: -totalCost,
//         },
//       }
//     );
//     const result = await TokenModel.updateOne(
//       { "journeyHistory._id": initiatedJourneyID },
//       {
//         $set: {
//           "journeyHistory.$.getOffLocation": getOffLocation,
//           "journeyHistory.$.paymentStatus": "Paid",
//           "journeyHistory.$.getOffTimeStamp": getOffTimeStamp,
//         },
//       }
//     );
//     res.status(200).json({ desc: "Journey completed" });
//   } catch (error) {
//     res.status(500).json({
//       error,
//       desc: "Error occurred in completeJourney",
//     });
//   }
// };

// recharge token
exports.rechargeToken = async (req, res) => {
  const { rechargedAmount, paymentType } = req.body;
  console.log(rechargedAmount);
  try {
    const passengerToken = await TokenModel.findOne({
      passengerID: req.user._id,
    });
    const updatedToken = await TokenModel.findOneAndUpdate(
      { _id: passengerToken },
      {
        $inc: {
          accountBalance: rechargedAmount,
        },
      }
    );
    const logPayment = await PassengerModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          paymentLogs: { rechargedAmount, paymentType },
        },
      },
      {
        new: true,
        upsert: false,
      }
    );

    res.status(200).json({ desc: "Balance updated", updatedToken });
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in rechargeToken",
    });
  }
};

exports.completeJourney = async (req, res) => {
  const { tokenID, initiatedJourneyID, getOffLocation } = req.body;

  const getOffTimeStamp = Date();

  try {
    const totalCost = await calculateJourneyCost(
      res,

      tokenID,

      getOffLocation,

      initiatedJourneyID
    );

    console.log(totalCost);

    await TokenModel.findOneAndUpdate(
      { _id: tokenID },

      {
        $inc: {
          accountBalance: -totalCost,
        },
      }
    );

    const result = await TokenModel.updateOne(
      { "journeyHistory._id": initiatedJourneyID },

      {
        $set: {
          "journeyHistory.$.getOffLocation": getOffLocation,

          "journeyHistory.$.paymentStatus": "Paid",

          "journeyHistory.$.getOffTimeStamp": getOffTimeStamp,
        },
      }
    );

    res.status(200).json({ desc: "Journey completed" });
  } catch (error) {
    res.status(500).json({
      error,

      desc: "Error occurred in completeJourney" + error,
    });
  }
};

const calculateJourneyCost = async (
  res,

  tokenID,

  getOffLocation,

  currentJourney
) => {
  // const tokenID = "6159a78de6e3c75aec5bff44";

  // const getOffLocation = "jaffna";

  // const currentJourney = "6159f9cc2909d96b443cf62b";

  try {
    const token = await TokenModel.findOne({ _id: tokenID })

      .populate("journeyHistory.getInLocation")

      .populate("journeyHistory.getOffLocation")

      .populate({
        path: "journeyHistory.journeyID",

        populate: {
          path: "transporterID",

          populate: {
            path: "costID",
          },
        },
      });

    const totalCost = calcCost(token, getOffLocation, currentJourney);

    return totalCost; // res.status(200).send({ totalCost: totalCost });
  } catch (error) {
    res.status(500).json({
      success: false,

      desc: "Error in fetching tokens -" + error,
    });
  }
};

const calcCost = (token, getOffLocation, currentJourney) => {
  let jorneyIndex;

  for (let i = 0; i < token.journeyHistory.length; i++) {
    if (token.journeyHistory[i]._id.toString() === currentJourney.toString()) {
      jorneyIndex = i;
    }
  }

  let distance = 0;

  for (
    let i = 0;
    i <
    token.journeyHistory[jorneyIndex]?.getInLocation.distanceToOthers.length;
    i++
  ) {
    if (
      token.journeyHistory[jorneyIndex].getInLocation.distanceToOthers[
        i
      ]._id.toString() == getOffLocation.toString()
    ) {
      distance =
        token.journeyHistory[jorneyIndex].getInLocation.distanceToOthers[i]
          .distance;
    }
  }

  const cost =
    token.journeyHistory[jorneyIndex].journeyID.transporterID.costID.costPerKm;

  console.log(distance * cost);

  return distance * cost;
};
