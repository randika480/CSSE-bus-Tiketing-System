const PassengerModel = require("../models/passenger-model");
const ConductorModel = require("../models/conductor-model");
const InspectorModel = require("../models/inspector-model");
const ManagerModel = require("../models/manager-model");
const TokenModel = require("../models/token-model");

// login controller function
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  //check user
  let user;
  if (role === "manager") {
    user = await ManagerModel.findOne({ email: email }).select("+password");
  } else if (role === "inspector") {
    user = await InspectorModel.findOne({ email: email }).select("+password");
  } else if (role === "conductor") {
    user = await ConductorModel.findOne({ email: email }).select("+password");
  } else if (role === "passenger") {
    user = await PassengerModel.findOne({ email: email }).select("+password");
  } else {
    res.status(422).json({
      desc: "Can not find the user - Please check again",
    });
  }
  //check password match
  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(401).send({
        desc: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

// register new passenger
exports.registerPassenger = async (req, res) => {
  const { username, email, password, accountType, userType, NIC, passportNo } =
    req.body;

  let existingEmail = await findEmailDuplicates(email, res);
  let validationError = false;

  if (existingEmail === null) {
    if (userType === "Local") {
      if (!NIC && !passportNo) {
        validationError = true;
        return res.status(422).json({
          desc: "Please provide NIC or Passport no.",
        });
      }
      if (NIC && NIC.length < 10) {
        validationError = true;
        return res.status(422).json({
          desc: "Please provide valid NIC no.",
        });
      }
    } else if (userType === "Foreigner") {
      if (!passportNo) {
        validationError = true;
        return res.status(422).json({
          desc: "Please provide your Passport no.",
        });
      }
      if (accountType !== "Temporary") {
        validationError = true;
        return res.status(422).json({
          desc: "Please register with valid account type.",
        });
      }
    } else {
      validationError = true;
      return res.status(422).json({
        desc: "Please provide valid details.",
      });
    }
  }

  if (existingEmail === null && !validationError) {
    try {
      const passenger = await PassengerModel.create({
        username,
        email,
        password,
        accountType,
        userType,
        NIC,
        passportNo,
      });
      await TokenModel.create({
        passengerID: passenger._id,
      });
      const token = await passenger.getSignedToken();
      res.status(201).json({ success: true, token, role: "passenger" });
    } catch (error) {
      res.status(500).json({
        desc: "Error occurred in registerPassenger" + error,
      });
    }
  }
};

// register new conductor
exports.registerConductor = async (req, res) => {
  const { username, email, password } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const conductor = await ConductorModel.create({
        username,
        email,
        password,
      });
      const token = await conductor.getSignedToken();
      res.status(201).json({ success: true, token, role: "conductor" });
    } catch (error) {
      res.status(500).json({
        desc: "Error occurred in registerConductor" + error,
      });
    }
  }
};

// register new inspector
exports.registerInspector = async (req, res) => {
  const { username, email, password } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const inspector = await InspectorModel.create({
        username,
        email,
        password,
      });
      const token = await inspector.getSignedToken();
      res.status(201).json({ success: true, token, role: "inspector" });
    } catch (error) {
      res.status(500).json({
        desc: "Error occurred in registerInspector" + error,
      });
    }
  }
};

// register new manager
exports.registerManager = async (req, res) => {
  const { username, email, password } = req.body;
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const manager = await ManagerModel.create({
        username,
        email,
        password,
      });
      const token = await manager.getSignedToken();
      res.status(201).json({ success: true, token, role: "manager" });
    } catch (error) {
      res.status(500).json({
        desc: "Error occurred in registerManager" + error,
      });
    }
  }
};

// find duplicated user emails before register new passenger
const findEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await PassengerModel.findOne({ email: email });
    if (existingAccount) {
      return res.status(401).json({
        success: false,
        desc: "Email already exist - Please check again",
      });
    } else {
      return existingAccount;
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment-" + err,
    });
  }
};

//send response object to client if login success
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user });
};
