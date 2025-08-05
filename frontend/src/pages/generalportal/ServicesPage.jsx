import { Link, useNavigate } from "react-router-dom";

const services = [
  {
    title: "Expert Career Guidance",
    icon: "👨‍🏫",
    description: "Get personalized insights from experienced mentors to navigate your career path effectively.",
  },
  {
    title: "Personalized Learning Paths",
    icon: "🌱",
    description: "Customized roadmaps designed to align with your goals, strengths, and interests.",
  },
  {
    title: "Build Valuable Networks",
    icon: "🔗",
    description: "Connect with peers, professionals, and industry leaders to grow your circle.",
  },
  {
    title: "Continuous Progress Tracking",
    icon: "📈",
    description: "Stay updated on your learning journey with detailed progress insights and feedback.",
  },
  {
    title: "Global Mentorship Opportunities",
    icon: "🌍",
    description: "Access mentorship from experts across the world, expanding your perspectives and reach.",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-blue-900 text-white overflow-x-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background.jpg" // Replace with your image path
          alt="Team"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Header */}
      <div className="px-6 md:px-20 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Unlock Your Growth Journey <br className="hidden md:block" />
          with ConnectPro
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-300">
          We offer tailored mentorship services designed to help you learn, grow,
          and achieve your professional dreams.
        </p>
      </div>

      {/* Service Highlights */}
      <div className="text-center text-2xl font-semibold mb-6">Service Highlights</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-20 pb-10">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate("/homepage")}
            className="bg-white text-black rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{service.description}</p>
            <button className="border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pb-12">
        <Link to="/homepage">
          <div className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full">
            Start Your Journey
          </div>
        </Link>
      </div>
    </div>
  );
}
