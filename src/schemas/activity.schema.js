import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        match: [/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Please enter time in HH:mm format']
    }
}, {
    timestamps: true
});

export const Activity = mongoose.models.Activity ||  mongoose.model("Activity", activitySchema);

