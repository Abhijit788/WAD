import mongoose,{Schema} from "mongoose";
const organiserSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },
    domain:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    events:[{
        type:Schema.Types.ObjectId,
        ref:'Event',
    }]
})

export const Organiser = mongoose.model("Organiser", organiserSchema); 
