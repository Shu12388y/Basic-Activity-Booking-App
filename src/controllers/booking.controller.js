import { UserBookingModel } from "../models/userBooking.model.js";

export class UserBookingController {
  static async bookActivityController(req, res) {
    const { activityId } = req.body;
    const userId  = req.user;
    const result = await UserBookingModel.bookActivity(userId, activityId);

    return res.status(result.code).json({
      message: result.message,
      ...(result.booking && { booking: result.booking }),
      ...(result.error && { error: result.error }),
    });
  }

  static async getBookingsByUserController(req, res) {
    const userId  = req.user;

    const result = await UserBookingModel.getBookingsByUser(userId);

    return res.status(result.code).json({
      message: result.message,
      ...(result.bookings && { bookings: result.bookings }),
      ...(result.error && { error: result.error }),
    });
  }

}
