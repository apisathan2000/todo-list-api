import { app } from "./app.js";
import "dotenv/config";
import taskRouter from "./routes/taskRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { notFound } from "./middleware/notFound.js";
import connectDB from "./config/dbConfig.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./openapi.yaml');

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
