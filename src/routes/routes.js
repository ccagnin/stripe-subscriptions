const express = require("express");
const router = express.Router();
const { paymentController } = require("../controllers/paymentController");
const {
  cancelSubscriptionController,
} = require("../controllers/cancelSubscriptionController");

router.post("/pay", paymentController);
router.patch("/cancel", cancelSubscriptionController);

module.exports = router;
