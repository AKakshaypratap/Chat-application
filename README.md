# MERN Real-Time Chat Application

This repository contains a real-time chat application built with the MERN stack and WebSockets. The backend uses Node.js, Express, MongoDB, and Socket.IO, while the frontend is a React + Vite app with Redux Toolkit and socket.io-client.

## Project Overview

The app supports:
- User registration and login
- Cookie-based JWT authentication
- Fetching other users
- One-to-one direct chat
- Message persistence in MongoDB
- Real-time message delivery using Socket.IO
- Online presence indicators

## Tech Stack

- Backend:
  - Node.js
  - Express
  - MongoDB / Mongoose
  - Socket.IO
  - bcryptjs
  - jsonwebtoken
  - dotenv
  - cookie-parser
  - cors
- Frontend:
  - React
  - Vite
  - Redux Toolkit
  - Redux Persist
  - React Router DOM
  - axios
  - socket.io-client
  - Tailwind CSS + DaisyUI
  - react-hot-toast

## 📁 Project Structure

- `backend/`
  - `index.js` - Express app entry and middleware setup
  - `socket/socket.js` - Socket.IO server and online-user tracking
  - `config/database.js` - MongoDB connection
  - `controllers/` - business logic for users and messages
  - `models/` - Mongoose schemas for User, Conversation, Message
  - `middleware/isAuthenticated.js` - JWT cookie auth guard
  - `routes/` - API route definitions
- `frontend/`
  - `src/App.jsx` - app routing and socket initialization
  - `src/components/` - UI pages and chat components
  - `src/hooks/` - hooks for API data fetching and realtime update
  - `src/redux/` - state slices and store configuration

## 🔧 Backend Architecture

### Authentication
- `backend/controllers/userController.js`
  - `register` creates new users with hashed passwords
  - `login` checks credentials and returns a JWT cookie
  - `logout` clears the token cookie
  - `getOtherUsers` returns all users except the authenticated user
- `backend/middleware/isAuthenticated.js`
  - validates the JWT stored in `usertoken` cookie
  - sets `req.id` to the authenticated user ID

### Messaging
- `backend/controllers/messageController.js`
  - `sendMessage` creates or preserves a conversation, saves a new message, and emits it by Socket.IO
  - `getMessage` loads historical messages for a selected conversation
- Data models:
  - `User` stores profile details and auth credentials
  - `Conversation` holds participant IDs and message references
  - `Message` stores sender, receiver, and text

### Socket Flow
- `backend/socket/socket.js`
  - maintains an in-memory `userSocketMap`
  - maps connected user IDs to socket IDs using `socket.handshake.query.userId`
  - emits `getOnlineUsers` to clients when users connect/disconnect
  - enables direct delivery of `newMessage` events to the receiver

## Frontend Architecture

### Routing
- `frontend/src/App.jsx`
  - routes: `/`, `/register`, `/login`
  - initializes the Socket.IO client after login
  - listens for `getOnlineUsers`

### State Management
- Redux slices:
  - `userSlice` - auth user, other users, selected chat user, online user list
  - `messageSlice` - message list
  - `socketSlice` - active socket instance
- `redux-persist` persists state across browser refreshes

### Key UI Components
- `HomePage` - sidebar + chat panel
- `Sidebar` - search, logout, other users list
- `OtherUsers` / `User` - display users and set active chat partner
- `MessageContainer` - selected chat header, message history, send input
- `Messages` / `SingleMsg` - render conversation bubbles
- `SendInput` - send new messages through backend API

### Hooks
- `useGetOtherUsers` - loads all available chat users
- `useGetMessages` - loads conversation history when a user is selected
- `useGetRealTimeMessage` - listens for incoming `newMessage` events and appends them to state

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_jwt_secret>
PORT=8080
```

Start the backend server:

```bash
node index.js
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Usage

- Open the frontend app at `http://localhost:5173`
- Register a new user or log in
- Click a user from the sidebar to start a chat
- Send messages and receive real-time updates if the other user is online

## Default Ports

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

## Notes and Observations

- The app uses cookie-based JWT authentication with `withCredentials: true` on frontend requests.
- Real-time presence and messages rely on Socket.IO with an in-memory socket map.
- Conversations are saved in MongoDB and loaded whenever a chat partner is selected.
- User avatars are generated automatically based on gender.

## Recommended Improvements

- Add a `start` script to `backend/package.json` for easier development
- Add form validation and auth-protected route redirects on the frontend
- Persist active user info more explicitly in localStorage for refresh resilience
- Improve error handling and user feedback for API failures
- Expand message metadata to include read receipts or timestamps

---

If you want, I can also add a more compact version of this README or generate a `backend/package.json` `start` script for easier startup.`}