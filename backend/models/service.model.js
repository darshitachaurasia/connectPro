const { required } = require("joi");
const {Schema, model}=require("mongoose");

const serviceSchema=new Schema(
    {
        mentor:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        serviceName:{
            type:Schema.Types.String,
            required:true,
            trim:true
        },
        
        description:{
            type:Schema.Types.String,
            required:true,
            trim:true
        },
        duration:{
            type:Schema.Types.Number,
            required:true,
            trim:true
        },
        price:{
            type:Schema.Types.Number,
            required:true,
            trim:true
        },
        active:{
            type:Schema.Types.Boolean,
            default:false,
        }
    },{timestamps:true}
);

const ServiceModel=model("Service",serviceSchema);

module.exports=ServiceModel;