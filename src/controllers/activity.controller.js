import { ActivityModel } from "../models/acitivity.model.js";

export class ActivityController {
  static async createActivityController(req, res) {
    const { title, description, location, date, time } = req.body;

    const result = await ActivityModel.createActivity(title, description, location, date, time);

    return res.status(result.code).json({
      message: result.message,
      ...(result.activity && { activity: result.activity }),
      ...(result.error && { error: result.error })
    });
  }

  static async getActivityByIdController(req, res) {
    const { id } = req.params;

    const result = await ActivityModel.getActivityById(id);

    return res.status(result.code).json({
      message: result.message,
      ...(result.activity && { activity: result.activity }),
      ...(result.error && { error: result.error })
    });
  }

  static async getAllActivitiesController(_req, res) {
    const result = await ActivityModel.getAllActivities();

    return res.status(result.code).json({
      message: result.message,
      ...(result.activities && { activities: result.activities }),
      ...(result.error && { error: result.error })
    });
  }
}
