import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config/index.js";

const generateToken=(userId,expires,secret)=>{
    const payload={
        _id:userId,
        iat:moment().unix(),
        exp:expires.unix(),
    };
    return jwt.sign(payload,secret)
};

 const generateAuthTokens=async(user)=>{
    const accessTokenExpires=moment().add(
        config.jwt.accessExpirationMinutes,
        "minutes"
    );
    const accessToken=generateToken(user._id,accessTokenExpires,config.jwt.accessSecret);
    return accessToken;
 } 


 const generateVerificationToken=async(userId)=>{
    const verificationTokenExpires=moment().add(
        config.jwt.verificationExpirationMinutes,
        "minutes"
    )
    const verificationToken=generateToken(
        userId,verificationTokenExpires,config.jwt.verificationExpirationMinutes
    )
    return verificationToken;
 }

 const verifyToken=async(token,secret)=>{
    if(secret==="accessToken"){
        return await jwt.verify(token,config.jwt.accessSecret);
    }
    else if(secret==="verify"){
        return await jwt.verify(token,config.jwt.verificationSecret)
    }
 }

export { generateAuthTokens, verifyToken, generateVerificationToken };
