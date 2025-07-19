import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connection established successfully.");
    } catch (err) {
        console.log("MONGODB connection failed: ", err);
        process.exit(1);
    }
};

export default connectDB;
