const jwt = require("jsonwebtoken");
const PassengerModel = require("../models/passenger-model");
const ConductorModel = require("../models/conductor-model");
const InspectorModel = require("../models/inspector-model");
const ManagerModel = require("../models/manager-model");

exports.protectedManager = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await ManagerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedPassenger = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await PassengerModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedInspector = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await InspectorModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedConductor = async (req, res, next) => {
  let token;
  token = tokenValidate(req, res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await ConductorModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};

const tokenValidate = (reqObj, res) => {
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Forbidden-" + err });
};
