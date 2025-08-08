import React, { useState } from "react";

const CareerPathAI = () => {
  const [skills, setSkills] = useState("");
  const [suggestions, setSuggestions] = useState([]);

 const handleGenerateSuggestions = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/career-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills }),
    });
    const data = await res.json();

    // Convert AI text to array (optional)
    const parsed = data.suggestions.split("\n").filter(line => line.trim() !== "");
    setSuggestions(parsed.map(item => ({ title: item, reason: "" })));
  } catch (err) {
    console.error("Error fetching suggestions", err);
  }
};


  return (
    <section className="bg-blue-50 py-12 px-32 rounded-lg max-w-full mx-auto shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        AI-Based Career Path Suggestions
      </h2>

      {/* Input */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Enter your skills or interests..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="border border-blue-300 px-4 py-3 rounded-md w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerateSuggestions}
          className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
        >
          Get Suggestions
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-8 grid gap-4">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-blue-200 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.reason}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CareerPathAI;
