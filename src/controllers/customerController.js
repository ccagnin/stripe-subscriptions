const stripe = require("stripe")(process.env.STRIPE_KEY);
const { createCustomer } = require("../services/customerService");

const createCustomerController = async (req, res) => {
  const { email, name } = req.body;
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    const savedCustomer = await createCustomer(customer);

    res.json({ customer: savedCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomerController,
};
