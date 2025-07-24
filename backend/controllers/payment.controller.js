const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const createOrder = async (req, res) => {
  try {
    const { amount, currency, name, description } = req.body;

    if (!amount || !currency || !name || !description) {
      return res.status(400).send({ success: false, msg: "Missing required fields" });
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

    razorpayInstance.orders.create(options, (err, order) => {
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




const verifyPayment = (paymentId, orderId, signature) => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", razorpayInstance.key_secret)
    .update(body)
    .digest("hex");

  if (expectedSignature === signature) {
    return { success: true };
  } else {
    return { success: false }
  }
};



module.exports = { createOrder, verifyPayment };
