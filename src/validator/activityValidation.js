import {z} from "zod";

export const activityValidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        message: "Time must be in HH:mm format"
    })
});