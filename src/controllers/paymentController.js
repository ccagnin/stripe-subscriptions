const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCustomer } = require("../services/customerService");
const { createSubscription } = require("../services/subscriptionService");

const paymentController = async (req, res) => {
  const { email, name, price_id } = req.body;
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    const savedCustomer = await createCustomer(customer);
    console.log(savedCustomer);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: process.env.STRIPE_API_VERSION },
    );

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price_id }],
      trial_period_days: 7,
    });

    const savedSubscription = await createSubscription(subscription);
    console.log(savedSubscription);

    if (typeof subscription.pending_setup_intent === "string") {
      const setupIntent = await stripe.setupIntents.retrieve(
        subscription.pending_setup_intent,
      );

      return res.json({
        setupIntent: setupIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
      });
    } else {
      throw new Error(
        "Expected response type string, but received: " +
          typeof subscription.pending_setup_intent,
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  paymentController,
};
