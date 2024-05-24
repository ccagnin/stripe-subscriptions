/* eslint-disable no-unused-vars */
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getSubscriptionBySubId } = require("../services/subscriptionService");

const cancelSubscriptionController = async (req, res) => {
  const { subscriptionId } = req.body;
  try {
    console.log("Subscription ID:", subscriptionId);
    const subscription = await getSubscriptionBySubId(subscriptionId);
    console.log("Subscription found:", subscription);

    console.log("Canceling subscription...");
    const cancelledSubscription = await stripe.subscriptions.cancel(
      subscription.id,
    );

    console.log("Subscription canceled:", cancelledSubscription);
    await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: "canceled",
      },
    });
    console.log("Subscription status updated in database");
    res.json({ subscription: cancelledSubscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cancelSubscriptionController,
};
