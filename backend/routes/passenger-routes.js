const express = require("express");
const router = express.Router();
const { protectedPassenger } = require("../middlewares/auth-middleware");
const {
  getProfile,
  getPassengerToken,
  getJourneyHistory,
  getJourney,
  getTerminal,
  getAllJourneys,
  initiateJourney,
  completeJourney,
  rechargeToken,
} = require("../controllers/passenger-controller");

router.route("/get-profile").get(protectedPassenger, getProfile);
router.route("/get-token").get(protectedPassenger, getPassengerToken);
router.route("/journey-history").get(protectedPassenger, getJourneyHistory);
router.route("/get-journey/:id").get(getJourney);
router.route("/get-terminal/:id").get(getTerminal);
router.route("/get-journeys").get(getAllJourneys);
router.route("/initiate-journey").put(protectedPassenger, initiateJourney);
router.route("/complete-journey").put(protectedPassenger, completeJourney);
router.route("/recharge").put(protectedPassenger, rechargeToken);

module.exports = router;
