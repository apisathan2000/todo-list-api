import mongoose from "mongoose";

const connectDB = async function (uri) {

    // Avoiding the try-catch here so that error would be thrown to start() in index.js
    await mongoose.connect(uri);

};

export default connectDB;
