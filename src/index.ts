import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {z} from "zod";
import {userModel,contentModel} from "./db";
import {JWT_PASSWORD} from "./config";
import {userMiddleware} from "./middleware";

const app=express();
app.use(express.json());//middleware we expecting in body we have json data 

mongoose.connect('mongodb+srv://vinayakpatle:ZwBLjYypDjBmrpZE@cluster1.aun7s.mongodb.net/brainly');

app.post("/api/v1/signup",async (req,res)=>{
    // zod , password hashed,status for various checking
    /*const requiredProfile=z.object({
        username:z.string().min(1,"name is required").max(50,"name cannot exced 50 character"),
        password:z.string()
    })

    //type requiredProfileType=infer<typeof requiredProfile>
    const {success}=requiredProfile.safeParse(req.body);*/
    const userProfile=req.body;

    const username=userProfile.username;
    const password=userProfile.password;

    try{
        await userModel.create({
            username:username,
            password:password
        })
    
        res.json({
            message:"user signed up"
        })
    
    }catch(e){
        res.status(411).json({
            message:"user already exist"
        })
    }
})

app.post("/api/v1/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const existingUser=await userModel.findOne({
        username:username,
        password:password
    })

    if(existingUser){
        const token=jwt.sign({
            id:existingUser.id
        },JWT_PASSWORD);

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"invalid credentials"
        })
    }

})

app.post("/api/v1/content",userMiddleware,async (req,res)=>{
    const link=req.body.link;
    const title=req.body.title;

    await contentModel.create({
        title:title,
        link:link,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:"content added"
    })
    
})

app.get("/api/v1/content",userMiddleware,async (req,res)=>{
    //@ts-ignore
    const userId=req.userId;
    const content=await contentModel.find({
        userId:userId
    }).populate("userId","username");

    res.json({
        content:content
    })

})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId=req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })

    res.json({
        message:"content deleted"
    })
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/sharelink",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("server is running at 3000 port");
})