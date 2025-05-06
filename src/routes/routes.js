import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller.js";
import { UserBookingController } from "../controllers/booking.controller.js";
import { AuthController } from "../controllers/user.controller.js"; 
import { authenticate } from "../middlewares/middleware.js";

export const router = Router();

// --------------- Activity Routes ---------------
router.post("/activity", ActivityController.createActivityController);
router.get("/activity/:id", ActivityController.getActivityByIdController);
router.get("/activities", ActivityController.getAllActivitiesController);


// --------------- User Booking Routes ---------------
router.post("/book",authenticate, UserBookingController.bookActivityController);
router.get(
  "/bookings/user",authenticate,
  UserBookingController.getBookingsByUserController
);

// --------------- Auth Routes ---------------
router.post("/signup", AuthController.signupController);
router.get("/signin", AuthController.signinController);

