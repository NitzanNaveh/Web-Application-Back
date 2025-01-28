🌐 Web Application Backend (Frontend part is not ready yet)

📌 Overview

This project is a REST API built with Node.js, Express, TypeScript, Jest, and Swagger.
It provides full CRUD (Create, Read, Update, Delete) operations for managing Users, Posts, and Comments while implementing JWT authentication with a refresh token system.

🎯 Features

🔐 User Authentication: Registration, Login, and Logout using JWT.

📝 CRUD Operations: Users can create, update, and delete posts and comments.

👥 User Management: Each user has a username, email, and other profile details.

🔄 JWT Authentication: Secure session management with refresh tokens.

📖 Swagger API Documentation: Fully documented endpoints.

✅ Unit Testing: Jest is used to ensure API reliability with full test coverage.

🛠 Technologies Used

Node.js (Runtime environment)

Express.js (Web framework)

TypeScript (For type safety and maintainability)

MongoDB / PostgreSQL (Database support)

JWT (Authentication & refresh tokens)

Jest (Unit testing framework)

Swagger (API documentation)

🚀 Installation & Running the API

1️⃣ Clone the Repository

git clone https://github.com/NitzanNaveh/Web-Application-Back.git

cd Web-Application-Back

2️⃣ Install Dependencies

npm install

3️⃣ Setup Environment Variables

Create a .env file and define necessary configurations:

PORT=5000

JWT_SECRET=your_secret_key

REFRESH_SECRET=your_refresh_secret

DB_URL=your_database_url

4️⃣ Run the API

npm start

For development environment

npm run dev

📲 API Endpoints

The API provides the following endpoints:

🔐 Authentication

POST /api/auth/register → Register a new user

POST /api/auth/login → Login and get JWT tokens

POST /api/auth/logout → Logout user

POST /api/auth/refresh → Refresh access token

👥 Users

GET /api/users → Get all users

GET /api/users/:id → Get a specific user

PUT /api/users/:id → Update user details

DELETE /api/users/:id → Delete a user

📝 Posts

POST /api/posts → Create a new post

GET /api/posts → Get all posts

GET /api/posts/:id → Get a specific post

PUT /api/posts/:id → Update a post

DELETE /api/posts/:id → Delete a post

💬 Comments

POST /api/posts/:id/comments → Add a comment to a post

GET /api/posts/:id/comments → Get comments for a post

DELETE /api/comments/:id → Delete a comment

📖 Swagger Documentation is available at:

http://localhost:5000/api-docs

✅ Running Tests

To run Jest unit tests and check coverage:

npm test

To generate a test coverage report:

npm run test:coverage

