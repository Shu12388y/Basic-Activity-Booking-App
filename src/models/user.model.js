import { generateToken } from "../configs/jwt-config.js";
import { User } from "../schemas/user.schema.js";
import { validateUser } from "../validator/userValidation.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async signup(name, email, password, phonenumber) {
    try {
    //   const validatedData = validateUser.safeParse({
    //     name:name,
    //     email:email,
    //     password:password,
    //     phonenumber:phonenumber,
    //   });

    //   if(!validateUser.success){
    //     return {
    //         code:400,
    //         message:validateUser

    //     }
    //   }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return {
          code: 400,
          message: "User already exists with this email.",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phonenumber: phonenumber,
      });

      await newUser.save();

      return {
        code: 201,
        message: "User registered successfully.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phonenumber: newUser.phonenumber,
        },
      };
    } catch (error) {
        console.log(error)
      return {
        code: 400,
        message: "Validation or registration error.",
        error: error.errors || error.message,
      };
    }
  }

  static async signin(email, password) {
    try {
      
      if (!email || !password) {
        return {
          code: 400,
          message: "Email and password are required.",
        };
      }

      const user = await User.findOne({ email });
      if (!user) {
        return {
          code: 401,
          message: "Invalid email or password.",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          code: 401,
          message: "Invalid email or password.",
        };
      }
      const token = generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
      });
      return {
        code: 200,
        message: token
      };
    } catch (error) {
      return {
        code: 500,
        message: "Internal server error during login.",
        error: error.message,
      };
    }
  }
}
