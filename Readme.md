# Activity Booking API

A RESTful API for managing activities and bookings built with Express.js and MongoDB.

## Overview

This project is a backend service that allows users to:
- Create an account and authenticate
- Create and view activities
- Book activities
- View their bookings

## Tech Stack

- **Node.js** & **Express.js**: Server framework
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Zod**: Data validation

## Project Structure

```
src/
├── configs/           # Configuration files
│   ├── database-config.js
│   └── jwt-config.js
├── controllers/       # Request handlers
│   ├── activity.controller.js
│   ├── booking.controller.js
│   └── user.controller.js
├── middlewares/       # Custom middleware
│   └── middleware.js
├── models/            # Business logic
│   ├── acitivity.model.js
│   ├── user.model.js
│   └── userBooking.model.js
├── routes/            # API routes
│   └── routes.js
├── schemas/           # MongoDB schemas
│   ├── activity.schema.js
│   ├── user.schema.js
│   └── userbooking.js
├── validator/         # Input validation
│   ├── activityValidation.js
│   └── userValidation.js
├── index.js           # Entry point
└── server.js          # Express server setup
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Shu12388y/Basic-Activity-Booking-App.git
   cd Basic-Activity-Booking-App
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   PORT=5000
   DB=mongodb://localhost:27017/activity-booking
   JWT=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/v1/signup**
  - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string", "phonenumber": "string" }`

- **GET /api/v1/signin**
  - Login and receive a JWT token
  - Body: `{ "email": "string", "password": "string" }`

### Activities

- **POST /api/v1/activity**
  - Create a new activity
  - Body: `{ "title": "string", "description": "string", "location": "string", "date": "YYYY-MM-DD", "time": "HH:MM" }`

- **GET /api/v1/activity/:id**
  - Get activity details by ID

- **GET /api/v1/activities**
  - Get all activities

### Bookings

- **POST /api/v1/book**
  - Book an activity (requires authentication)
  - Body: `{ "activityId": "string" }`
  - Headers: `Authorization: <jwt_token>`

- **GET /api/v1/bookings/user**
  - Get all bookings for the authenticated user
  - Headers: `Authorization: <jwt_token>`

## Authentication Flow

1. Register using the `/signup` endpoint
2. Login using the `/signin` endpoint to receive a JWT token
3. Include the token in the `Authorization` header for protected routes

## Data Models

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `phonenumber`: String (required, 10 digits)

### Activity
- `title`: String (required)
- `description`: String (required)
- `location`: String (required)
- `date`: Date (required)
- `time`: String (required, format: HH:MM)

### UserBookedActivity
- `user`: ObjectId (reference to User)
- `activity`: ObjectId (reference to Activity)
- `bookingDate`: Date (default: current date)
- `status`: String (enum: booked, cancelled, completed)

## Error Handling

The API uses standard HTTP status codes for responses:
- `200/201`: Success
- `400`: Bad request/validation error
- `401`: Unauthorized
- `404`: Resource not found
- `409`: Conflict (e.g., duplicate booking)
- `500`: Server error


[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/28176216-63ad4c78-9237-413f-9949-8d4b535496a4?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D28176216-63ad4c78-9237-413f-9949-8d4b535496a4%26entityType%3Dcollection%26workspaceId%3Dddfeaef1-e8a3-4529-b4ac-e50ed746c1c7)