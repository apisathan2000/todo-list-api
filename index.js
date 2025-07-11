import { app } from "./app.js";
import "dotenv/config";
import taskRouter from "./routes/taskRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { notFound } from "./middleware/notFound.js";
import connectDB from "./config/dbConfig.js";

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFound);

const start = async function () {
  try {
    // Load environment variables
    const PORT = process.env.PORT || 3000;

    await connectDB(process.env.MONGO_URI);
    // Start the server only if DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
