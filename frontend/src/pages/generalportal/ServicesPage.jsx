function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d0727] to-[#0c0822] py-12 px-6">
      <h2 className="text-4xl font-bold text-center  text-white mb-10">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">One-on-One Mentorship</h3>
          <p className="text-gray-600">Personalized sessions to tackle specific goals and grow faster with expert guidance.</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">Group Sessions</h3>
          <p className="text-gray-600">Interactive learning with peers to solve problems, share knowledge, and stay motivated.</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">Personalized Roadmaps</h3>
          <p className="text-gray-600">Get custom-built learning paths aligned to your level, goals, and timelines.</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">Resume Reviews</h3>
          <p className="text-gray-600">Get your resume reviewed and optimized to stand out in competitive job markets.</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">Mock Interviews</h3>
          <p className="text-gray-600">Prepare with real-world mock interviews to build confidence and receive actionable feedback.</p>
        </div>
        <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-blue-200 transition">
          <h3 className="text-xl font-semibold text-[#2d0727] mb-2">Career Counselling</h3>
          <p className="text-gray-600">Discuss your career path and unlock clarity with a mentor who’s been there.</p>
        </div>
      </div>
    </div>
  );
}
export default ServicesPage;