import AxiosInstances from ".";
const getAllMentors = (filters) => {
    return AxiosInstances.get("/mentor", { params: filters });
};

const getMentorsByUsername=(username)=>{
    return AxiosInstances.get("/mentor/username/"+username)
}

const getMentorById = (id) => {
    return AxiosInstances.get(`/mentor/${id}`);
};

const mentorApi={
    getAllMentors,
    getMentorsByUsername,
    getMentorById,
}

export default mentorApi;
