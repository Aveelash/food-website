import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aveelash:aveelash1606@cluster0.sqi5n.mongodb.net/del-food').then(() => console.log("DB Connected"));
}