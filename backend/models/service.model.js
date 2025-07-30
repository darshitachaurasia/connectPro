import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema(
    {
        mentor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        serviceName: {
            type: String,  // ✅ Use `String` directly, not `Schema.Types.String`
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        duration: {
            type: Number,  // ✅ Use `Number` directly
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const ServiceModel = mongoose.models.Service || model("Service", serviceSchema);

export default ServiceModel;
