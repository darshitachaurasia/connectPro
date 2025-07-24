const ApiError = require("../helper/apiError");
const mentorService=require("../services/mentor.service");
const httpStatus = require("../util/httpStatus");

const getAllMentors=async(req,res,next)=>{
    const mentors=await mentorService.getAllMentors();
    res.status(httpStatus.ok).json({
        success:true,
        mentors
    })

}


const getMentorInfoByUsername=async(req,res,next)=>{
    const {username}=req.params;
    const mentor=await mentorService.getMentorByUsername(username);
    if(!mentor){
        return next(new ApiError(httpStatus.notFound,"Mentor not found"));
    }
    res.status(httpStatus.ok).json({
        success:true,
        mentor
    })

}


module.exports={
    getAllMentors,
    getMentorInfoByUsername
}

