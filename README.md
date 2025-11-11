<div align="center">

<!-- LOGO -->

<img src="frontend/public/language.png" alt="Streamify Logo" width="100" />

<!-- TITLE -->

<h1 style="border-bottom: none;">
<b>✨ Streamify Chat ✨</b>
</h1>

<!-- SUBTITLE -->

<p>
A Full-Stack MERN (MongoDB, Express, React, Node.js) application built for real-time language exchange. Connect with users worldwide via instant chat and high-definition 1-on-1 video calls.
</p>

<br />

<!-- SCREENSHOT -->

<img src="frontend/public/screenshot-for-readme.png" alt="Streamify Project Banner" />
</div>

🚀 About The Project

Streamify is more than just a chat app; it's a dedicated platform for language learners. The core idea is to connect people based on their native language and the language they want to learn.

Users can create a detailed profile, get recommendations for language partners, send friend requests, and start practicing immediately. The entire real-time communication suite—from instant messaging to HD video calls—is powered by the Stream API, ensuring a scalable and reliable experience.

<br />

Core Features

🔐 Secure Authentication: Full JWT (JSON Web Token) authentication flow with signup, login, and protected routes.

👤 Custom Onboarding: Users set up their profile with a bio, location, and—most importantly—their native and learning languages.

🤝 Smart User Discovery: The homepage recommends other users who are native speakers of the language you're learning.

❤️ Friend Request System: Connect with other learners by sending and accepting friend requests.

💬 Real-time Chat: Instant 1-on-1 messaging powered by Stream Chat, complete with typing indicators, read receipts, and reactions.

📹 HD Video Calling: Seamlessly initiate 1-on-1 video calls directly from the chat window, built with Stream Video SDK.

🎨 32 Unique Themes: A theme selector (powered by DaisyUI and Zustand) allows users to customize their UI from 32 different color palettes.

⚡ Modern Tech Stack: Built with a fully modern frontend using Vite, TanStack Query for server state, and Zustand for global client state.

🛠️ Built With

This project is built with a modern MERN stack and utilizes powerful third-party APIs for its core functionality.

Frontend



React

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-React-61DAFB%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3Dblack" />

Vite

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Vite-646CFF%3Fstyle%3Dfor-the-badge%26logo%3Dvite%26logoColor%3Dwhite" />

Stream Chat SDK

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Stream%2520Chat-005FFF%3Fstyle%3Dfor-the-badge%26logo%3Dstream%26logoColor%3Dwhite" />

Stream Video SDK

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Stream%2520Video-005FFF%3Fstyle%3Dfor-the-badge%26logo%3Dstream%26logoColor%3Dwhite" />

TanStack Query

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-TanStack%2520Query-FF4154%3Fstyle%3Dfor-the-badge%26logo%3Dreactquery%26logoColor%3Dwhite" />

Zustand

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Zustand-000000%3Fstyle%3Dfor-the-badge" />

Tailwind CSS

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Tailwind-06B6D4%3Fstyle%3Dfor-the-badge%26logo%3Dtailwindcss%26logoColor%3Dwhite" />

DaisyUI

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-DaisyUI-1AD1A5%3Fstyle%3Dfor-the-badge" />

Backend



Node.js

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Node.js-339933%3Fstyle%3Dfor-the-badge%26logo%3Dnode.js%26logoColor%3Dwhite" />

Express

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Express-000000%3Fstyle%3Dfor-the-badge%26logo%3Dexpress%26logoColor%3Dwhite" />

MongoDB

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-MongoDB-47A248%3Fstyle%3Dfor-the-badge%26logo%3Dmongodb%26logoColor%3Dwhite" />

Mongoose

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-Mongoose-880000%3Fstyle%3Dfor-the-badge" />

JWT

<img src="https://www.google.com/search?q=https://img.shields.io/badge/-JWT-000000%3Fstyle%3Dfor-the-badge%26logo%3Djsonwebtokens%26logoColor%3Dwhite" />

🏁 Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or newer)

npm

MongoDB Atlas account (or a local MongoDB instance)

Stream Account (for API Key and Secret)

1. Clone the Repository

git clone [https://github.com/your-username/streamify-chat.git](https://github.com/your-username/streamify-chat.git)
cd streamify-chat


2. Configure Environment Variables

This project requires environment variables for both the frontend and backend.

Backend (/backend)
Create a .env file in the /backend directory and add the following:

# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongo_db_connection_string

# Stream API
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret

# JWT
JWT_SECRET_KEY=your_super_secret_jwt_key


Frontend (/frontend)
Create a .env file in the /frontend directory and add the following:

# Stream API Key (Public)
VITE_STREAM_API_KEY=your_stream_api_key


3. Install Dependencies & Run

You can install dependencies and run both servers from the root directory.

# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend


To run both servers concurrently:

# Terminal 1: Start the Backend Server
npm run dev --prefix backend

# Terminal 2: Start the Frontend Vite Server
npm run dev --prefix frontend


Your application should now be running on http://localhost:5173.

🗺️ API Endpoints

The backend Express server exposes the following REST API endpoints.

Method

Endpoint

Description

Protected

POST

/api/auth/signup

Registers a new user.

No

POST

/api/auth/login

Logs in an existing user and sets JWT cookie.

No

POST

/api/auth/logout

Logs out the user and clears JWT cookie.

No

GET

/api/auth/me

Gets the currently authenticated user.

Yes

POST

/api/auth/onboarding

Completes the user's profile onboarding.

Yes

GET

/api/users

Gets recommended users for the auth user.

Yes

GET

/api/users/friends

Gets all friends for the auth user.

Yes

POST

/api/users/friend-request/:id

Sends a friend request to a user.

Yes

PUT

/api/users/friend-request/:id/accept

Accepts a friend request.

Yes

GET

/api/users/friend-requests

Gets all incoming/accepted friend requests.

Yes

GET

/api/users/outgoing-friend-requests

Gets all pending outgoing friend requests.

Yes

GET

/api/chat/token

Generates a Stream token for the auth user.

Yes
