import {z} from "zod";


export const validateUser =  z.object({
    name:z.string().min(3).max(20),
    email:z.string().email(),
    phonenumber:z.string().min(10).max(10),
    password:z.string().min(6).max(10)
});