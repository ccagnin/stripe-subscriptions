const express = require("express");
const router = express.Router();
const {
  createCustomerController,
} = require("../controllers/customerController");
const {
  createSubscriptionController,
} = require("../controllers/subscriptionController");

router.post("/create-customer", createCustomerController);
router.post("/create-subscription", createSubscriptionController);

module.exports = router;
