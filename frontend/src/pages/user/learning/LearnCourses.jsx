import React from 'react';

function LearnCourses() {
  const courseData = {
    'Web Development': [
      {
        title: 'Introduction to Web Development (UC Davis)',
        provider: 'Coursera',
        url: 'https://www.coursera.org/learn/introduction-to-web-development',
        level: 'Beginner',
      },
      {
        title: 'Introduction to Front‑End Development (Meta)',
        provider: 'Coursera',
        url: 'https://www.coursera.org/learn/introduction-to-front-end-development',
        level: 'Beginner',
      },
    ],
    'Data Science': [
      {
        title: 'Intro to Data Science for Complete Beginners (Udemy)',
        provider: 'Udemy',
        url: 'https://www.udemy.com/course/intro2dseng/',
        level: 'Beginner',
      },
      {
        title:
          'Data Science, Machine Learning & Data Analysis using Python & R (Udemy)',
        provider: 'Udemy',
        url:
          'https://www.udemy.com/course/data-science-machine-learning-data-analysis-python-r/',
        level: 'Intermediate',
      },
    ],
    'UI/UX Design': [
      {
        title: 'Google UX Design Professional Certificate',
        provider: 'Coursera',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
        level: 'Beginner',
      },
    ],
    'Digital Marketing': [
      {
        title: 'Digital Marketing 101 (Neil Patel)',
        provider: 'YouTube/Udemy',
        url: 'https://www.udemy.com/topic/digital-marketing/',
        level: 'Beginner',
      },
    ],
    'Communication Skills': [
      {
        title: 'Public Speaking Courses (Coursera)',
        provider: 'Coursera',
        url: 'https://www.coursera.org/search?query=public%20speaking%20skills',
        level: 'Beginner',
      },
    ],
  };

  return (
    <div className="px-6 md:px-10 mt-10">
      <div className="bg-blue-100 py-6 px-4 border border-blue-200 rounded-md">
        {Object.entries(courseData).map(([category, courses]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-blue-200 shadow-md p-4 rounded-lg hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-blue-800">{course.title}</h3>
                  <p className="text-sm text-blue-500 mt-1">
                    {course.provider} — {course.level}
                  </p>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-700 hover:underline text-sm"
                  >
                    Go to Course →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearnCourses;
