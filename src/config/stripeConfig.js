const stripe = require("stripe");

const stripeConfig = {
  apiKey: process.env.STRIPE_API_KEY,
};

const stripeClient = stripe(stripeConfig.apiKey);

module.exports = {
  stripeClient,
};
