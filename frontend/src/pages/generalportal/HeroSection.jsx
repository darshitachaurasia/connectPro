import React from 'react';


const HeroSection = () => {
  return (
    <section className="h-[90vh] flex bg-blue-950 text-white overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col justify-center px-6 md:px-16 w-full md:w-1/2 z-10">
    
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          BEGIN YOUR PATH<br />
          TO <span className="relative inline-block">
            MENTORSHIP
            <span className="absolute left-0 -bottom-1 w-full h-2 border-b-4 border-red-500 rounded-full transform -skew-x-12"></span>
          </span>
        </h1>
     <p className="text-gray-400 text-sm md:text-base max-w-md italic mb-6">
  "The greatest good you can do for another is not just share your riches, but reveal to them their own."
  <br />— Benjamin Disraeli
     </p>

        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-300 transition">Explore</button>
          <button className="border border-white px-6 py-2 font-semibold rounded hover:bg-white hover:text-black transition">Connect</button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block md:w-1/2 relative h-full">
        { <img
          src="https://plus.unsplash.com/premium_photo-1661767467261-4a4bed92a507?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mentor"
          className="object-cover w-full h-full"
        /> }
      </div>
    </section>
  );
};

export default HeroSection;
