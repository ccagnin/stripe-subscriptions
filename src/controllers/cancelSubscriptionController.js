/* eslint-disable no-unused-vars */
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getSubscriptionBySubId } = require("../services/subscriptionService");

const cancelSubscriptionController = async (req, res) => {
  const { subscriptionId } = req.body;
  try {
    const subscription = await getSubscriptionBySubId(subscriptionId);

    const cancelledSubscription = await stripe.subscriptions.cancel(
      subscription.stripeSubscriptionId,
    );

    await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: "canceled",
      },
    });

    res.json({ subscription: cancelledSubscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cancelSubscriptionController,
};
