import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://1392631298:resume123@cluster0.lcvm3ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
        console.log("MongoDB connected successfully")
    }).catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    })
}
    

// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://1392631298:resume123@cluster0.lcvm3ok.mongodb.net/RESUME?retryWrites=true&w=majority&appName=Cluster0', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error);
//         process.exit(1);
//     }
// }