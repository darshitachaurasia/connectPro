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
} from "antd";
import {
  VideoCameraOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
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
import { getToken } from "../../helper";

const { Title, Text, Link } = Typography;

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export default function BookingPage() {
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorId } = useParams(); // Get mentorId from URL
  const { user, status: authStatus } = useSelector((state) => state.auth);
  const [mentor, setMentor] = useState(null);
  const [services, setServices] = useState([]);
  const [loadError, setLoadError] = useState("");

  // --- State (Unchanged) ---
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [bookingError, setBookingError] = useState("");
  
  useEffect(() => {
    if (!user) {
      if (authStatus === "loading" || (getToken() && authStatus !== "failed")) return;
      navigate("/login", { state: { from: location } });
      return;
    }

    const fetchMentor = async () => {
      try {
        const response = await mentorApi.getMentorById(mentorId);
        setMentor(response.data.mentor);
        const activeServices =
          response.data.mentor.services?.filter((service) => service.active).map((service) => ({
            ...service,
            name: service.serviceName || service.name,
          })) ||
          [];
        const availableServices = activeServices.length > 0
          ? activeServices
          : [{
              _id: null,
              name: "Career Consultation",
              description: "A focused one-on-one session with your mentor.",
              duration: 60,
              price: response.data.mentor.hourlyRate,
              isDefault: true,
            }];
        setServices(availableServices);
        setSelectedService(availableServices[0]);
      } catch (error) {
        setLoadError(error.response?.data?.message || "Could not load this mentor's booking details.");
      }
    };
    fetchMentor();
  }, [user, authStatus, mentorId, navigate, location]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !user) return;
      setSlotsLoading(true);
      setSlotsError("");
      try {
        const response = await bookingApi.getBookedSlots(
          mentorId,
          selectedDate.format("YYYY-MM-DD")
        );
        setBookedSlots(response.data.bookedSlots);
        setSelectedTime((current) =>
          response.data.bookedSlots.includes(current) ? "" : current
        );
      } catch (error) {
        setSlotsError(error.response?.data?.message || "Could not load available times.");
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchBookedSlots();
  }, [selectedDate, mentorId, user]);

  const handleNext = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const handlePrevious = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleBooking = async (transactionId) => {
    const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!timeParts) {
      setBookingError("Choose an available appointment time.");
      return;
    }

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    if (timeParts[3] === 'PM' && hours < 12) hours += 12;
    if (timeParts[3] === 'AM' && hours === 12) hours = 0;

    const bookingDateTime = selectedDate.hour(hours).minute(minutes).second(0).toISOString();
    
    const bookingPayload = {
      mentorId: mentorId,
      ...(selectedService._id ? { service: selectedService._id } : {}),
      dateTime: bookingDateTime,
      message: message,
      paymentDetails: {
        method: "stripe",
        amount: finalTotal,
        transactionId,
      }
    };

    setBookingError("");
    try {
      await dispatch(createBooking(bookingPayload)).unwrap();
      setStep(4);
    } catch (error) {
      setBookingError(
        typeof error === "string" ? error : error.message || "Payment succeeded, but the booking could not be saved. Please contact support."
      );
    }
  };

  const handlePrimaryAction = () => {
    if (step === 1) handleNext();
  };

  const disabledDate = (current) => {
    const isPastDate = current && current < dayjs().startOf('day');
    return isPastDate;
  }

  const isPastTime = (time) => {
    if (!selectedDate.isSame(dayjs(), "day")) return false;
    const [clock, period] = time.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return !selectedDate.hour(hours).minute(minutes).second(0).isAfter(dayjs());
  };

  const hasSessionRate = Number.isFinite(Number(selectedService?.price)) && Number(selectedService?.price) > 0;
  const canProceedStep1 = selectedDate && selectedTime && selectedService && hasSessionRate;
  const totalPrice = hasSessionRate ? Number(selectedService.price) : 0;
  const finalTotal = totalPrice;

  // Inline component for Stripe payment
  const StripeCheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleStripePay = async () => {
      if (!stripe || !elements || !selectedService || !selectedTime) return;
      setProcessing(true);
      setErrorMsg("");
      try {
        const intent = await paymentApi.createStripeIntent({
          amount, // dollars
          currency: 'usd',
          metadata: {
            mentorId,
            userId: user?._id,
            ...(selectedService?._id ? { serviceId: selectedService._id } : {}),
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
          await handleBooking(paymentIntent.id);
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
        <div className="p-4 border rounded-md bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        {errorMsg && <div className="text-red-500 mt-2 text-sm">{errorMsg}</div>}
        <Button type="primary" className="mt-4" onClick={handleStripePay} disabled={processing || !stripe}>
          {processing ? 'Processing…' : `Pay $${amount} and book`}
        </Button>
      </div>
    );
  };

  if (!mentor) {
    if (loadError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
          <Result
            status="error"
            title="Booking details unavailable"
            subTitle={loadError}
            extra={<Button onClick={() => navigate(-1)}>Go back</Button>}
          />
        </div>
      );
    }
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
            <Button type="primary" key="dashboard" onClick={() => navigate("/booking-details")}>Booking Details</Button>,
            <Button key="profile" onClick={() => navigate(`/mentor/${mentorId}`)}>View Mentor Profile</Button>,
          ]}
        />
      </div>
    );
  }

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm" title={<Flex align="center" gap="small"><VideoCameraOutlined /> Choose a session</Flex>}>
              {!hasSessionRate && (
                <Alert
                  type="warning"
                  showIcon
                  className="mb-4"
                  message="This mentor has not set a session rate yet"
                  description="Please choose another mentor or check back later."
                />
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${selectedService?._id === service._id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-blue-300'}`}
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
              <Card className="rounded-2xl shadow-sm" title={<Flex align="center" gap="small"><CalendarOutlined /> Select date</Flex>}>
                <Calendar fullscreen={false} onSelect={(date) => { setSelectedDate(date); setSelectedTime(""); setBookingError(""); setSlotsError(""); }} disabledDate={disabledDate} value={selectedDate} />
              </Card>
              <Card className="rounded-2xl shadow-sm" title={<Flex align="center" gap="small"><ClockCircleOutlined /> Available times</Flex>}>
                <div className="mb-4 text-sm text-slate-500">{selectedDate.format("dddd, MMMM D")}</div>
                {slotsError && <Alert className="mb-3" type="error" showIcon message={slotsError} />}
                {slotsLoading ? <div className="py-8 text-center text-slate-500">Checking availability...</div> : (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    const isUnavailable = isBooked || isPastTime(time);
                    return (
                      <Button
                        key={time}
                        type={selectedTime === time ? "primary" : "default"}
                        onClick={() => { setSelectedTime(time); setBookingError(""); }}
                        className="h-11"
                        disabled={isUnavailable || Boolean(slotsError)}
                      >
                        {isBooked ? `${time} · Booked` : isPastTime(time) ? `${time} · Past` : time}
                      </Button>
                    );
                  })}
                </div>
                )}
              </Card>
            </div>
            
            <Card className="rounded-2xl shadow-sm" title="Add a note (optional)" extra={`To: ${mentor.fullname}`}>
              <Input.TextArea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your goals, challenges, or specific topics..."/>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm" title={<Flex align="center" gap="small"><CreditCardOutlined /> Secure card payment</Flex>}>
                <p className="mb-4 text-sm text-slate-600">Pay securely by card to confirm your session.</p>
                 {stripePromise ? (
                   <Elements stripe={stripePromise}>
                     <StripeCheckoutForm amount={finalTotal} />
                   </Elements>
                 ) : (
                   <Alert
                     type="error"
                     showIcon
                     message="Online booking is temporarily unavailable"
                     description="Card payments are not configured. Please try again later."
                   />
                 )}
            </Card>
            <Alert message="Your card details stay secure" description="Payment is handled securely by Stripe." type="success" showIcon icon={<SafetyCertificateOutlined />} />
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
          <Steps current={step - 1} items={[{ title: 'Choose a session' }, { title: 'Secure payment' }]}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {bookingError && <Alert className="mb-5" type="error" showIcon message={bookingError} />}
            {renderStepContent()}
            <div className="mt-6 flex justify-between">
              <Button onClick={handlePrevious} disabled={step === 1}>Back</Button>
              {step === 1 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handlePrimaryAction}
                  disabled={!canProceedStep1 || !services.length || slotsLoading || Boolean(slotsError)}
                >
                  Continue to payment
                </Button>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-6">
                <Card className="overflow-hidden rounded-2xl border-0 shadow-xl">
                  <div className="-mx-6 -mt-6 mb-5 bg-gradient-to-br from-blue-700 to-indigo-800 px-6 py-7 text-white">
                    <div className="flex items-center gap-4">
                      <Avatar size={64} src={mentor.profile?.profileImage} className="shrink-0 border-2 border-white/70">
                        {mentor.fullname?.[0]?.toUpperCase()}
                      </Avatar>
                      <div className="min-w-0">
                        <Text className="block text-xs uppercase tracking-widest text-blue-100">Your mentor</Text>
                        <Title level={4} className="!mb-0 !mt-1 !text-white">{mentor.fullname}</Title>
                        {mentor.expertise?.length > 0 && (
                          <Text className="block truncate text-blue-100">{mentor.expertise.slice(0, 2).join(" · ")}</Text>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Text type="secondary" className="block text-xs uppercase tracking-wide">Session</Text>
                      <Text strong>{selectedService?.name || "Choose a session"}</Text>
                      {selectedService && <Text type="secondary" className="block">{selectedService.duration} minutes</Text>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <Text type="secondary" className="block text-xs">Date</Text>
                        <Text strong>{selectedDate.format("MMM D, YYYY")}</Text>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <Text type="secondary" className="block text-xs">Time</Text>
                        <Text strong>{selectedTime || "Not selected"}</Text>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between">
                        <Text type="secondary">Total</Text>
                        <Title level={3} className="!m-0 !text-blue-700">${finalTotal}</Title>
                      </div>
                      <Text type="secondary" className="block text-right text-xs">No extra fees</Text>
                    </div>
                    <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
                      <SafetyCertificateOutlined className="mr-2" />
                      Secure payment. Your booking is confirmed after payment.
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
