const TerminalModel = require("../models/terminal-model");
const TransporterModel = require("../models/transporter-model");
const JourneyModel = require("../models/journey-model");
const CostModel = require("../models/cost-model");
const InquaryModel = require("../models/inquiries-model");
const ConductorModel = require("../models/conductor-model");
const TokenModel = require("../models/token-model");
const calculateJourneyCost = require("../utils/costCalculator");
const sendEmail = require("../utils/SendEmail");

// create terminal
exports.createTerminal = async (req, res) => {
  const { type, name, distanceToOthers } = req.body;

  try {
    const Terminal = await TerminalModel.create({
      type,
      name,
      distanceToOthers,
    });

    res.status(201).json({ success: true, Terminal: Terminal });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in creating terminal-" + error,
    });
  }
};
// create Journey
exports.createJourney = async (req, res) => {
  const {
    transporterID,
    conductorID,
    departure,
    destination,
    takeOffTime,
    arrivalTime,
    availability,
    availableTerminals,
  } = req.body;

  try {
    const Journey = await JourneyModel.create({
      transporterID,
      conductorID,
      departure,
      destination,
      takeOffTime,
      arrivalTime,
      availability,
      availableTerminals,
    });

    res.status(201).json({ success: true, Journey: Journey });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in creating Journey-" + error,
    });
  }
};

// create transporters
exports.createTransporter = async (req, res) => {
  const { type, VRN, activationStatus, costID } = req.body;

  try {
    const Transporter = await TransporterModel.create({
      type,
      VRN,
      activationStatus,
      costID,
    });

    res.status(201).json({ success: true, Transporter: Transporter });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in creating Transporter-" + error,
    });
  }
};

//create costs
exports.createCost = async (req, res) => {
  const { type, costPerKm } = req.body;

  try {
    const Cost = await CostModel.create({
      type,
      costPerKm,
    });

    res.status(201).json({ success: true, Cost: Cost });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in creating Cost-" + error,
    });
  }
};

//update tranporters
exports.updateTransporter = async (req, res) => {
  const { TID, type, VRN, activationStatus, costID } = req.body;

  try {
    const updatedTransporter = await TransporterModel.findByIdAndUpdate(
      TID,
      {
        $set: {
          TID,
          type,
          VRN,
          activationStatus,
          costID,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    res
      .status(200)
      .json({ success: true, updatedTransporter: updatedTransporter });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update transpoter-" + error,
    });
  }
};

//update costs
exports.updateCost = async (req, res) => {
  const { CID, type, costPerKm } = req.body;

  try {
    const updatedCost = await CostModel.findByIdAndUpdate(
      CID,
      {
        $set: {
          type,
          costPerKm,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({ success: true, updatedCost: updatedCost });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update Cost-" + error,
    });
  }
};

//update journey
exports.updateJourney = async (req, res) => {
  const {
    JID,
    transporterID,
    conductorID,
    departure,
    destination,
    takeOffTime,
    arrivalTime,
    availability,
    availableTerminals,
  } = req.body;

  try {
    const updatedJourney = await JourneyModel.findByIdAndUpdate(
      JID,
      {
        $set: {
          transporterID,
          conductorID,
          departure,
          destination,
          takeOffTime,
          arrivalTime,
          availability,
          availableTerminals,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({ success: true, updatedJourney: updatedJourney });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in update Journey-" + error,
    });
  }
};

// fetch journeys
exports.getJourney = async (req, res) => {
  try {
    const Journey = await JourneyModel.find()
      .populate({
        path: "transporterID",
        populate: {
          path: "costID",
        },
      })
      .populate("conductorID");

    res.status(200).send({ Journey: Journey });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Journeys -" + error,
    });
  }
};

//fetch journeys with awailable terminals
exports.getJourneyWithTerminals = async (req, res) => {
  const id = req.body.id;
  try {
    const Journey = await JourneyModel.findOne({ _id: id }).populate(
      "availableTerminals"
    );

    res.status(200).send({ Journey: Journey });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Journeys -" + error,
    });
  }
};

//fetch costs
exports.getCosts = async (req, res) => {
  try {
    const Costs = await CostModel.find();

    res.status(200).send({ Costs: Costs });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Costs -" + error,
    });
  }
};

//fetch transporters
exports.getTransporters = async (req, res) => {
  try {
    const Transporters = await TransporterModel.find();

    res.status(200).send({ Transporters: Transporters });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Transporters -" + error,
    });
  }
};

//fetch COnductors
exports.getConductors = async (req, res) => {
  try {
    const Conductors = await ConductorModel.find();

    res.status(200).send({ Conductors: Conductors });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Conductors -" + error,
    });
  }
};

//fetch Inquaries
exports.getInquaries = async (req, res) => {
  try {
    const Inquaries = await InquaryModel.find();

    res.status(200).send({ Inquaries: Inquaries });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Inquaries -" + error,
    });
  }
};

//fetch Terminals
exports.getTerminals = async (req, res) => {
  try {
    const Terminals = await TerminalModel.find();

    res.status(200).send({ Terminals: Terminals });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Orders -" + error,
    });
  }
};

//fetch single jorney with transporters and cost details
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

//fetch tokens
exports.getTokens = async (req, res) => {
  const { tokenID, getOffLocation, currentJourney } = req.body;
  calculateJourneyCost(req, res, tokenID, getOffLocation, currentJourney);
  try {
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in initiateJourney",
    });
  }
};

// delete journey
exports.deleteJourney = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await JourneyModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      desc: "Journey deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error delete Journey - " + error,
    });
  }
};

//delete terminals
exports.deleteTerminals = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await TerminalModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      desc: "Terminal deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error delete Journey - " + error,
    });
  }
};

//delete transporters
exports.deleteTransporters = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await TransporterModel.deleteOne({ _id: id });

    res.status(200).send({
      success: true,
      desc: "Transporter deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error delete Journey - " + error,
    });
  }
};

// suspend tokens
exports.suspendToken = async (req, res) => {
  const { TID } = req.params;
  const tokenStatus = "Suspended";

  try {
    const suspendToken = await TokenModel.findByIdAndUpdate(
      TID,
      {
        $set: {
          tokenStatus,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );

    const mail = sendMailToSusupendedAccount(req, res, TID);
    if (mail) {
      res.status(200).json({ success: true, suspendToken: suspendToken });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in suspendToken Journey-" + error,
    });
  }
};

//find passenger enail to notyfy account suspending
const sendMailToSusupendedAccount = async (req, res, TID) => {
  try {
    const Pssenger = await TokenModel.findOne({ _id: TID }).populate(
      "passengerID"
    );

    sendEmail({
      to: Journey.Pssenger.passengerID.email,
      subject: "Regarding Account Suspend",
      text: `<h5>Dear ${Pssenger.passengerID.username},</h5>
    <p>
        Your Account has been suspended because of few inquaries.
        <br/>
        Thank You
    </p>
  `,
    });

    return true;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in fetching Journeys -" + error,
    });
  }
};

//calculate cost of a journey
exports.calculateCost = async (req, res) => {
  try {
    const Cost = await calculateJourneyCost(
      res,
      "6159f4ba26f00c2bc48c16c7",
      "jaffna",
      "615ddd9005e2642f080bd447"
    );

    res.status(200).json({ success: true, Cost: Cost });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error Calculate Cost- " + error,
    });
  }
};
