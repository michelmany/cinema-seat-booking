# Cinema Seat Booking Backend

## Overview
This project is a backend implementation for a cinema seat booking system. It handles concurrent seat reservations using Optimistic Locking to ensure data consistency when multiple users attempt to reserve the same seat.

## Features
1. RESTful API for managing cinema sessions and reservations.
2. Optimistic Locking to handle concurrency during seat reservations.
3. MongoDB for flexible data storage of users, reservations, sessions, and halls.
4. PostgreSQL can optionally be used for analytics and relational operations.

---

## Prerequisites
Ensure the following are installed on your system:
- **Node.js**: [Install Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)
- **PostgreSQL**: [Install PostgreSQL](https://www.postgresql.org/download/)
- **npm**: Installed with Node.js

---

## Setup Instructions

### 1. Clone Repository
```bash
# Clone the repository
git clone https://github.com/your-username/cinema-seat-booking.git
cd cinema-seat-booking
```

### 2. Install Dependencies
```bash
npm install
```

### 3. MongoDB Setup
Start MongoDB locally:
```bash
brew services start mongodb/brew/mongodb-community
```

### 4. PostgreSQL Setup
Create a new PostgreSQL database:
```bash
psql postgres
CREATE DATABASE cinema;
```

### 5. Run the Server
Start the application using Nodemon:
```bash
npx nodemon server.js
```
Access the server at `http://localhost:3000`.

---

## API Endpoints

### 1. `GET /sessions`
Retrieve all cinema sessions.

### 2. `GET /sessions/:id/seats`
Retrieve the seat availability for a specific session.

### 3. `POST /sessions/:id/seats/reserve`
Reserve seats for a specific session.
#### Request Body Example:
```json
{
  "seatNumbers": ["A1", "A2"],
  "userId": "<USER_ID>"
}
```
#### Response:
```json
{
  "message": "Seats reserved successfully",
  "reservation": {
    "sessionId": "<SESSION_ID>",
    "userId": "<USER_ID>",
    "seats": ["A1", "A2"]
  }
}
```

---

## Concurrency Logic
The system implements **Optimistic Locking** for seat reservations:
1. Each seat includes a `version` field.
2. Before updating the seat status, the system checks if the `version` matches the current state in the database.
3. If the version mismatch occurs (indicating another user has updated the seat), the system rejects the update with an error.

### Example Scenario:
- User A and User B try to reserve `A1` concurrently.
- User A updates the seat and increments its version.
- When User B tries to update, a version mismatch is detected, and the update is rejected.

---

## Design Choices
1. **MongoDB**:
   - Flexible schema for managing nested documents like seats and reservations.
   - Ideal for rapidly evolving data structures.

2. **Optimistic Locking**:
   - Avoids bottlenecks compared to pessimistic locks.
   - Ensures smooth concurrent access with minimal performance impact.

3. **RESTful API**:
   - Well-structured and intuitive endpoints for managing sessions and reservations.

4. **Scalability**:
   - The architecture is designed to be scalable with minimal refactoring, supporting horizontal scaling with sharded MongoDB clusters and connection pooling for PostgreSQL.

---

## Performance Monitoring
To monitor system performance:
- Use the `/metrics` endpoint to track key performance indicators (KPIs):
  - Total sessions
  - Total reservations
  - Total users

---

## Deployment

### Deploying to Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel
   ```

### Alternative Hosting Options
- **Railway**: [https://railway.app](https://railway.app)
- **Render**: [https://render.com](https://render.com)

---