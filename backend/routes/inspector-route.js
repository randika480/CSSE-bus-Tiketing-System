const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const { protectedInspector } = require("../middlewares/auth-middleware");

//import controllers
const {
  createInquiries,
  getCurrentJourneyTokens,
  getInquiries,
  updateInquiry,
  deleteInquiry,
  getAllJourneys,
  getOneJourney
} = require("../controllers/inspector-controller");

//inspector routes
router.route("/createInquiry").post(protectedInspector, createInquiries);
router.route("/getCurrentJourneyTokens/:JID").get(getCurrentJourneyTokens);
router.route("/getInquiries").get(protectedInspector, getInquiries);
router.route("/updateInquiries").put(protectedInspector, updateInquiry);
router
  .route("/deleteInquiries/:inquiryID")
  .delete(protectedInspector, deleteInquiry);
router.route("/getAllJourneys").get(getAllJourneys);
router.route("/getOneJourney").get(getOneJourney);

module.exports = router;
