import UserModel from "../models/user.model.js";

const getUserById=async(id)=>{
    return await UserModel.findById(id);
}

const updateUser=async(id,data)=>{
    return await UserModel.findByIdAndUpdate(id,data,{new:true})
}

const updateUserPhoto=async(id,photoUrl)=>{
    return await UserModel.findByIdAndUpdate(id,{photoUrl},{new:true})
}

const updateUserProfile=async(id,profileData)=>{
    return await UserModel.findByIdAndUpdate(
        id,
        {profile:profileData},
        {new:true}
    );
};

export { getUserById, updateUser, updateUserPhoto, updateUserProfile };