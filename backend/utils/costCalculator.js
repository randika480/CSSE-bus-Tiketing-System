const TokenModel = require("../models/token-model");

const calculateJourneyCost = async (
  res,
  tokenID,
  getOffLocation,
  currentJourney
) => {
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
    return totalCost;
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
    i < token.journeyHistory[jorneyIndex].getInLocation.distanceToOthers.length;
    i++
  ) {
    if (
      token.journeyHistory[jorneyIndex].getInLocation.distanceToOthers[i]
        .name == getOffLocation
    ) {
      distance =
        token.journeyHistory[jorneyIndex].getInLocation.distanceToOthers[i]
          .distance;
    }
  }
  const cost =
    token.journeyHistory[jorneyIndex].journeyID.transporterID.costID.costPerKm;
  return distance * cost;
};

module.exports = calculateJourneyCost;
