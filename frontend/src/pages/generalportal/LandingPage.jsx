import React from 'react';
import mentor from './assets/mentor.png';
import { NavLink } from 'react-router-dom';
import ServicesPage from './ServicesPage';

const LandingPage = () => {
  return (
    <>
      <div className="bg-white">
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

        {/* About Section */}
        <section className="bg-[#F9F9F9]">
          <div className="px-6 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-28 lg:px-10 lg:py-24">
            <div className="flex flex-col max-w-screen-xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md lg:flex-row sm:mx-auto">
              <div className="relative lg:w-1/2">
                <img
                  src={mentor}
                  alt="ConnectPro Mentoring"
                  className="object-cover w-full lg:absolute h-80 lg:h-full"
                />
                <svg
                  className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
                  viewBox="0 0 20 104"
                  fill="currentColor"
                >
                  <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
                </svg>
              </div>
              <div className="p-12 bg-[#F1F1F1] lg:p-16 lg:pl-14 lg:w-1/2 rounded-lg shadow-lg">
                <h5 className="mb-4 text-4xl font-bold leading-tight text-gray-800 sm:text-5xl">
                  Elevate Your Career with ConnectPro
                </h5>
                <p className="mb-6 text-lg text-gray-600">
                  <span className="font-semibold text-gray-900">ConnectPro</span> is the ultimate platform designed to connect you with experienced mentors...
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 mb-4 sm:mb-0 font-medium tracking-wide text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled
                  >
                    Join ConnectPro
                  </button>
                  <a
                    href="/learn-more"
                    aria-label="Learn more about ConnectPro"
                    className="inline-flex items-center justify-center font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
                  >
                    Discover More
                    <svg className="inline-block w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.742a6.5 6.5 0 1 0-1.414 1.414..."/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <ServicesPage />
        </div>

        {/* How It Works Section */}
        <section className="px-6 py-10 bg-[#f3f4f6]">
          <div className="container mx-auto text-center max-w-screen-xl">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900">
                Start Your Mentorship Journey with ConnectPro
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Join ConnectPro today and connect with mentors who can guide you towards your goals...
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="mx-auto ">
                <img
                  src={mentor}
                  alt="Mentorship Journey"
                  className="rounded-lg shadow-lg h-full w-full object-cover"
                />
              </div>
              <div>
                <ul className="space-y-8">
                  <li className="flex items-start">
            <div className="pt-1 flex-shrink-0 w-10 h-10 text-center text-lg font-bold text-white bg-teal-500 rounded-full">
              1
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">Create Your Profile</h3>
              <p className="text-gray-600">
                Start your ElevateHub journey by creating a personalized profile. Share your goals, interests, and areas for growth to help us match you with the right mentor.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="pt-1 flex-shrink-0 w-10 h-10 text-center text-lg font-bold text-white bg-blue-500 rounded-full">
              2
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">Browse Mentor Profiles</h3>
              <p className="text-gray-600">
                Explore a wide variety of mentors from diverse fields. Use filters to find experts with the skills and experience that match your goals.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className=" pt-1 flex-shrink-0 w-10 h-10 text-center text-lg font-bold text-white bg-green-500 rounded-full">
              3
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">Select Your Ideal Mentor</h3>
              <p className="text-gray-600">
                Review mentor profiles, read testimonials, and choose someone who aligns with your personal or professional growth journey.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 text-center text-lg font-bold text-white bg-orange-500 rounded-full pt-1">
              4
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">Schedule Your First Session</h3>
              <p className="text-gray-600">
                Find a time that works for you and your mentor. Schedule your first session and kickstart your growth with expert guidance.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="pt-1 flex-shrink-0 w-10 h-10 text-center text-lg font-bold text-white bg-yellow-500 rounded-full">
              5
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">Achieve Milestones Together</h3>
              <p className="text-gray-600">
                Work closely with your mentor to develop key skills, stay motivated, and hit your personal or professional milestones.
              </p>
            </div>
          </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Categories Section */}
        <section className="px-8 py-20 bg-gray-100">
          <div className="container mx-auto">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
              <div className="mb-8 md:w-1/3 md:mr-12">
                <h2 className="text-4xl font-extrabold text-blue-700">
                  Find the Right Mentor for You
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                  Unlock growth opportunities with expert mentors...
                </p>
                <a className="inline-flex items-center px-6 py-3 mt-6 text-white transition duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg">
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M9.707,5.293l-5-5..."/>
                  </svg>
                </a>
              </div>
              <div className="grid flex-grow grid-cols-2 gap-6 md:grid-cols-3">
                {[
                  "Career Coaches",
                  "Business Mentors",
                  "Creative Mentors",
                  "Tech Experts",
                  "Marketing Gurus",
                  "Finance Advisors",
                  "Wellness Coaches",
                  "Education Mentors",
                  "Social Impact Leaders",
                ].map((category, index) => (
                  <a
                    key={index}
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className="block p-4 text-center transition duration-300 border rounded-lg shadow-sm bg-white text-gray-800 border-blue-400 hover:bg-blue-500 hover:text-white hover:shadow-lg cursor-not-allowed"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

           
          </div>
        </section>

       
        {/* Pricing Section */}
        <section className="px-10 py-24 text-center bg-blue-50">
          <h2 className="mb-10 text-5xl font-extrabold text-blue-700">
            Flexible & Affordable Plans
          </h2>
          <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-700">
            Choose a plan that fits your growth journey...
          </p>
          <button className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg" disabled>
            View Pricing Plans
          </button>
        </section>

        {/* Call to Action */}
        <section className="px-8 py-20 text-center bg-blue-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-5xl font-extrabold text-blue-600">
              Unlock Your Potential with the Right Mentor!
            </h2>
            <p className="mb-10 text-lg text-gray-700 leading-relaxed">
              Connect with experienced mentors who can guide you towards your goals...
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="px-8 py-4 text-lg font-semibold text-white transition rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 hover:scale-105 hover:shadow-xl"
                disabled
              >
                Get Started
              </button>
              <button
                className="px-8 py-4 text-lg font-semibold text-blue-600 transition bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-md"
                disabled
              >
                Explore More
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h2 className="text-xl font-semibold">Stay Connected</h2>
            <p className="text-sm text-gray-400">
              Follow us on social media for updates, inspiration, and mentorship tips!
            </p>
            <div className="flex justify-center space-x-6">
              {/* Social icons unchanged */}
            </div>
            <p className="text-xs text-gray-500">© 2025 connectPro. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
