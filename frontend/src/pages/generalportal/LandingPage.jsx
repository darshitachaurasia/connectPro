import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming react-router-dom is set up
import Flow from './Flow';
import CareerQuizPage from './CarrerQuiz';
import CareerPathAI from './AI-Suggestions';

// Placeholder for mentor.png as local files cannot be accessed
const mentorPlaceholderImage = "https://placehold.co/600x400/a7d9f7/000?text=Mentor";
const heroPlaceholderImage = "https://placehold.co/1200x800/4a90e2/ffffff?text=Mentorship+Hub";
const blogPlaceholderImage = "https://placehold.co/400x250/d1e7ff/000?text=Blog+Image";

// Inline SVG Icons (replacing lucide-react for self-contained Canvas)
const SparklesIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v18M3 12h18M18 18l-6-6-6 6M6 6l6 6 6-6" />
  </svg>
);

const ArrowRightIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const UsersIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const AwardIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="7" />
    <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
  </svg>
);

const ChevronRightIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const FacebookIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-17 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.4 3 4c2.5 3.3 5.7 5 8 5-1.5-2-1.5-4 .5-6 2.3 2.3 3.6 5.2 3.6 8.5 0 .2 0 .5 0 .7 1.2.8 2.5 1.4 4 1.4 2.1 0 4-1.2 5-3 .4.1.8.2 1.3.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const QuoteIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2c.5 0 .9.4 1 .9l.2 1.1c.1.5-.2 1.1-.7 1.4-.5.3-1.1.2-1.4-.3L3 21zm12 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2c.5 0 .9.4 1 .9l.2 1.1c.1.5-.2 1.1-.7 1.4-.5.3-1.1.2-1.4-.3L15 21z" />
  </svg>
);

const PlayCircleIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const BookOpenIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const MailIcon = ({ size = 24, strokeWidth = 2, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);


// Dummy ServicesPage component for demonstration
const ServicesPage = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Core Services</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          ConnectPro offers a suite of services designed to empower your growth journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-blue-50 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-200">
            <div className="text-blue-600 mb-4 flex justify-center">
              <UsersIcon size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Personalized Matching</h3>
            <p className="text-gray-600">
              Our intelligent algorithm connects you with mentors whose expertise aligns perfectly with your goals and aspirations.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-blue-50 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-200">
            <div className="text-blue-600 mb-4 flex justify-center">
              <BriefcaseIcon size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Career Development</h3>
            <p className="text-gray-600">
              Gain insights and strategies from industry leaders to accelerate your career growth and achieve professional milestones.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-blue-50 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-200">
            <div className="text-blue-600 mb-4 flex justify-center">
              <AwardIcon size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Skill Enhancement</h3>
            <p className="text-gray-600">
              Develop new skills and refine existing ones through tailored guidance and practical advice from seasoned experts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


const LandingPage = () => {
  // State for animated counters
  const [mentorsCount, setMentorsCount] = useState(0);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // Dummy data for testimonials
  const testimonials = [
    {
      quote: "ConnectPro helped me find the perfect mentor who guided me through a career transition. I landed my dream job thanks to their invaluable advice!",
      author: "Sarah J.",
      title: "Marketing Professional"
    },
    {
      quote: "The platform is incredibly intuitive, and the quality of mentors is exceptional. My mentor provided practical strategies that boosted my startup's growth.",
      author: "David L.",
      title: "Startup Founder"
    },
    {
      quote: "I never thought I'd find a mentor who truly understood my niche, but ConnectPro delivered! Their insights were a game-changer for my personal development.",
      author: "Emily R.",
      title: "Creative Designer"
    }
  ];

  // Dummy data for blog posts
  const blogPosts = [
    {
      title: "5 Strategies for Effective Mentorship",
      description: "Discover key strategies to make the most out of your mentorship relationship.",
      link: "/blog/effective-mentorship",
      image: blogPlaceholderImage
    },
    {
      title: "How to Choose the Right Mentor for Your Career",
      description: "A comprehensive guide to selecting a mentor who aligns with your professional aspirations.",
      link: "/blog/choose-right-mentor",
      image: blogPlaceholderImage
    },
    {
      title: "Boosting Productivity with Mentor Guidance",
      description: "Learn how mentorship can significantly enhance your productivity and goal achievement.",
      link: "/blog/productivity-mentorship",
      image: blogPlaceholderImage
    }
  ];

  // Effect for counter animations
  useEffect(() => {
    const animateCounter = (setter, target, duration) => {
      let start = 0;
      const increment = target / (duration / 10); // Calculate increment based on duration (10ms interval)
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(interval);
        } else {
          setter(Math.ceil(start));
        }
      }, 10);
      return () => clearInterval(interval); // Cleanup
    };

    // Trigger animations
    animateCounter(setMentorsCount, 500, 2000); // 500 mentors in 2 seconds
    animateCounter(setSessionsCount, 1200, 2500); // 1200 sessions in 2.5 seconds
    animateCounter(setUsersCount, 800, 2200);   // 800 active users in 2.2 seconds
  }, []); // Run once on component mount

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Newsletter subscribed with:", email);
    alert("Thank you for subscribing to our newsletter!"); // Using alert for demo, replace with custom modal in production
    e.target.reset();
  };

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section >
      
        {/* Hero Section */}
      <section className="relative bg-blue-100 py-16 px-6 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 leading-tight">
              <span className="text-5xl md:text-7xl text-blue-900">Connect Pro</span>
              <br />
              Your journey, our guidance
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-blue-700">
              Every great achiever was inspired by a great mentor. Find yours today!
            </p>
            <div className="mt-8">
              <NavLink to="/mentors">
                <button className="px-8 py-3 text-white text-lg font-medium bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-300">
                  Match with a Mentor
                </button>
              </NavLink>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <img
                className="w-full max-w-lg rounded-lg shadow-lg"
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                alt="Mentorship Hub"
              />
              <div className="absolute inset-0 bg-blue-900 bg-opacity-10 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Real-Time Counters / Stats Section */}
      <section className="bg-blue-900 py-10 px-4 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 animate-fade-in-down">Our Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-6xl font-extrabold text-blue-100 drop-shadow-lg">{mentorsCount}+</span>
              <p className="text-xl mt-3">Expert Mentors</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-6xl font-extrabold text-blue-100 drop-shadow-lg">{sessionsCount}+</span>
              <p className="text-xl mt-3">Successful Sessions</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="text-6xl font-extrabold text-blue-100 drop-shadow-lg">{usersCount}+</span>
              <p className="text-xl mt-3">Active Users</p>
            </div>
          </div>
        </div>
      </section>
       
       <Flow/>

       <CareerQuizPage/>

      {/* ServicesPage Component */}
      <div>
        <ServicesPage />
      </div>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-12 animate-fade-in-down">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-blue-100 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuoteIcon size={48} className="text-blue-500 mb-4" />
                <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


  <CareerPathAI/>

      {/* Pricing Section */}
      <section className="px-10 py-24 text-center bg-blue-50">
        <h2 className="mb-8 text-5xl md:text-6xl font-extrabold text-blue-700 animate-fade-in-down">
          Flexible & Affordable Plans
        </h2>
        <p className="max-w-4xl mx-auto mb-12 text-xl text-gray-700 leading-relaxed animate-fade-in-up">
          Choose a plan that fits your growth journey, whether you're looking for a single session or ongoing mentorship. Our transparent pricing ensures you get the best value.
        </p>
        <NavLink to="/pricing" className="inline-block">
          <button
            aria-label="View Pricing Plans"
            className="px-10 py-5 text-xl font-semibold text-white transition-all duration-500 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl hover:scale-105 transform animate-bounce-subtle"
          >
            View Pricing Plans
          </button>
        </NavLink>
      </section>


      {/* Footer */}
      <footer className="px-8 py-16 text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-semibold text-blue-200">Stay Connected</h3>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Follow us on social media for the latest updates, inspiring stories, and valuable mentorship tips to keep you on track.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="#" aria-label="ConnectPro on Facebook" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-125">
              <FacebookIcon size={32} />
            </a>
            <a href="#" aria-label="ConnectPro on Twitter" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-125">
              <TwitterIcon size={32} />
            </a>
            <a href="#" aria-label="ConnectPro on LinkedIn" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-125">
              <LinkedinIcon size={32} />
            </a>
          </div>
          <p className="text-sm text-gray-500 pt-8">© {new Date().getFullYear()} ConnectPro. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.15;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Main App component to render LandingPage
const App = () => {
  return (
    <div>
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Inter font from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <LandingPage />
    </div>
  );
};

export default App;
