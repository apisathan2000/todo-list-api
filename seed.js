import mongoose from "mongoose";
import User from "./models/userModel.js";
import Task from "./models/taskModel.js";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todo-db";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany({});
    await Task.deleteMany({});

    const users = [];
    for (let i = 1; i <= 200; i++) {
      // Don't hash here, just pass plain text
      const user = await User.create({
        name: `User${i}`,
        email: `user${i}@example.com`,
        password: "Test@123",
      });
      users.push(user);
    }

    for (const user of users) {
      for (let j = 1; j <= 100000; j++) {
        await Task.create({
          title: `Task${j} for ${user.name}`,
          description: `Random description ${Math.random()
            .toString(36)
            .substring(7)}`,
          user: user._id,
        });
      }
    }

    console.log("Database seeded!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
