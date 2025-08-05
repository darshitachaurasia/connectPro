import React from 'react';
import { Link } from 'react-router-dom';

function LearnArticle() {
  const articles = [
    {
      title: "Getting Started with Data Science",
      summary: "A beginner-friendly guide to starting your journey in data science: tools, skills, and career tips.",
      content: "This article covers Python, data analysis, visualization, and how to break into the field of data science...",
      category: "Data Science",
      tags: ["python", "data-analysis", "career"],
      type: "Article",
      author: "SkillStack Team",
      coverImage: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      createdAt: new Date("2024-11-10"),
    },
    {
      title: "Mastering UI/UX Design Principles",
      summary: "Learn the core principles of user experience and interface design with real-world examples.",
      content: "This article dives into usability, accessibility, and design thinking for modern interfaces...",
      category: "UI/UX Design",
      tags: ["design", "ux", "figma"],
      type: "Article",
      author: "CreativePath",
      coverImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      createdAt: new Date("2024-10-18"),
    },
    {
      title: "Digital Marketing Roadmap for Beginners",
      summary: "Step-by-step marketing skills guide: SEO, content strategy, and social media essentials.",
      content: "If you're new to marketing, start here! We'll explore tools, platforms, and strategy frameworks...",
      category: "Marketing",
      tags: ["seo", "social media", "branding"],
      type: "Article",
      author: "GrowthFuel",
      coverImage: "https://images.pexels.com/photos/1559078/pexels-photo-1559078.jpeg",
      createdAt: new Date("2024-09-15"),
    },
    {
      title: "Career Path: Frontend Development",
      summary: "React, HTML, CSS, and more — your roadmap to building user-friendly web apps.",
      content: "This guide walks you through frontend tools, best practices, and project tips...",
      category: "Web Development",
      tags: ["react", "html", "css"],
      type: "Article",
      author: "CodeMentor",
      coverImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      createdAt: new Date("2024-08-20"),
    },
    {
      title: "Public Speaking: Build Confidence On Stage",
      summary: "Tried-and-true techniques for becoming a compelling and confident speaker.",
      content: "From TEDx talks to business pitches, this article helps you master vocal presence and structure...",
      category: "Public Speaking",
      tags: ["communication", "confidence", "leadership"],
      type: "Article",
      author: "SpeakWell Academy",
      coverImage: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      createdAt: new Date("2024-07-01"),
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-blue-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-5">
            <div className="flex justify-between items-center mb-2 text-sm text-blue-600">
              <span className="uppercase font-medium">{article.category}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>

            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {article.title}
            </h3>

            <p className="text-blue-800 text-sm mb-4 line-clamp-3">
              {article.summary}
            </p>

            <div className="flex flex-wrap gap-2 text-xs mb-4">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-200 text-blue-900 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              to={`/learn/article/${index}`}
              state={{ articles }}
              className="inline-block mt-2 text-blue-700 hover:underline font-medium text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LearnArticle;
