import api from "./index";

const paymentApi = {
  // Razorpay
  createOrder: async ({ amount, currency = "INR", name, description }) => {
    const { data } = await api.post("/payment/create-order", {
      amount,
      currency,
      name,
      description,
    });
    return data;
  },

  verifyPayment: async (payload) => {
    const { data } = await api.post("/payment/verify-payment", payload);
    return data;
  },

  // Stripe
  createStripeIntent: async ({ amount, currency = "usd", metadata = {} }) => {
    const { data } = await api.post("/payment/stripe/create-intent", {
      amount,
      currency,
      metadata,
    });
    return data;
  },
};

export default paymentApi;