# CampusConnect API Documentation

## Overview

CampusConnect is a student community platform where authenticated users can register, log in, create posts, view posts, update and delete their own posts, and interact through comments.

---

# Base URL

## Development

```text
http://localhost:3000/api
```

## Production

Replace this with the deployed backend URL.

```text
https://your-backend-url.com/api
```

---

# Authentication

CampusConnect uses JWT (JSON Web Tokens) for authentication.

After successful login or registration, the client receives a JWT.

Protected endpoints require the token in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Authentication Flow

```text
Register
   ↓
Receive JWT
   ↓
Store token on frontend
   ↓
Send token with protected requests
   ↓
Backend verifies token
   ↓
Request proceeds
```

---

# Standard Response Format

Successful responses should return JSON.

Example:

```json
{
  "success": true,
  "data": {}
}
```

Error responses should follow:

```json
{
  "success": false,
  "message": "Description of the error"
}
```

The exact response structure may be adjusted during implementation, but frontend and backend developers must agree on any changes before integration.

---

# HTTP Status Codes

| Status | Meaning |
|---|---|
| `200` | Request successful |
| `201` | Resource successfully created |
| `400` | Invalid request / validation error |
| `401` | Authentication required or invalid |
| `403` | User is authenticated but not authorized |
| `404` | Resource not found |
| `500` | Internal server error |

---

# Health Check

## GET `/api/health`

Checks whether the backend server and database are operational.

### Authentication

Not required.

### Request

```http
GET /api/health
```

### Expected Response

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Possible Response When Database Is Unavailable

```json
{
  "status": "ok",
  "database": "disconnected"
}
```

---

# Authentication Endpoints

## POST `/api/auth/register`

Creates a new user account.

### Authentication

Not required.

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

### Request Body

```json
{
  "name": "Jake",
  "email": "jake@example.com",
  "password": "password123"
}
```

### Required Fields

| Field | Type | Required |
|---|---|---|
| `name` | String | Yes |
| `email` | String | Yes |
| `password` | String | Yes |

### Expected Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Jake",
    "email": "jake@example.com"
  },
  "token": "JWT_TOKEN"
}
```

### Errors

If required information is missing:

```json
{
  "success": false,
  "message": "Name, email and password are required"
}
```

If the email already exists:

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

## POST `/api/auth/login`

Authenticates an existing user.

### Authentication

Not required.

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

### Request Body

```json
{
  "email": "jake@example.com",
  "password": "password123"
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "USER_ID",
    "name": "Jake",
    "email": "jake@example.com"
  },
  "token": "JWT_TOKEN"
}
```

### Errors

Invalid credentials:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## GET `/api/auth/me`

Returns information about the currently authenticated user.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request

```http
GET /api/auth/me
```

### Expected Response

```json
{
  "success": true,
  "user": {
    "id": "USER_ID",
    "name": "Jake",
    "email": "jake@example.com"
  }
}
```

### Errors

Missing or invalid token:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

# Post Endpoints

Posts are the main content shared by users on CampusConnect.

Each post belongs to a user.

---

## GET `/api/posts`

Returns all posts.

### Authentication

Not required unless the backend implementation specifies otherwise.

### Request

```http
GET /api/posts
```

### Expected Response

```json
{
  "success": true,
  "posts": [
    {
      "id": "POST_ID",
      "title": "Campus Event",
      "content": "There is a football match this weekend.",
      "author": {
        "id": "USER_ID",
        "name": "Jake"
      },
      "createdAt": "2026-08-18T10:00:00.000Z",
      "updatedAt": "2026-08-18T10:00:00.000Z"
    }
  ]
}
```

---

## GET `/api/posts/:id`

Returns a single post.

### Authentication

Not required unless implementation specifies otherwise.

### Request

```http
GET /api/posts/POST_ID
```

### Expected Response

```json
{
  "success": true,
  "post": {
    "id": "POST_ID",
    "title": "Campus Event",
    "content": "There is a football match this weekend.",
    "author": {
      "id": "USER_ID",
      "name": "Jake"
    },
    "createdAt": "2026-08-18T10:00:00.000Z",
    "updatedAt": "2026-08-18T10:00:00.000Z"
  }
}
```

### Errors

```json
{
  "success": false,
  "message": "Post not found"
}
```

---

## POST `/api/posts`

Creates a new post.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request

```http
POST /api/posts
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "title": "Campus Event",
  "content": "There is a football match this weekend."
}
```

### Required Fields

| Field | Type | Required |
|---|---|---|
| `title` | String | Yes |
| `content` | String | Yes |

### Expected Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "POST_ID",
    "title": "Campus Event",
    "content": "There is a football match this weekend.",
    "author": {
      "id": "USER_ID",
      "name": "Jake"
    },
    "createdAt": "2026-08-18T10:00:00.000Z"
  }
}
```

The author should be determined from the authenticated user rather than supplied manually by the frontend.

---

## PUT `/api/posts/:id`

