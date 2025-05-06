import express from "express"
import { router } from "./routes/routes.js";

export const app = express();

// middlewares
app.use(express.json());


app.use("/hello",(req,res)=>{
    res.status(200).json({message:"hello world"})
})

app.use("/api/v1",router)

