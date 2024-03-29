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

module.exports = {
  createSubscription,
};
