import React, { useEffect, useState } from 'react';
import useMentorStore from '../redux/mentors';
import mentorApi from '../apiManager/mentor';
import MentorCard from './MentorCard';
import {Button, Spin} from "antd";

const TopMentors = () => {
  const[topMentors,setTopMentors]=useState([]);
  const[loading,setLoading]=useState(false);
  const{setMentorsData}=useMentorStore();
  console.log("from mentor component");
  const selectTopMentor=(mentors)=>{
    const topselectedMentors=[];
    const totalMentors=mentors.length;

    while(topselectedMentors<4 && topselectedMentors.length<totalMentors){
      const randomIndex=Math.floor(Math.random()*totalMentors);
      const randomMentor=mentors[randomIndex];
      if(!topselectedMentors.includes(randomMentor)){
        topselectedMentors.push(randomMentor)
      }
    }
    return topselectedMentors;

  }

  const fetchAllMentors=async()=>{
    try{
      console.log("inside");
      
      const response=await mentorApi.getAllMentors();
      console.log("getting data from mentirs api");
      console.log(response);
      
      
      const allMentors=response?.data?.mentors || [];
      setMentorsData(allMentors);
      setTopMentors(selectTopMentor(allMentors))

    }
    catch(e){
      console.log(e);
      
    }
  }
  useEffect(()=>{
    console.log("useefdect");
    
    fetchAllMentors();
  },[])
  return (
   <>
 <div>
  <h1>Top Mentors</h1>
  <div>
    {topMentors.map((mentor)=>{
      return <MentorCard mentor={mentor} key={mentor?._id}/>
    })}
  </div>

 </div>
   </>
  )
}

export default TopMentors