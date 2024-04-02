/* eslint-disable no-unused-vars */
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cancelSubscriptionController = async (req, res) => {
  const { subscriptionId } = req.body;
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);

    const deletedSubscription = await prisma.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: "canceled",
      },
    });

    console.log("Assinatura cancelada:", deletedSubscription);

    res.json({ message: "Subscription canceled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  cancelSubscriptionController,
};
