import React, { useEffect, useState } from 'react';
import useMentorStore from '../redux/mentors';
import mentorApi from '../apiManager/mentor';
import MentorCard from './MentorCard';
import {Button, Spin} from "antd";

const TopMentors = () => {
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const { setMentorsData } = useMentorStore();

  // This function contains the original logic you provided.
  const selectTopMentor = (mentors) => {
    const topselectedMentors = [];
    const totalMentors = mentors.length;

    // This while loop condition is incorrect and will cause an infinite loop.
    while (topselectedMentors < 4 && topselectedMentors.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors);
      const randomMentor = mentors[randomIndex];
      if (!topselectedMentors.includes(randomMentor)) {
        topselectedMentors.push(randomMentor);
      }
    }
    return topselectedMentors;
  };

  const fetchAllMentors = async () => {
    setLoading(true); // Set loading true when fetching starts
    try {
      const response = await mentorApi.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      
      // To prevent the infinite loop from the original logic,
      // I am calling a corrected version here for demonstration.
      // The original flawed function is kept above for reference.
      const shuffled = [...allMentors].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);

      setMentorsData(allMentors);
      setTopMentors(selected);
 console.log(topMentors)
    } catch (e) {
      console.log(e);
    } finally {
        setLoading(false); // Set loading false when fetching ends
    }
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Top Mentors</h1>
          <p className="text-lg text-gray-600">Hand-picked experts to guide you.</p>
        </div>
        
        {loading ? (
             <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
             </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
                {topMentors.map((mentor) => (
                    <MentorCard mentor={mentor} key={mentor?._id} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

// Exporting the main component to be rendered.
export default TopMentors;