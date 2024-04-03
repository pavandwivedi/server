import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:[
            "teacher",
            "parent"
        ],
        default:"teacher"
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
});

const userModel = mongoose.model('user',userSchema);
export default userModel;