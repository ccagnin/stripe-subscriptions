const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createSubscription } = require("../services/subscriptionService");

const createSubscriptionController = async (req, res) => {
  const { customer, items } = req.body;
  try {
    const subscription = await stripe.subscriptions.create({
      customer,
      items: items,
      trial_period_days: 7,
    });

    if (!subscription) {
      return res.status(500).json({ error: "Error creating subscription" });
    }

    const savedSubscription = await createSubscription(subscription);

    res.json({ subscription: savedSubscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubscriptionController,
};
