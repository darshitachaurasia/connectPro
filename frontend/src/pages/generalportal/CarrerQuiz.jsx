import React from "react";

const CareerTestBanner = () => {
  return (
    <section className="bg-blue-100 rounded-lg py-16 px-28 flex flex-col md:flex-row items-center justify-between max-w-full mx-auto">
      {/* Text */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
          Ready for Your Career Test?
          <br />
          <span className="font-extrabold">Start the quiz now.</span>
        </h2>
      </div>

      {/* Button */}
      <div className="mt-6 md:mt-0">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
          Start Career Test
        </button>
      </div>
    </section>
  );
};

export default CareerTestBanner;
