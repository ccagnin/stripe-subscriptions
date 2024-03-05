const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      line_items: [
        {
          price: "price_1Or2MeJb0HiN0pQ4j8pwoBzv",
          quantity: 1,
        },
        // {
        //   price: process.env.MONTH_PRICE_KEY,
        //   quantity: 1,
        // },
        // {
        //   price: process.env.WEEK_PRICE_KEY
        //   quantity: 1,
        // },
      ],
      mode: "subscription",
    });
    console.log("session:", session.id, session.url, session);

    const sessionId = session.id;
    console.log("sessionId:", sessionId);
    // save to database later

    res.json({ url: session.url });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

module.exports = {
  createSession,
};
