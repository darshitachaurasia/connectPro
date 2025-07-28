
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MentorshipFlow() {
  const steps = [
    { title: "Create Your Profile", icon: "👤" },
    { title: "Find Your Match", icon: "🔍" },
    { title: "Connect & Collaborate", icon: "🤝" },
    { title: "Schedule Sessions", icon: "🗓️" },
    { title: "Achieve Your Goals", icon: "🚀" },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-8 py-12 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Unlock Your Potential: <br />
        <span className="text-blue-600">Your Mentorship Journey Starts Here</span>
      </h2>
      <p className="text-center text-gray-600 mt-4 max-w-3xl">
        Connect with experienced mentors and achieve your personal and professional goals with ConnectPro.
      </p>

      <div className="mt-12 flex flex-col lg:flex-row gap-12 w-full max-w-7xl items-center justify-between">
        {/* Left Side - Flow Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full lg:w-3/4">
          {steps.map((step, index) => (
            <Link
              href="/"
              key={index}
              className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-2xl font-semibold text-blue-800 mb-2">0{index + 1}</div>
              <div className="text-md font-medium text-gray-800 group-hover:underline">
                {step.title}
              </div>
            </Link>
          ))}
        </div>

        {/* Right Side - Video */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="relative w-full aspect-video rounded-2xl shadow-xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/Qu8oJQxg_4E"
              title="ConnectPro Explainer Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="text-center text-gray-600 mt-4">
            Discover how easy it is to find the perfect mentor and accelerate your success.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/" className="mt-12">
        <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg flex items-center gap-2">
          Start Your Journey <ArrowRight className="w-5 h-5" />
        </div>
      </Link>
    </div>
  );
}
