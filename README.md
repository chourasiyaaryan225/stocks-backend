# stocks-backend
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
## 5. Start the server
npm start


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

# API Endpoints

## Authentication

### POST /api/auth/signup
Register a new user.

**Payload:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/login
Login an existing user.

**Payload:**
```json
{
  "email": "string",
  "password": "string"
}
```

## Stocks

### GET /api/stocks/search?q={query}
Search for stocks by query.

**Query Parameters:**
- `q`: Search query string

### GET /api/stocks/getStocksDetails/{symbol}
Get details for a specific stock.

**Path Parameters:**
- `symbol`: Stock symbol

### GET /api/stocks/getStocks
Get list of stocks.

## User

### POST /api/user/addToWatchList
Add a stock to user's watchlist.

**Payload:**
```json
{
  "user": "string",
  "symbol": "string",
  "companyName": "string",
  "companyLogo": "string",
  "exchange": "string",
  "country": "string",
  "currency": "string"
}
```

### DELETE /api/user/removeFromWatchList
Remove a stock from user's watchlist.

**Payload:**
```json
{
  "user": "string",
  "symbol": "string"
}
```

### GET /api/user/userWatchlist/{user}
Get user's watchlist.

**Path Parameters:**
- `user`: User email

### POST /api/user/createAlert
Create a price alert.

**Payload:**
```json
{
  "user": "string",
  "symbol": "string",
  "companyName": "string",
  "condition": "string",
  "targetPrice": "number"
}
```

### GET /api/user/alerts/{user}
Get user's alerts.

**Path Parameters:**
- `user`: User email

### DELETE /api/user/deleteAlert/{id}
Delete an alert.

**Path Parameters:**
- `id`: Alert ID

### POST /api/user/addHolding
Add a holding to user's portfolio.

**Payload:**
```json
{
  "user": "string",
  "symbol": "string",
  "companyName": "string",
  "companyLogo": "string",
  "exchange": "string",
  "currency": "string",
  "quantity": "number",
  "buyPrice": "number"
}
```

### GET /api/user/portfolio/{user}
Get user's portfolio.

**Path Parameters:**
- `user`: User email

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
├── index.js
├── package.json
└── README.md
```

---

