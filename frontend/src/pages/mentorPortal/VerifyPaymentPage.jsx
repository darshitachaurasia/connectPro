import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { verifyPayment } from "../../apiManger/booking";

const VerifyPaymentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { paymentData } = location.state || {};  // Get the payment data from previous page
  const [otp, setOtp] = useState("");
  const [ccv, setCcv] = useState("");

  const handleVerify = async () => {
    if (!otp || !ccv) {
      alert("Please enter both OTP and CCV");
      return;
    }

    try {
      const verification = await verifyPayment({
        paymentId: paymentData.razorpay_payment_id,
        orderId: paymentData.razorpay_order_id,
        signature: paymentData.razorpay_signature,
        otp,
        ccv,
      });

      if (verification.success) {
        alert("Payment Successful!");
        // Redirect to booking confirmation or success page
        history.push("/booking/success");
      } else {
        alert("Payment Verification Failed!");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Payment Verification Failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-center text-gray-800">Verify Payment</h2>

        {/* OTP and CCV Inputs */}
        <div className="mt-4">
          <label className="block text-gray-600 font-medium">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter OTP"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-medium">Enter CCV</label>
          <input
            type="text"
            value={ccv}
            onChange={(e) => setCcv(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter CCV"
          />
        </div>

        {/* Verify Payment Button */}
        <button
          onClick={handleVerify}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Verify Payment
        </button>
      </div>
    </div>
  );
};

export default VerifyPaymentPage;
