# Week 12: CampusConnect

## Author

- **Name:** Jake Gitahi
- **GitHub:** [@JakeGitahi](https://github.com/JakeGitahi)
- **Date:** August 21, 2026

## Project Description

CampusConnect is a full-stack student community platform where users can register, log in, create posts, view the community feed, and comment on posts. The project was built to provide a simple space for students to share updates, ideas, and learning experiences.

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- Render

## Features

- User registration and login
- JWT-based authentication with persistent sessions
- Protected frontend routes
- Create and view posts
- View and add comments
- User profile page
- Logout functionality
- Loading and error states
- Responsive frontend interface
- Deployed frontend and backend with MongoDB Atlas

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/JakeGitahi/iyf-s11-week-12-team-JakeGitahi.git
   ```

2. Set up the backend:

   ```bash
   cd iyf-s11-week-12-team-JakeGitahi/backend
   npm install
   ```

3. Create a `.env` file in the `backend` folder:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

5. In a second terminal, set up the frontend:

   ```bash
   cd iyf-s11-week-12-team-JakeGitahi/frontend
   npm install
   ```

6. Create a `.env` file in the `frontend` folder:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

7. Start the frontend:

   ```bash
   npm run dev
   ```

8. Open the local URL shown by Vite, usually `http://localhost:5173`.

## Lessons Learned

- How to connect a React frontend to an Express and MongoDB backend.
- How JWT authentication protects user actions and restores sessions.
- How to deploy a full-stack application using Render and MongoDB Atlas.
- How to handle differences between frontend display data and backend API data.
- Why file-name casing matters when deploying from Windows to Linux.

## Challenges Faced

- The frontend originally relied on mock data, while the backend used MongoDB API responses. This was solved by creating a centralized API service and data-mapping layer.
- The backend required a post title while the existing UI only collected post content. The frontend now derives a concise title from the post content.
- MongoDB Atlas initially rejected the deployment connection. Configuring Atlas network access and Render environment variables resolved the issue.
- The first production frontend build failed because of an uppercase/lowercase import mismatch. Correcting the import made the Linux deployment succeed.

## Live Demo

- [Frontend application](https://iyf-s11-week-12-team-jakegitahi-1.onrender.com)
- [Backend health check](https://iyf-s11-week-12-team-jakegitahi.onrender.com/api/health)
