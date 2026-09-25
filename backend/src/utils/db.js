//mongoose is a library/package that lets node talk to mongodb (storekeeper)

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.error("Mongodb  connection failed", error);

    process.exit(1); //node.js program ended with error   and (0) successfully
  }
};

export default connectDB;
