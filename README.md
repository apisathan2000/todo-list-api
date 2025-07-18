# todo-list-api

## How to Run This Project

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   - Create a `.env` file in the root directory (if needed).
   - Example:
     ```env
     PORT = 5506
     MONGO_URI=mongodb://localhost:27017/todo-db
     JWT_SECRET=your_jwt_secret
     ```

3. **Start the server**

   ```bash
   npm run dev
   ```

4. **Seed the database (optional, for test data)**

   > Warning: The seed script creates a large number of users and tasks. Use with caution.

   ```bash
   node seed.js
   ```

5. **Test the API**
   - Use Postman, curl, or any API client to interact with endpoints.

---

