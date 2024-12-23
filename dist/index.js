"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //middleware we expecting in body we have json data 
mongoose_1.default.connect('mongodb+srv://vinayakpatle:ZwBLjYypDjBmrpZE@cluster1.aun7s.mongodb.net/brainly');
app.post("/api/v1/signup", async (req, res) => {
    // zod , password hashed,status for various checking
    /*const requiredProfile=z.object({
        username:z.string().min(1,"name is required").max(50,"name cannot exced 50 character"),
        password:z.string()
    })

    //type requiredProfileType=infer<typeof requiredProfile>
    const {success}=requiredProfile.safeParse(req.body);*/
    const userProfile = req.body;
    const username = userProfile.username;
    const password = userProfile.password;
    try {
        await db_1.userModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "user signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "user already exist"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.userModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser.id
        }, config_1.JWT_PASSWORD);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "invalid credentials"
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    await db_1.contentModel.create({
        title: title,
        link: link,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added"
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content: content
    });
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/sharelink", (req, res) => {
});
app.listen(3000, () => {
    console.log("server is running at 3000 port");
});
