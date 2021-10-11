const express = require("express");
const router = express.Router();

// import controllers
const {
  createTerminal,
  createTransporter,
  createJourney,
  createCost,
  updateTransporter,
  getJourney,
  updateCost,
  updateJourney,
  getCosts,
  getTransporters,
  getTerminals,
  getTokens,
  getOneJourney,
  getConductors,
  deleteJourney,
  deleteTerminals,
  deleteTransporters,
  getInquaries,
  getJourneyWithTerminals,
  suspendToken,
  calculateCost,
} = require("../controllers/manager-controller");

router.route("/createTerminal").post(createTerminal);
router.route("/createTransporter").post(createTransporter);
router.route("/createJourney").post(createJourney);
router.route("/createCost").post(createCost);
router.route("/updateTransporter").put(updateTransporter);
router.route("/getJourney").get(getJourney);
router.route("/updateCost").put(updateCost);
router.route("/updateJourney").put(updateJourney);
router.route("/getCosts").get(getCosts);
router.route("/getTransporters").get(getTransporters);
router.route("/getTerminals").get(getTerminals);
router.route("/getTokens").get(getTokens);
router.route("/getOneJourney").get(getOneJourney);
router.route("/getConductors").get(getConductors);
router.route("/deleteJourney/:id").delete(deleteJourney);
router.route("/deleteTerminals/:id").delete(deleteTerminals);
router.route("/deleteTransporters/:id").delete(deleteTransporters);
router.route("/getInquaries").get(getInquaries);
router.route("/getJourneyWithTerminals").get(getJourneyWithTerminals);
router.route("/suspendToken/:TID").put(suspendToken);
router.route("/calculateCost").get(calculateCost);

module.exports = router;
