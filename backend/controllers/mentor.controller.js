import ApiError from "../helper/apiError";
import mentorService from "../services/mentor.service";
import httpStatus from "../util/httpStatus";

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


export { getAllMentors, getMentorInfoByUsername };

