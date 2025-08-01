import ServiceModel from "../models/service.model.js";

const createService=async(serviceData)=>{
    return await ServiceModel.create(serviceData)
}

const updateService=async(serviceId,mentorId,updateData)=>{
    return await ServiceModel.findOneAndUpdate(
        {_id:serviceId,mentor:mentorId},
        updateData,
        {
            new :true,

        }

    )

};

const getServiceByMentor=async(mentorId)=>{
    return await ServiceModel.find({mentor:mentorId})
}

const getServiceById=async(serviceId)=>{
return await ServiceModel.findById(serviceId)
};

export default { createService, updateService, getServiceByMentor, getServiceById };