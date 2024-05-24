const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createSubscription = async (subscriptionData) => {
  try {
    const savedSubscription = await prisma.subscription.create({
      data: {
        id: subscriptionData.id,
        customerId: subscriptionData.customer,
        priceId: subscriptionData.items.data[0].price.id,
        status: subscriptionData.status,
      },
    });

    console.log("Assinatura salva no banco de dados:", savedSubscription);

    return savedSubscription;
  } catch (error) {
    throw new Error("Error saving subscription: " + error.message);
  }
};

const getSubscriptionBySubId = async (subscriptionId) => {
  console.log("Subscription ID to get subs:", subscriptionId);
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
    });

    return subscription;
  } catch (error) {
    throw new Error("Error getting subscription: " + error.message);
  }
};

module.exports = {
  createSubscription,
  getSubscriptionBySubId,
};
