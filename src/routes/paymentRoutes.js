const express = require("express");
const router = express.Router();
const { createSession } = require("../services/paymentService");

router.post("/payment", createSession);

module.exports = router;
