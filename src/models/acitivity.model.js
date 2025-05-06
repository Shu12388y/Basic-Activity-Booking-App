import { Activity } from "../schemas/activity.schema.js"; // Make sure this file exports the mongoose model
import { activityValidation } from "../validator/activityValidation.js";



export class ActivityModel {
    static async createActivity(title, description, location, date, time) {
        try {
            const validated = activityValidation.parse({ title, description, location, date, time });

            const activity = new Activity({
                title: validated.title,
                description: validated.description,
                location: validated.location,
                date: new Date(validated.date),
                time: validated.time
            });

            await activity.save();

            return {
                code: 201,
                message: "Activity created successfully",
                activity
            };

        } catch (error) {
            return {
                code: 400,
                message: "Validation or creation error",
                error: error.errors || error.message
            };
        }
    }

    static async getActivityById(id) {
        try {
            const activity = await Activity.findById(id);
            if (!activity) {
                return {
                    code: 404,
                    message: "Activity not found"
                };
            }

            return {
                code: 200,
                message: "Activity retrieved successfully",
                activity
            };

        } catch (error) {
            return {
                code: 400,
                message: "Error fetching activity",
                error: error.message
            };
        }
    }

    static async getAllActivities() {
        try {
            const activities = await Activity.find();
            return {
                code: 200,
                message: "All activities fetched successfully",
                activities
            };
        } catch (error) {
            return {
                code: 500,
                message: "Error fetching activities",
                error: error.message
            };
        }
    }
}
