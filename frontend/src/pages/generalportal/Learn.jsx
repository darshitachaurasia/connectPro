import React, { useState } from 'react';
import LearnVideo from './LearnVideo';
import LearnArticle from './LearnArticle';
import LearnCourses from './LearnCourses';
import LearnCategoryTabs from './LearnCategoryTabs';

function LearnHeader() {
    const [filter, setFilter] = useState('blogs');

    const buttonStyle =
        "font-semibold px-6 py-2 rounded-full transition-all duration-150 shadow-[0_4px_0_#2563eb] hover:translate-y-[1px] hover:shadow-[0_2px_0_#2563eb] active:translate-y-[2px] active:shadow-none";
    
    const selectedStyle = "bg-blue-300 text-blue-900";
    const unselectedStyle = "bg-blue-100 text-blue-800";

    return (
        <section className="w-full bg-blue-900 py-16 px-6 md:px-20 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Learn with Mentors
                </h1>
                <p className="text-blue-100 text-lg md:text-xl mb-6">
                    Unlock your potential with blogs, videos, and expert-led courses crafted for your success.
                </p>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => setFilter('blogs')}
                        style={{ fontFamily: "Raleway, sans-serif" }}
                        className={`${buttonStyle} ${filter === 'blogs' ? selectedStyle : unselectedStyle}`}
                    >
                        Blogs
                    </button>
                    <button
                        onClick={() => setFilter('videos')}
                        style={{ fontFamily: "Raleway, sans-serif" }}
                        className={`${buttonStyle} ${filter === 'videos' ? selectedStyle : unselectedStyle}`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setFilter('courses')}
                        style={{ fontFamily: "Raleway, sans-serif" }}
                        className={`${buttonStyle} ${filter === 'courses' ? selectedStyle : unselectedStyle}`}
                    >
                        Courses
                    </button>
                </div>
            </div>

            <LearnCategoryTabs isVideo={filter === 'videos'} />

            {filter === 'videos' && <LearnVideo />}
            {filter === 'blogs' && <LearnArticle />}
            {filter === 'courses' && <LearnCourses />}
        </section>
    );
}

export default LearnHeader;
