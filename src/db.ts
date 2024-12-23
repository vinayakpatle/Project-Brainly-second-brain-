import mongoose, { Types } from "mongoose";
import {model,Schema} from "mongoose";
import ObjectId from "mongoose";



const userSchema=new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

const contentSchema=new Schema({
    link:{type:String},
    title:{type:String},
    tags:[{type:mongoose.Types.ObjectId,ref:"tags"}],
    userId:{type:mongoose.Types.ObjectId,required:true,ref:"users"}

})

/*const tagsSchema=new Schema({
    title:{type:String,required:true,unique:true}
})

const linkSchema=new Schema({
    hash:{type:String},
    userId:{type:ObjectId,required:true,ref:"User"}
})*/

export const userModel= model("users", userSchema)
export const contentModel= model("content",contentSchema);
//export const tagsModel= model("tags",tagsSchema)
//export const linkModel= model("link",linkSchema)