Updates an existing post.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Authorization

Only the owner of the post should be allowed to update it.

### Request

```http
PUT /api/posts/POST_ID
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "title": "Updated Campus Event",
  "content": "The football match has been moved to Saturday."
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": {
    "id": "POST_ID",
    "title": "Updated Campus Event",
    "content": "The football match has been moved to Saturday."
  }
}
```

### Errors

Post doesn't exist:

```json
{
  "success": false,
  "message": "Post not found"
}
```

User doesn't own the post:

```json
{
  "success": false,
  "message": "Not authorized to update this post"
}
```

---

## DELETE `/api/posts/:id`

Deletes an existing post.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Authorization

Only the owner of the post should be allowed to delete it.

### Request

```http
DELETE /api/posts/POST_ID
Authorization: Bearer <JWT_TOKEN>
```

### Expected Response

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### Errors

```json
{
  "success": false,
  "message": "Not authorized to delete this post"
}
```

---

# Comment Endpoints

Comments belong to a specific post and are created by authenticated users.

---

## GET `/api/posts/:postId/comments`

Returns all comments belonging to a post.

### Authentication

Not required unless implementation specifies otherwise.

### Request

```http
GET /api/posts/POST_ID/comments
```

### Expected Response

```json
{
  "success": true,
  "comments": [
    {
      "id": "COMMENT_ID",
      "content": "Sounds great!",
      "author": {
        "id": "USER_ID",
        "name": "Jake"
      },
      "post": "POST_ID",
      "createdAt": "2026-08-18T11:00:00.000Z"
    }
  ]
}
```

---

## POST `/api/posts/:postId/comments`

Creates a comment on a post.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request

```http
POST /api/posts/POST_ID/comments
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "content": "Sounds great!"
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Comment created successfully",
  "comment": {
    "id": "COMMENT_ID",
    "content": "Sounds great!",
    "author": {
      "id": "USER_ID",
      "name": "Jake"
    },
    "post": "POST_ID",
    "createdAt": "2026-08-18T11:00:00.000Z"
  }
}
```

The author should be determined from the authentication token.

---

## DELETE `/api/comments/:id`

Deletes a comment.

### Authentication

Required.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Authorization

A user should only be able to delete their own comment unless the project explicitly implements an administrator role.

### Request

```http
DELETE /api/comments/COMMENT_ID
Authorization: Bearer <JWT_TOKEN>
```

### Expected Response

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

### Errors

```json
{
  "success": false,
  "message": "Not authorized to delete this comment"
}
```

---

# Data Relationships

The main relationships in the database are:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Posts         Comments
 │               ▲
 │               │
 └───────────────┘
```

More specifically:

```text
User
 ├── has many Posts
 └── has many Comments

Post
 ├── belongs to User
 └── has many Comments

Comment
 ├── belongs to User
 └── belongs to Post
