import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to Mongodb.`);
    } catch (error) {
        console.log(error);
    }
}