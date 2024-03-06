const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCustomer = async (customerData) => {
  try {
    const savedCustomer = await prisma.customer.create({
      data: {
        id: customerData.id,
        email: customerData.email,
        name: customerData.name,
      },
    });

    return savedCustomer;
  } catch (error) {
    throw new Error("Error saving customer: " + error.message);
  }
};

module.exports = {
  createCustomer,
};
