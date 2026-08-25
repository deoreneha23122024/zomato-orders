# Zomato Orders API

A robust, paginated REST API built with Node.js, Express, and MySQL to efficiently serve food order data.

## 🚀 Live Deployment
*   **Live API Endpoint:** [https://zomato-orders-omega.vercel.app/api/orders](https://zomato-orders-omega.vercel.app/api/orders)
*   **Deployment Platform:** Vercel

## 🏗️ Architecture & Dual-Database Strategy
This project utilizes a highly resilient dual-database approach for maximum uptime:
1. **Local Development (MySQL):** The API connects to a local MySQL database for robust relational data querying and development.
2. **Production Fallback (In-Memory):** Because free cloud databases actively block external cloud servers (like Vercel) for security reasons, the `index.js` file includes a smart fallback. If the cloud database connection drops or is blocked, the API automatically serves the exact same records from an in-memory `data.js` array. **This ensures the live production URL never crashes.**

## 🛠️ Tech Stack
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL
*   **Testing:** Postman, Newman

## 💻 Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/deoreneha23122024/zomato-orders.git
   cd zomato-orders
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=test
   PORT=8080
   ```

4. **Start the Server**
   ```bash
   npm start
   ```
   The API will be running at `http://localhost:8080/api/orders`

## 🧪 Testing with Postman
A Postman collection is included in this repository (`Zomato_Orders_Postman_Collection.json`).
1. Import the file into Postman.
2. The collection is pre-configured to hit `http://localhost:8080`.
3. Simply click "Send" on the 6 provided requests to verify pagination and validation fallbacks.
