import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Avatar,
  Calendar,
  Input,
  Typography,
  Steps,
  Alert,
  Result,
  Flex,
  Radio
} from "antd";
import {
  VideoCameraOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// --- New Imports ---
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import mentorApi from "../../apiManager/mentor";
import { createBooking } from "../../redux/bookingSlice";
import bookingApi from "../../apiManager/booking";
import paymentApi from "../../apiManager/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const { Title, Text, Link } = Typography;

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export default function BookingPage() {
  // Stripe init
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");
  // --- New Hooks for Redux & Routing ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorId } = useParams(); // Get mentorId from URL
  const { user } = useSelector((state) => state.auth); // Get user from Redux store
  const [mentor, setMentor] = useState(null);
  const [services, setServices] = useState([]);

  // --- State (Unchanged) ---
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  
  // --- New Authentication & Data Check Effect ---
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    }
    const fetchMentor = async () => {
      try {
        const response = await mentorApi.getMentorById(mentorId);
        setMentor(response.data.mentor);
        const activeServices =
          response.data.mentor.services?.filter((service) => service.active) ||
          [];
        setServices(activeServices);
        if (activeServices.length > 0) {
          setSelectedService(activeServices[0]);
        }
      } catch (error) {
        console.error("Failed to fetch mentor details", error);
      }
    };
    fetchMentor();
  }, [user, mentorId, navigate, location]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      try {
        const response = await bookingApi.getBookedSlots(
          mentorId,
          selectedDate.format("YYYY-MM-DD")
        );
        setBookedSlots(response.data.bookedSlots);
      } catch (error) {
        console.error("Failed to fetch booked slots", error);
      }
    };
    fetchBookedSlots();
  }, [selectedDate, mentorId]);

  const handleNext = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const handlePrevious = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  // --- Updated handleBooking function ---
  const handleBooking = (transactionId) => {
    // Combine date and time to create a full ISODate string for the backend
    const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!timeParts) return; // Or show an error

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    if (timeParts[3] === 'PM' && hours < 12) hours += 12;
    if (timeParts[3] === 'AM' && hours === 12) hours = 0; // Midnight case

    const bookingDateTime = selectedDate.hour(hours).minute(minutes).second(0).toISOString();
    
    const bookingPayload = {
      userId: user._id,
      mentorId: mentorId,
      service: selectedService,
      dateTime: bookingDateTime,
      message: message,
      paymentDetails: {
        method: paymentMethod,
        amount: finalTotal,
  transactionId: transactionId || `txn_${Date.now()}` // Use Stripe/Razorpay id if provided
      }
    };

    console.log("Dispatching booking:", bookingPayload);
    // Uncomment the line below when your action is ready
    dispatch(createBooking(bookingPayload));
    
    setStep(4); // Proceed to success screen
  };

  const handlePrimaryAction = () => {
    if (step === 2) {
      if (paymentMethod === 'stripe') return; // Stripe button is inside form
      handleBooking();
    } else {
      handleNext();
    }
  };

  const disabledDate = (current) => {
    const isPastDate = current && current < dayjs().startOf('day');
    const dayOfWeek = current.day();
    return isPastDate || dayOfWeek === 0 || dayOfWeek === 6;
  }

  const canProceedStep1 = selectedDate && selectedTime && selectedService;
  const canProceedStep2 = paymentMethod;
  const totalPrice = selectedService ? selectedService.price : 0;
  const platformFee = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + platformFee;

  // Inline component for Stripe payment
  const StripeCheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleStripePay = async () => {
      if (!stripe || !elements) return;
      setProcessing(true);
      setErrorMsg("");
      try {
        const intent = await paymentApi.createStripeIntent({
          amount, // dollars
          currency: 'usd',
          metadata: {
            mentorId,
            userId: user?._id,
            serviceId: selectedService?._id,
          },
        });
        if (!intent?.success || !intent?.clientSecret) {
          throw new Error('Failed to create payment intent');
        }
        const card = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(intent.clientSecret, {
          payment_method: { card },
        });
        if (error) {
          setErrorMsg(error.message || 'Payment failed.');
          return;
        }
        if (paymentIntent?.status === 'succeeded') {
          // Complete booking with Stripe transaction id
          handleBooking(paymentIntent.id);
        } else {
          setErrorMsg('Payment not completed.');
        }
      } catch (e) {
        setErrorMsg(e.message || 'Payment error');
      } finally {
        setProcessing(false);
      }
    };

    return (
      <div className="mt-6">
        {!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY && (
          <Alert type="warning" message="Stripe publishable key missing" description="Set VITE_STRIPE_PUBLISHABLE_KEY in your .env to enable Stripe payments." showIcon className="mb-3" />
        )}
        <div className="p-4 border rounded-md bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        {errorMsg && <div className="text-red-500 mt-2 text-sm">{errorMsg}</div>}
        <Button type="primary" className="mt-4" onClick={handleStripePay} disabled={processing || !stripe}>
          {processing ? 'Processing…' : `Pay $${amount}`}
        </Button>
      </div>
    );
  };

  // --- Step 4: Confirmation Screen (Unchanged but now follows a real dispatch) ---
  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 text-3xl">
        Loading booking page...
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white via-white">
        <Result
          status="success"
          title="Booking Confirmed!"
          subTitle={`Your session with ${mentor.fullname} for ${selectedService.name} on ${selectedDate.format("MMMM D, YYYY")} at ${selectedTime} is booked.`}
          extra={[
            // These buttons now correctly navigate the user after booking
            <Button type="primary" key="dashboard" onClick={() => navigate("/booking-details")}>Booking Details</Button>,
            <Button key="profile" onClick={() => navigate(`/mentor/${mentorId}`)}>View Mentor Profile</Button>,
          ]}
        />
      </div>
    );
  }

  const renderStepContent = () => {
    // ...The content of this function (all the JSX for steps 1 and 2) remains the same
    // For brevity, it's omitted here but should be copied from the previous version.
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <Card title={<Flex align="center" gap="small"><VideoCameraOutlined /> Select Service</Flex>}>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedService?._id === service._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <p className="text-sm text-gray-500 mt-2 flex items-center"><ClockCircleOutlined className="mr-1" /> {service.duration} min</p>
                      </div>
                      <p className="text-lg font-bold text-blue-600">${service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title={<Flex align="center" gap="small"><CalendarOutlined /> Select Date</Flex>}>
                <Calendar fullscreen={false} onSelect={setSelectedDate} disabledDate={disabledDate} value={selectedDate} />
              </Card>
              <Card title={<Flex align="center" gap="small"><ClockCircleOutlined /> Select Time</Flex>}>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        type={selectedTime === time ? "primary" : "default"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12 flex-grow"
                        disabled={isBooked}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </Card>
            </div>
            
            <Card title="Message (Optional)" extra={`To: ${mentor.fullname}`}>
              <Input.TextArea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your goals, challenges, or specific topics..."/>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card title={<Flex align="center" gap="small"><CreditCardOutlined /> Payment Method</Flex>}>
                <div className="space-y-3">
                    <div onClick={() => setPaymentMethod('card')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <Flex align="center" gap="middle">
                           <Radio checked={paymentMethod === 'card'}/>
                           <div><Text strong>Credit/Debit Card</Text><br/><Text type="secondary">Visa, Mastercard, American Express</Text></div>
                        </Flex>
                    </div>
                    <div onClick={() => setPaymentMethod('razorpay')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'razorpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <Flex align="center" gap="middle">
                           <Radio checked={paymentMethod === 'razorpay'}/>
                           <div><Text strong>Razorpay</Text><br/><Text type="secondary">UPI, Net Banking, Wallets</Text></div>
                        </Flex>
                    </div>
                    <div onClick={() => setPaymentMethod('stripe')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <Flex align="center" gap="middle">
                           <Radio checked={paymentMethod === 'stripe'}/>
                           <div><Text strong>Stripe</Text><br/><Text type="secondary">Pay securely with card via Stripe</Text></div>
                        </Flex>
                    </div>
                </div>

               {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <hr />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Card Number" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVV" />
                  </div>
                </div>
               )}

               {paymentMethod === 'stripe' && (
                 <Elements stripe={stripePromise}>
                   <StripeCheckoutForm amount={finalTotal} />
                 </Elements>
               )}
            </Card>
            <Alert message="Secure Payment" description="Your payment information is encrypted and secure." type="success" showIcon icon={<SafetyCertificateOutlined />} />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    // --- Animated top-level container ---
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white via-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* This Link now uses the dynamic mentorId from the URL */}
          <Link onClick={() => navigate(`/mentor/${mentorId}`)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
            <ArrowLeftOutlined /> Back to Profile
          </Link>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <Steps current={step - 1} items={[{ title: 'Select Date & Time' }, { title: 'Payment Details' }, { title: 'Confirmation' }]}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderStepContent()}
            <div className="flex justify-between mt-6">
              <Button onClick={handlePrevious} disabled={step === 1}>Previous</Button>
              <Button type="primary" onClick={handlePrimaryAction} disabled={(step === 1 && !canProceedStep1) || (step === 2 && (!canProceedStep2 || paymentMethod === 'stripe'))}>
                {step === 2 ? "Complete Booking" : "Next"}
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-6">
                <Card title="Booking Summary">
                  <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar size={64} src={mentor.avatar} />
                        <div>
                          <Text strong>{mentor.fullname}</Text>
                          <Text type="secondary" className="block">{mentor.bio}</Text>
                        </div>
                      </div>
                      <hr/>
                      <div className="space-y-2">
                          {selectedService && <div className="flex justify-between"><Text type="secondary">Service:</Text> <Text strong className="text-right">{selectedService.name}</Text></div>}
                          {selectedService && <div className="flex justify-between"><Text type="secondary">Duration:</Text> <Text strong>{selectedService.duration} minutes</Text></div>}
                          {selectedDate && <div className="flex justify-between"><Text type="secondary">Date:</Text> <Text strong>{selectedDate.format("MMM D, YYYY")}</Text></div>}
                          {selectedTime && <div className="flex justify-between"><Text type="secondary">Time:</Text> <Text strong>{selectedTime}</Text></div>}
                      </div>
                      <hr/>
                      <div className="space-y-2">
                         <div className="flex justify-between"><Text type="secondary">Service Fee:</Text> <Text strong>${totalPrice}</Text></div>
                         <div className="flex justify-between"><Text type="secondary">Platform Fee:</Text> <Text strong>${platformFee}</Text></div>
                         <hr/>
                         <div className="flex justify-between items-center"><Title level={4} className="!m-0">Total:</Title> <Title level={4} className="!m-0 !text-blue-600">${finalTotal}</Title></div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                          <ul className="space-y-1 list-none p-0">
                            {['HD video call', 'Session recording', 'Follow-up notes', '24/7 support'].map(item => (
                              <li key={item} className="flex items-center"><CheckCircleOutlined className="text-green-500 mr-2"/><Text type="secondary">{item}</Text></li>
                            ))}
                          </ul>
                      </div>
                  </div>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
