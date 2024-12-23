"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const contentSchema = new mongoose_2.Schema({
    link: { type: String },
    title: { type: String },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "tags" }],
    userId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "users" }
});
/*const tagsSchema=new Schema({
    title:{type:String,required:true,unique:true}
})

const linkSchema=new Schema({
    hash:{type:String},
    userId:{type:ObjectId,required:true,ref:"User"}
})*/
exports.userModel = (0, mongoose_2.model)("users", userSchema);
exports.contentModel = (0, mongoose_2.model)("content", contentSchema);
//export const tagsModel= model("tags",tagsSchema)
//export const linkModel= model("link",linkSchema)
