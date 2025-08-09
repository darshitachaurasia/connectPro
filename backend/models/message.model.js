// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Mentor" depending on your setup
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Mentor"
    required: true
  },
  senderRole: {
    type: String,
    enum: ["user", "mentor"],
    required: true
  },
  receiverRole: {
    type: String,
    enum: ["user", "mentor"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