```

---

# User Model

Expected fields:

```json
{
  "_id": "USER_ID",
  "name": "Jake",
  "email": "jake@example.com",
  "password": "HASHED_PASSWORD",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

### Important

Passwords must **never** be returned to the frontend.

Passwords must be stored as hashes rather than plain text.

---

# Post Model

Expected fields:

```json
{
  "_id": "POST_ID",
  "title": "Campus Event",
  "content": "There is a football match this weekend.",
  "author": "USER_ID",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

---

# Comment Model

Expected fields:

```json
{
  "_id": "COMMENT_ID",
  "content": "Sounds great!",
  "author": "USER_ID",
  "post": "POST_ID",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

---

# Frontend Integration

The React frontend should communicate with the backend through the API endpoints documented above.

A centralized API service should be used instead of scattering `fetch` or `axios` calls throughout components.

Recommended structure:

```text
frontend/
└── src/
    ├── services/
    │   └── api.js
    ├── context/
    │   └── AuthContext.jsx
    ├── components/
    ├── pages/
    └── App.jsx
```

---

# Authentication on the Frontend

After login:

```text
User logs in
     ↓
Backend validates credentials
     ↓
Backend returns JWT
     ↓
Frontend stores token
     ↓
Frontend sends token with protected requests
```

Example request:

```javascript
fetch("/api/posts", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

The exact token storage implementation should be agreed upon by the team.

---

# Protected Routes

The frontend should prevent unauthenticated users from accessing protected pages.

Examples:

```text
/create-post
/profile
```

The frontend should redirect unauthenticated users to:

```text
/login
```

Backend authentication remains the final authority. Frontend route protection is for user experience and does not replace backend authorization.

---

# API Error Handling

The backend should return meaningful errors.

Example:

```json
{
  "success": false,
  "message": "Invalid request"
}
```

The frontend should display appropriate user-friendly messages rather than exposing raw server errors.

Example:

```text
Unable to create post. Please try again.
```

---

# Validation

The backend should validate incoming data.

## Registration

- Name required
- Email required
- Valid email format
- Password required
- Password should meet the project's minimum requirements

## Posts

- Title required
- Content required

## Comments

- Content required
- Empty comments should not be accepted

Backend validation must not rely only on frontend validation.

---

# Authorization Rules

Authentication determines:

> Who is the user?

Authorization determines:

> What is the user allowed to do?

## Posts

Users can:

- Create posts
- View posts
- Update their own posts
- Delete their own posts

Users should **not** be able to update or delete another user's post.

## Comments

Users can:

- Create comments
- View comments
- Delete their own comments

---

# API Testing

The API should be tested before frontend integration.

Recommended testing order:

```text
1. Health check
      ↓
2. Register
      ↓
3. Login
      ↓
4. Get current user
      ↓
5. Create post
      ↓
6. Get posts
      ↓
7. Get single post
      ↓
8. Update post
      ↓
9. Create comment
      ↓
10. Get comments
      ↓
11. Delete comment
      ↓
12. Delete post
```

Testing tools may include:

- Postman
- Thunder Client
- Browser
- `curl`

---

# Development Environment Variables

The backend should use environment variables for configuration.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Security

Never commit:

```text
.env
```

to GitHub.

Use:

```text
.env.example
```

for documenting required environment variables.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

# CORS

The backend must allow requests from the frontend development URL.

Example development frontend:

```text
http://localhost:5173
```

The production frontend URL should be configured through environment variables rather than hardcoded where possible.

---

# API Development Rules

All team members should follow these rules:

1. Use the endpoint names documented in this file.
2. Do not change an endpoint without informing the frontend/API integration developer.
3. Keep request and response structures consistent.
4. Use appropriate HTTP status codes.
5. Return JSON responses.
6. Validate incoming data.
7. Protect authenticated endpoints.
8. Check resource ownership before update/delete operations.
9. Never return passwords.
10. Keep secrets in environment variables.
11. Test endpoints before opening a Pull Request.
12. Update this document if an agreed API contract changes.

---

# Git Workflow

Each developer should work on their assigned feature branch.

Example:

```bash
git checkout main
git pull origin main
git checkout -b feature/authentication
```

Commit changes:

```bash
git add .
git commit -m "feat: implement user registration"
```

Push:

```bash
git push origin feature/authentication
```

Then create a Pull Request.

**Do not push directly to `main`.**

---

# Pull Request Requirements

Before opening a PR, the developer should confirm:

- [ ] Feature works locally
- [ ] Relevant API endpoints tested
- [ ] No secrets committed
- [ ] No unnecessary files committed
- [ ] Code follows existing project structure
- [ ] Error handling is included
- [ ] Related GitHub issue is referenced
- [ ] `main` was pulled before finalizing the work

---

# Current Development Priority

Because the project has a limited development timeline, the implementation priority is:

```text
1. Authentication
2. Posts CRUD
3. Comments
4. Core React UI
5. Frontend/API integration
6. Full application testing
7. Deployment
8. Documentation and presentation
```

Optional or stretch features should only be implemented after the core MVP is functional.

---

# Definition of a Working MVP

CampusConnect should be considered functionally complete when a user can:

```text
Register
   ↓
Login
   ↓
View the community feed
   ↓
Create a post
   ↓
View a post
   ↓
Comment on a post
   ↓
Edit/delete their own post
   ↓
Delete their own comment
   ↓
Log out
```

All major data should persist in MongoDB.

The frontend should communicate with the deployed backend API.

---

# Final Integration Checklist

Before submission:

- [ ] Registration works
- [ ] Login works
- [ ] JWT authentication works
- [ ] Protected routes work
- [ ] Current-user endpoint works
- [ ] Posts can be created
- [ ] Posts can be viewed
- [ ] Posts can be updated
- [ ] Posts can be deleted
- [ ] Comments can be created
- [ ] Comments can be viewed
- [ ] Comments can be deleted
- [ ] Ownership checks work
- [ ] API errors are handled
- [ ] React frontend communicates with backend
- [ ] MongoDB stores application data
- [ ] Environment variables are configured
- [ ] CORS works
- [ ] Production build works
- [ ] Backend is deployed
- [ ] Frontend is deployed
- [ ] Production application has been tested
- [ ] README is complete
- [ ] Contributors are documented
- [ ] Presentation/demo is prepared

---

# Important

This document is the **shared API contract** for the CampusConnect team.

If a developer needs to change an endpoint, request body, response structure, authentication requirement, or data relationship, they should discuss the change with the team before implementing it.

The goal is to prevent frontend and backend developers from making incompatible assumptions.
```

### One important distinction

The **outermost block above is the content of `API.md`**. Once pasted into the actual Markdown file, the nested ```json, ```javascript, ```bash, etc. blocks are supposed to remain there — that's how Markdown displays code examples correctly.

So your repository should look like:

```text
iyf-s11-week-12-team-JakeGitahi/
│
├── backend/
├── frontend/
├── docs/
│   └── API.md
├── README.md
├── .gitignore
└── ...
```

