import { User } from "../schemas/user.schema.js";
import { Activity } from "../schemas/activity.schema.js";
import { UserBookedActivity } from "../schemas/userbooking.js"; // assuming this is your booking schema
import mongoose from "mongoose";

export class UserBookingModel {
    // 1. Book an activity
    static async bookActivity(userId, activityId) {
        try {
            // Validate ObjectIds
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(activityId)) {
                return {
                    code: 400,
                    message: "Invalid user ID or activity ID"
                };
            }

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return {
                    code: 404,
                    message: "User not found"
                };
            }

            // Check if activity exists
            const activity = await Activity.findById(activityId);
            if (!activity) {
                return {
                    code: 404,
                    message: "Activity not found"
                };
            }

            // Check for existing booking
            const alreadyBooked = await UserBookedActivity.findOne({ user: userId, activity: activityId });
            if (alreadyBooked) {
                return {
                    code: 409,
                    message: "Activity already booked by this user"
                };
            }

            // Book the activity
            const booking = new UserBookedActivity({
                user: userId,
                activity: activityId
            });

            await booking.save();

            return {
                code: 201,
                message: "Activity booked successfully",
                booking
            };

        } catch (error) {
            return {
                code: 500,
                message: "Error booking activity",
                error: error.message
            };
        }
    }

    // 2. Get all bookings by user
    static async getBookingsByUser(userId) {
        try {
            const bookings = await UserBookedActivity.find({ user: userId })
                .populate("activity")
                .sort({ createdAt: -1 });

            return {
                code: 200,
                message: "Bookings fetched successfully",
                bookings
            };

        } catch (error) {
            return {
                code: 500,
                message: "Error fetching bookings",
                error: error.message
            };
        }
    }

    // 3. Get single booking by ID
    static async getBookingById(bookingId) {
        try {
            const booking = await UserBookedActivity.findById(bookingId)
                .populate("user")
                .populate("activity");

            if (!booking) {
                return {
                    code: 404,
                    message: "Booking not found"
                };
            }

            return {
                code: 200,
                message: "Booking retrieved successfully",
                booking
            };

        } catch (error) {
            return {
                code: 400,
                message: "Error retrieving booking",
                error: error.message
            };
        }
    }
}
