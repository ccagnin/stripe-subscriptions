require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");
const { connectToDatabase } = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.static("client"));
app.use(routes);

connectToDatabase();

app.listen(PORT, () => console.log(`Port running on port ${PORT}`));

// app.post("/create-checkout-session", async (req, res) => {
//   const price = req.body.price;
//   try {
//     const session = await stripe.checkout.sessions.create({
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//       line_items: [
//         {
//           price: price,
//           quantity: quantity,
//         },
//       ],
//       mode: "subscription",
//     });
//     console.log("session: ", session.id, session.url, session);

//     // get id, save to user, return url
//     const savedSession = await prisma.client.create({
//       data: {
//         sessionId: session.id,
//         sessionUrl: session.url,
//       },
//     });

//     // save session.id to the user in your database
//     console.log("savedSession: ", savedSession);
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// app.get("/stripe-session", async (req, res) => {
//   console.log("req.body: ", req.body);
//   const { clientId } = req.body;
//   console.log("clientId: ", clientId);

//   const clientSession = await prisma.client.findUnique({
//     where: {
//       id: clientId,
//     },
//   });

//   if (!clientSession || clientSession.paidSub === true) {
//     return res.send("fail");
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(
//       clientSession.sessionId,
//     );
//     console.log("session: ", session);

//     if (session && session.status === "paid") {
//       let updatedClient = await prisma.client.update({
//         where: {
//           id: clientId,
//         },
//         data: {
//           paidSub: true,
//         },
//       });

//       console.log("updatedClient: ", updatedClient);

//       return res.send("success");
//     } else {
//       return res.send("fail");
//     }
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the Stripe session:",
//       error,
//     );
//     return res.send("fail");
//   }
// });
