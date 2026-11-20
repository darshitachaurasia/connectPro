import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function LearnCategoryTabs({ isVideo }) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    'All',
    'Data Science',
    'Web Development',
    'UI/UX Design',
    'Marketing',
    'Finance & Investing',
    'Public Speaking',
    'Entrepreneurship'
  ];

  return (
    <div className="mt-10 px-4 md:px-8">
      {/* Filter Tabs */}
      <div className="bg-blue-100 py-6 px-4 border border-b border-blue-300 rounded-md">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              aria-pressed={activeTab === category}
              className={`font-semibold px-6 py-2 rounded-full transition-all duration-150 ${
                activeTab === category
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_#1e3a8a] hover:translate-y-[1px] hover:shadow-[0_2px_0_#1e3a8a] active:translate-y-[2px] active:shadow-none'
                  : 'bg-blue-200 text-blue-800 shadow-[0_4px_0_#60a5fa] hover:translate-y-[1px] hover:shadow-[0_2px_0_#60a5fa] active:translate-y-[2px] active:shadow-none'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <Link to={isVideo ? "/learn/video/new" : "/learn/article/new"}>
        <button
          className="flex items-center mt-6 gap-2 px-4 py-2 bg-blue-500 text-white border border-blue-700 rounded hover:bg-blue-600 active:bg-blue-700 transition"
        >
          <FaPlus />
          <span>Create</span>
        </button>
      </Link>
    </div>
  );
}

export default LearnCategoryTabs;
