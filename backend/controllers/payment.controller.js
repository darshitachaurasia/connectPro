import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

// Lazy initializer to avoid crashing when env vars are missing
const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
};

const createOrder = async (req, res) => {
  try {
    const { amount, currency, name, description } = req.body;

    if (!amount || !currency || !name || !description) {
      return res.status(400).send({ success: false, msg: "Missing required fields" });
    }

    const rzp = getRazorpay();
    if (!rzp) {
      return res.status(500).send({ success: false, msg: "Razorpay not configured" });
    }

    const amountInPaise = amount * 100; // Convert to paise
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,  // Unique receipt
      notes: {
        description,
        name
      }
    };

    rzp.orders.create(options, (err, order) => {
      if (err) {
        console.error("Razorpay error:", err);
        return res.status(400).send({ success: false, msg: "Something went wrong!" });
      }

      res.status(200).send({
        success: true,
        msg: "Order Created",
        order_id: order.id,
        amount: amountInPaise,
        key_id: process.env.RAZORPAY_KEY_ID,
        product_name: name,
        description,
        contact: "8567345632",
        name: "Pinkee Mishra",
        email: "pinkee.mishra343390@gmail.com",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).send({ success: false, msg: "Server Error" });
  }
};

// controllers/payment.controller.js

export const verifyPayment = (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body || {};
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, msg: "Missing verification fields" });
    }
    const rzp = getRazorpay();
    if (!rzp) {
      return res.status(500).json({ success: false, msg: "Razorpay not configured" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const valid = expectedSignature === razorpay_signature;
    return res.status(200).json({ success: valid });
  } catch (err) {
    console.error("verifyPayment error:", err);
    return res.status(500).json({ success: false, msg: "Verification error" });
  }
};

export { createOrder };

// ---------------- Stripe Integration ----------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "usd", metadata = {} } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, msg: "amount is required" });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, msg: "Stripe not configured" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount expected in smallest currency unit by Stripe
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err) {
    console.error("Stripe create intent error:", err);
    return res.status(500).json({ success: false, msg: "Failed to create payment intent" });
  }
};
