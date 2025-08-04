import React from 'react';

function LearnVideo() {
  const videos = [
    {
      title: "Intro to Front-End Web Development",
      description: "Understand the basics of HTML, CSS, and JavaScript to start building websites.",
      category: "Web Development",
      tags: ["html", "css", "javascript", "frontend"],
      author: "CodeWithHarry",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
      createdAt: new Date("2024-11-02"),
    },
    {
      title: "Digital Marketing 101",
      description: "Explore the fundamentals of SEO, social media, and online advertising.",
      category: "Digital Marketing",
      tags: ["seo", "ads", "content", "strategy"],
      author: "Neil Patel",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/NmzuHjWmXOc",
      createdAt: new Date("2024-10-15"),
    },
    {
      title: "Learn UI/UX Design from Scratch",
      description: "Discover the design process, wireframing, and usability testing essentials.",
      category: "UI/UX Design",
      tags: ["design", "figma", "prototyping", "ux"],
      author: "Flux Academy",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/3YgVg6q4DdA",
      createdAt: new Date("2024-09-28"),
    },
    {
      title: "Introduction to Data Science",
      description: "What is data science? Learn about data analysis, visualization, and Python tools.",
      category: "Data Science",
      tags: ["data", "python", "analytics", "pandas"],
      author: "freeCodeCamp",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
      createdAt: new Date("2024-08-12"),
    },
    {
      title: "Freelancing Tips for Beginners",
      description: "How to start freelancing in tech, design, and content creation.",
      category: "Freelancing",
      tags: ["freelance", "remote", "portfolio", "clients"],
      author: "Ali Abdaal",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/E6oqgHkZWZs",
      createdAt: new Date("2024-07-01"),
    },
    {
      title: "Mastering Git & GitHub",
      description: "Version control is key—learn how to use Git and GitHub effectively.",
      category: "Web Development",
      tags: ["git", "github", "version control", "collaboration"],
      author: "The Net Ninja",
      type: "Video",
      videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
      createdAt: new Date("2024-09-12"),
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video, index) => (
        <div
          key={index}
          className="bg-blue-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="relative w-full h-56">
            <iframe
              className="w-full h-full"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center text-sm text-blue-700 mb-2">
              <span className="uppercase font-medium">{video.category}</span>
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {video.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {video.description}
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              {video.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-700 text-blue-100 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LearnVideo;
