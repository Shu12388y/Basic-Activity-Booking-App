import mongoose from "mongoose";

export const DB_CONFIG = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("database connect");
  } catch (error) {
    console.error(error);
  }
};
