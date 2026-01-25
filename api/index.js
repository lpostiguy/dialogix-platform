const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../backend/.env") });

const app = express();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "Error: STRIPE_SECRET_KEY is missing in environment variables.",
  );
}
const stripe = process.env.STRIPE_SECRET_KEY
  ? Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

app.use(cors());
app.use(express.json());

app.post("/api/create-payment-intent", async (req, res) => {
  if (!stripe) {
    return res
      .status(500)
      .send({ error: "Stripe API Key is missing on Server." });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = app;
