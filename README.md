# todo-list-api

Project reference: [roadmap.sh todo-list-api](https://roadmap.sh/projects/todo-list-api)

## How to Run This Project

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   - Create a `.env` file in the root directory (if needed).
   - Example:
     ```env
     PORT=5506
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

6. **View API Documentation**
   - Visit [http://localhost:5506/api-docs](http://localhost:5506/api-docs) to view the Swagger (OpenAPI) documentation for all endpoints.

---

## API Documentation

All endpoints are prefixed with `/api/v1` (if your main router uses this prefix; adjust as needed).

### Authentication

#### Register a new user

- **POST** `/api/v1/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test@123"
  }
  ```
- **Response:** `201 Created`
  ```json
  { "msg": "User created successfully" }
  ```

#### Login

- **POST** `/api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Test@123"
  }
  ```
- **Response:** `200 OK`
  ```json
  { "msg": "Login Successful !", "token": "<JWT_TOKEN>" }
  ```

#### Delete user (requires JWT)

- **DELETE** `/api/v1/auth/delete`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** `204 No Content`
  ```json
  { "msg": "User Deleted Successfully !", "id": "<user_id>" }
  ```

---

### Tasks (requires JWT)

#### Get all tasks (paginated)

- **GET** `/api/v1/tasks/all?limit=10&page=1`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** `200 OK`
  ```json
  {
    "msg": "Tasks fetched successfully",
    "tasks": [
      {
        "_id": "687a22f95da5a2094d069bc9",
        "title": "Task491 for User1",
        "description": "Random description vq6vwo",
        "user": "687a22eb5da5a2094d069665",
        "createdAt": "2025-07-18T10:33:29.678Z",
        "updatedAt": "2025-07-18T10:33:29.678Z",
        "__v": 0
      },
      {
        "_id": "687a22f95da5a2094d069bcb",
        "title": "Task492 for User1",
        "description": "Random description 1qjvhdd",
        "user": "687a22eb5da5a2094d069665",
        "createdAt": "2025-07-18T10:33:29.678Z",
        "updatedAt": "2025-07-18T10:33:29.678Z",
        "__v": 0
      },
      {
        "_id": "687a22f95da5a2094d069bcd",
        "title": "Task493 for User1",
        "description": "Random description bnhk59",
        "user": "687a22eb5da5a2094d069665",
        "createdAt": "2025-07-18T10:33:29.678Z",
        "updatedAt": "2025-07-18T10:33:29.678Z",
        "__v": 0
      },
      {
        "_id": "687a22f95da5a2094d069bcf",
        "title": "Task494 for User1",
        "description": "Random description xuyken",
        "user": "687a22eb5da5a2094d069665",
        "createdAt": "2025-07-18T10:33:29.679Z",
        "updatedAt": "2025-07-18T10:33:29.679Z",
        "__v": 0
      },
      {
        "_id": "687a22f95da5a2094d069bd1",
        "title": "Task495 for User1",
        "description": "Random description ma1ypb",
        "user": "687a22eb5da5a2094d069665",
        "createdAt": "2025-07-18T10:33:29.679Z",
        "updatedAt": "2025-07-18T10:33:29.679Z",
        "__v": 0
      }
    ],
    "page": 99,
    "limit": 5,
    "total": 100000
  }
  ```

#### Create a task

- **POST** `/api/v1/tasks/create`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
  ```json
  {
    "title": "My Task",
    "description": "Task details"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "msg": "Task created successfully",
    "id": "<task_id>",
    "title": "My Task",
    "description": "Task details"
  }
  ```

#### Update a task

- **PATCH** `/api/v1/tasks/update/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated details"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "msg": "Task updated successfully",
    "updatedTask": {
      "_id": "687a22f95da5a2094d069bc9",
      "title": "task 1",
      "description": "description 1",
      "user": "687a22eb5da5a2094d069665",
      "createdAt": "2025-07-18T10:33:29.678Z",
      "updatedAt": "2025-07-21T11:28:02.144Z",
      "__v": 0
    }
  }
  ```

#### Delete a task

- **DELETE** `/api/v1/tasks/delete/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** `204 No Content`
  ```json
  { "msg": "Task <task_id> deleted successfully" }
  ```

---

## Error Handling

- All validation errors return `400 Bad Request` with a message.
- Unauthorized access returns `401 Unauthorized`.
- Not found routes return `404 Not Found`.

---

## Notes

- All protected routes require the `Authorization: Bearer <JWT_TOKEN>` header.
- Use the `/api/v1/auth/login` endpoint to obtain a JWT token.
- The seed script will create a large number of users and tasks
