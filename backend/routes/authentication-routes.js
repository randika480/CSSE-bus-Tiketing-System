const express = require("express");
const router = express.Router();

// import controllers
const {
  registerConductor,
  registerInspector,
  registerManager,
  registerPassenger,
  login,
} = require("../controllers/authentication-controller");

// Registration-routes
router.route("/manager").post(registerManager);
router.route("/passenger").post(registerPassenger);
router.route("/inspector").post(registerInspector);
router.route("/conductor").post(registerConductor);

// Login-routes
router.route("/login").post(login);

module.exports = router;
