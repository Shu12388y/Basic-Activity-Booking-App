import { UserModel } from "../models/user.model.js";


export class AuthController {
  // Signup Controller
  static async signupController(req, res) {
    try {
      const { name, email, password, phonenumber } = req.body;

      const result = await  UserModel.signup(name, email, password, phonenumber);

      switch (result) {
        case 201:
          return res.status(result.code).json({ message: result.message });

        case 400:
          return res.status(result.code).json({ message: result.message });

        default:
          return res.status(result.code).json({ message: result.message });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Signup failed", error: error.message });
    }
  }

  // Signin Controller
  static async signinController(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserModel.signin(email, password);

      switch (result) {
        case 200:
          return res.status(result.code).json({ message: result.message });

        case 400:
          return res.status(result.code).json({ message: result.message });
        case 401:
          return res.status(result.code).json({ message: result.message });

        default:
          return res.status(result.code).json({ message: result.message });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Signin failed", error: error.message });
    }
  }
}
