# stocks-backend
# Stocks Backend

Backend service for the Stock Market Portfolio & Watchlist Application.

This backend provides APIs for:
- User authentication
- Watchlist management
- Holdings management
- Stock alerts
- Portfolio tracking

Built using:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

---

# Features

- User Registration & Login
- JWT Authentication
- Protected APIs
- Add/Remove Watchlist Stocks
- Portfolio Holdings Management
- Price Alert System
- RESTful API Architecture
- Error Handling Middleware
- Modular Folder Structure

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- nodemon

---

# Project Structure

```bash
stocks-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│
├── routes/
│
├── utils/
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Navigate to Project

```bash
cd stocks-backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment Variables
MONGO_URL=mongodb+srv://fixmydayy:fixmyday@cluster0.nwjyii7.mongodb.net/stocksDb?appName=Cluster0
JWT_SECRET=stockAlert@Secret
FINNHUB_API_KEY=d80qqapr01qt5k5vvc80d80qqapr01qt5k5vvc8g
