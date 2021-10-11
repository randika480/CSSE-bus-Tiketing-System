const InspectorModel = require("../models/inspector-model");
const InquiryModel = require("../models/inquiries-model");
const TokenModel = require("../models/token-model");
const JourneyModel = require("../models/journey-model");
const mongoose = require("mongoose");

exports.createInquiries = async (req, res) => {
  const { type, note, adversaryID } = req.body;
  const placedInspectorID = req.user._id;

  try {
    const inquiry = await InquiryModel.create({
      placedInspectorID,
      type,
      note,
      adversaryID,
    });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in adding inquiry",
      error: error.message,
    });
  }
};

exports.getCurrentJourneyTokens = async (req, res) => {
  const { JID } = req.params;

  try {
    const tokens = await TokenModel.find();

    const currentPassengers = getCurrentPassengers(tokens, JID);

    res.status(200).send({ tokens: currentPassengers });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching tokens -" + error,
    });
  }
};

const getCurrentPassengers = (tokens, JID) => {
  let currentPassengers = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].journeyHistory.length > 0) {
      if (
        tokens[i].journeyHistory[
          tokens[i].journeyHistory.length - 1
        ].journeyID.toString() == JID.toString() &&
        !tokens[i].journeyHistory[tokens[i].journeyHistory.length - 1]
          .getOffTimeStamp
      ) {
        currentPassengers.push(tokens[i]);
      }
    }
  }

  return currentPassengers;
};
exports.getInquiries = async (req, res) => {
  await InquiryModel.find({ placedInspectorID: req.user._id }).exec(
    (error, inquirys) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ inquirys });
    }
  );
};

exports.updateInquiry = async (req, res) => {
  const { inquiryID, type, note, adversaryID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(inquiryID))
    return res.status(404).send(`No review with id: ${inquiryID}`);

  const updatedInquiry = {
    placedInspectorID: req.user._id,
    type,
    note,
    adversaryID,
    _id: inquiryID,
  };

  try {
    let upInq = await InquiryModel.findByIdAndUpdate(
      { _id: inquiryID },
      updatedInquiry,
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({ status: "Inquiry updated successfully", upInq });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};

exports.deleteInquiry = async (req, res) => {
  const { inquiryID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(inquiryID))
    return res.status(404).send(`No inquiry with id: ${inquiryID}`);

  try {
    await InquiryModel.findByIdAndRemove(inquiryID);
    res.status(200).json({ status: "inquiry deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};

exports.getAllJourneys = async (req, res) => {
  try {
    const Journey = await JourneyModel.find();

    res.status(200).send({ Journey: Journey });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Journeys -" + error,
    });
  }
};

exports.getOneJourney = async (req, res) => {
  const jID = req.body.id;

  try {
    const Jorney = await JourneyModel.findOne({ _id: jID }).populate({
      path: "transporterID",
      populate: {
        path: "costID",
      },
    });

    res.status(200).send({ Jorney: Jorney });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Orders -" + error,
    });
  }
};
