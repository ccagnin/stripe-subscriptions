require("dotenv").config();
const { STRIPE_KEY, PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.use(express.static("client"));

const stripe = require("stripe")(STRIPE_KEY);

const quantity = 25;

app.post("/create-customer", async (req, res) => {
  const { email, name } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });
    console.log("customer: ", customer);
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const price = req.body.price;
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      line_items: [
        {
          price: price,
          quantity: quantity,
        },
      ],
      mode: "subscription",
    });
    console.log("session: ", session.id, session.url, session);

    // get id, save to user, return url
    const savedSession = await prisma.client.create({
      data: {
        sessionId: session.id,
        sessionUrl: session.url,
      },
    });

    // save session.id to the user in your database
    console.log("savedSession: ", savedSession);
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/stripe-session", async (req, res) => {
  console.log("req.body: ", req.body);
  const { clientId } = req.body;
  console.log("clientId: ", clientId);

  const clientSession = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (!clientSession || clientSession.paidSub === true) {
    return res.send("fail");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      clientSession.sessionId,
    );
    console.log("session: ", session);

    if (session && session.status === "paid") {
      let updatedClient = await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          paidSub: true,
        },
      });

      console.log("updatedClient: ", updatedClient);

      return res.send("success");
    } else {
      return res.send("fail");
    }
  } catch (error) {
    console.error(
      "An error occurred while retrieving the Stripe session:",
      error,
    );
    return res.send("fail");
  }
});

const port = PORT;
app.listen(port, () => console.log(`Port running on port ${port}`));
