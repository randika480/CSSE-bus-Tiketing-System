const express = require("express");
const router = express.Router();
const { protectedConductor } = require("../middlewares/auth-middleware");
const {
  getProfile,
  getPassengerCount,
  getPassengerDetails,
} = require("../controllers/conductor-controller");

router.route("/get-profile").get(protectedConductor, getProfile);
router.route("/passenger-count").get(getPassengerCount);
router.route("/passenger-details").get(getPassengerDetails);

module.exports = router;
