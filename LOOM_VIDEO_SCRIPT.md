# 🎬 Loom Video Script — Zomato Orders API
### Exact words to say + What to show on screen

---

> **Total Duration:** ~15 minutes
> **Tool to use:** Loom screen recorder
> **Open before recording:**
> - Browser with `https://zomato-orders-omega.vercel.app/api/orders`
> - VS Code with the project open
> - Postman with collection imported
> - GitHub repo: `github.com/deoreneha23122024/zomato-orders`

---

## 🎙️ SEGMENT 1 — Introduction (1.5 minutes)

### 🖥️ Show on screen: Live API URL in browser

### 📢 Say exactly this:

> *"Hi, my name is Neha Deore. In this video, I'm going to walk you through my capstone project — the **Zomato Orders API**.*
>
> *I built a **REST API backend** using **Node.js and Express** that serves paginated restaurant order data. The problem this solves is simple — when you have thousands of orders in a database, you cannot send all of them at once. It will crash the app. So we need **pagination** — returning only a limited number of records at a time.*
>
> *This backend is consumed by a **frontend application** — for example, a Zomato-like food ordering dashboard — where users browse through orders page by page.*
>
> *My tech stack is:*
> - ***Node.js*** — the runtime environment
> - ***Express.js*** — the web framework
> - ***MySQL*** — the relational database
> - ***Vercel*** — for cloud deployment
> - ***GitHub*** — for version control
>
> *The live API is already deployed and running. Let me show you..."*

### 🖥️ [Show in browser]
- Open: `https://zomato-orders-omega.vercel.app/api/orders`
- Say: *"This is the live API returning 10 orders by default."*

---

## 🎙️ SEGMENT 2 — Problem Understanding (2 minutes)

### 🖥️ Show on screen: VS Code → `src/data.js`

### 📢 Say exactly this:

> *"Now let me explain WHY we need a backend for this application.*
>
> *We have **12 restaurant order records** in our database. Each record has:*
> - *A unique ID*
> - *A product title*
> - *A detailed description*
>
> *If this were a frontend-only solution, we would hardcode all 12 items in HTML — which has two major problems:*
>
> *First — **scalability**. What if we have 10,000 orders? We cannot load all 10,000 records at once. It would be extremely slow.*
>
> *Second — **data management**. If a new order comes in, someone has to manually update the HTML. That's not practical.*
>
> *That's where the backend comes in. The backend:*
> - *Connects to a **MySQL database** where data is stored*
> - *Handles **client requests** — 'give me page 1', 'give me page 2'*
> - *Applies **business logic** — validating that limit and offset are proper numbers*
> - *Returns only the **requested slice of data***
>
> *This is the core engine of any real-world application."*

### 🖥️ [Show in browser]
- `?limit=4&offset=0` → Page 1
- `?limit=4&offset=4` → Page 2
- `?limit=4&offset=8` → Page 3
- Say: *"See — same API, different pages of data."*

---

## 🎙️ SEGMENT 3 — Backend Architecture (2 minutes)

### 🖥️ Show on screen: VS Code Explorer — project folder structure

### 📢 Say exactly this:

> *"Let me walk you through the project architecture.*
>
> *Looking at the folder structure:"*

### 🖥️ [Show in VS Code Explorer]
```
zomato-orders/
├── src/
│   ├── index.js          ← Main server file
│   ├── connector.js      ← Database connection
│   ├── createDatabase.js ← Database seeder
│   └── data.js           ← Seed data
├── .env                  ← Environment variables
├── vercel.json           ← Deployment config
└── package.json          ← Dependencies
```

> *"My project follows the **separation of concerns** principle:*
>
> ***`connector.js`** — handles only the database connection. It reads credentials from environment variables and creates a MySQL connection.*
>
> ***`index.js`** — this is the main Express server. It defines the API routes, applies validation logic, queries the database, and sends back the response.*
>
> ***`createDatabase.js`** — this is a one-time setup script that creates the orders table and seeds it with 12 records.*
>
> ***`data.js`** — contains the seed data — 12 order records.*
>
> ***`vercel.json`** — tells Vercel how to deploy the Node.js server.*
>
> *The server starts on **port 8080** and exports the app for testing purposes.*
>
> *This is clean, modular architecture — each file has one responsibility."*

### 🖥️ [Open `src/connector.js`]
- Point to env vars: `process.env.DB_HOST`, `process.env.DB_USER`

---

## 🎙️ SEGMENT 4 — API Design & Core Endpoints (2.5 minutes)

### 🖥️ Show on screen: `src/index.js` in VS Code

### 📢 Say exactly this:

> *"Now let me explain the API design.*
>
> *I've built two endpoints following **REST principles**:*
>
> **Endpoint 1:** `GET /`
> - *This is the health check endpoint*
> - *It returns a simple message confirming the server is running*
>
> **Endpoint 2:** `GET /api/orders`
> - *This is the core endpoint — it returns paginated orders*
> - *It accepts two optional query parameters:*
>   - ***limit*** — how many records to return per page*
>   - ***offset*** — how many records to skip*

### 🖥️ [Open browser — show these URLs one by one]

> *"Let me demonstrate the request-response flow:*
>
> *When I call `GET /api/orders` with no parameters — the server uses defaults: limit=10, offset=0. It returns the first 10 orders.*"

- Show: `https://zomato-orders-omega.vercel.app/api/orders`

> *"When I add `?limit=4&offset=1` — the server skips 1 record and returns the next 4.*"

- Show: `https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=1`

> *"This is how **pagination** works in real applications — the same pattern used by Twitter, Instagram, Amazon.*
>
> *Each response follows a consistent JSON structure — an array of objects with exactly 3 fields: `_id`, `title`, and `description`.*
>
> *I used `GET` method because we are only **reading data** — this follows REST principles where GET = read, POST = create, PUT = update, DELETE = remove."*

---

## 🎙️ SEGMENT 5 — Database Design & Data Flow (2 minutes)

### 🖥️ Show on screen: `src/connector.js` then `src/createDatabase.js`

### 📢 Say exactly this:

> *"Let me now explain the database design and data flow.*
>
> *I'm using **MySQL** — a relational database. Here's the table schema:*"

### 🖥️ [Show createDatabase.js — highlight the CREATE TABLE line]
```sql
CREATE TABLE orders(
  _id         varchar(200),
  title       varchar(100),
  description varchar(1000)
)
```

> *"Three columns:*
> - ***_id*** — a UUID — a universally unique identifier — varchar(200)*
> - ***title*** — the product name — varchar(100)*
> - ***description*** — detailed text — varchar(1000)*
>
> *Now let me trace the **data flow** for a request:*
>
> 1. ***Client sends*** `GET /api/orders?limit=4&offset=1`*
> 2. ***Express receives*** the request in `index.js`*
> 3. ***Validation runs*** — checks if limit and offset are valid positive integers*
> 4. ***SQL query executes*** — `SELECT * FROM orders LIMIT 4 OFFSET 1`*
> 5. ***MySQL returns*** 4 matching records*
> 6. ***Express sends*** `200 OK` with JSON array back to client*
>
> *I chose **MySQL** because the data is structured and relational — it has a fixed schema with defined fields, and SQL is perfect for LIMIT/OFFSET pagination which is a core requirement of this project."*

---

## 🎙️ SEGMENT 6 — Validation, Security & Error Handling (2 minutes)

### 🖥️ Show on screen: `src/index.js` — highlight the validation functions

### 📢 Say exactly this:

> *"This is one of the most important parts of any backend — making it reliable and secure.*
>
> *Let me show you the validation logic in `index.js`."*

### 🖥️ [Highlight the `isDigitOnly`, `isValidLimit`, `isValidOffset` functions]

> *"I've written three helper functions:*
>
> ***`isDigitOnly(value)`** — this checks if a value contains ONLY digits — no dots, no letters, no minus signs. So '5' is valid, but '5.5', '-5', 'abc' are all invalid.*
>
> ***`isValidLimit(value)`** — limit must pass `isDigitOnly` AND must be greater than zero. So '0' is also invalid.*
>
> ***`isValidOffset(value)`** — offset must pass `isDigitOnly`. '0' is valid for offset because you can start from the beginning.*
>
> *When invalid values are passed, the API **silently falls back to defaults** — limit=10, offset=0 — and still returns HTTP 200. This is important — we never crash or return an error for invalid parameters.*

### 🖥️ [Show in browser]
- `?limit=abc` → *"Returns 10 records — default applied"*
- `?limit=-5` → *"Returns 10 records — negative rejected"*
- `?limit=2.5` → *"Returns 10 records — decimal rejected"*

> *"For **security**, I use:*
> - ***Environment variables*** in `.env` file — database credentials are never hardcoded*
> - ***`.gitignore`*** — the `.env` file is never pushed to GitHub*
> - ***Input validation*** — prevents SQL injection by using parameterized queries with `?` placeholders*
>
> *For **error handling** — if the database query fails, the server returns `500 Internal Server Error` with a clear message, and logs the error to console for debugging."*

---

## 🎙️ SEGMENT 7 — Testing, Logging & Deployment (1.5 minutes)

### 🖥️ Show on screen: Postman → Collection Runner results

### 📢 Say exactly this:

> *"Let me show you how I tested and deployed this API.*
>
> **Testing:**
> *I used **Postman** with a complete test collection — 42 API requests with 90 automated assertions covering:*
> - *Happy path tests*
> - *Invalid input tests*
> - *Response structure validation*
> - *Data integrity checks*
> - *Business logic verification*

### 🖥️ [Show Postman collection runner — all green ticks OR show the Newman terminal output]

> *"All 90 assertions pass — zero failures.*
>
> *I also created a **Regression Test Scenarios CSV** with 56 documented test cases for the Business and QA teams.*
>
> **Logging:**
> *The server logs connection status and query errors to the console — so developers can debug issues quickly.*
>
> **Deployment:**
> *The API is deployed on **Vercel** — a cloud platform for serverless deployments.*
> - *Code is pushed to **GitHub***
> - *Vercel automatically pulls from GitHub and deploys*
> - *The live URL is: `https://zomato-orders-omega.vercel.app`*"

### 🖥️ [Show GitHub repo — `github.com/deoreneha23122024/zomato-orders`]

> *"The repository has the full source code, README documentation, walkthrough guide, and the Postman collection — everything needed to run and test this project."*

---

## 🎙️ SEGMENT 8 — Challenges, Optimization & Improvements (1.5 minutes)

### 🖥️ Show on screen: `src/index.js` — validation code

### 📢 Say exactly this:

> **Challenges:**
> *"The main challenge I faced was the **validation logic**. The requirement was strict — only pure digit strings should be valid. So I had to make sure that floats like '2.5', negative numbers like '-5', and alphanumeric values like '4abc' all fail validation and fall back to defaults.*
>
> *I solved this using a **regular expression** — `/^\d+$/` — which ensures the string contains only digits from start to finish.*
>
> *Another challenge was **cloud MySQL connectivity**. Since Vercel is a serverless environment, it cannot connect to a local MySQL. I solved this by implementing an **in-memory fallback** — when MySQL is not available, the API serves data from the seed array directly, so the live URL always works.*"

> **Optimizations:**
> *"I used **parameterized queries** — `LIMIT ? OFFSET ?` — instead of string concatenation, which both prevents SQL injection and improves performance.*
>
> *I also kept the server **stateless** — it doesn't store session data — which makes it horizontally scalable."*

> **Future Improvements:**
> *"If I were to extend this project:*
> 1. ***Authentication** — JWT tokens to protect the API endpoints*
> 2. ***Search & Filtering** — allow searching orders by title*
> 3. ***Caching** — use Redis to cache frequent queries*
> 4. ***Rate Limiting** — prevent API abuse*
> 5. ***Microservices** — split into separate order, user, and payment services"*

---

## 🎤 FOLLOW-UP INTERVIEW Q&A (Keep ready!)

---

### Q1: How would you design this backend for millions of users?

> *"I would implement:*
> - ***Horizontal scaling** — deploy multiple server instances behind a load balancer*
> - ***Database read replicas** — separate read and write databases*
> - ***Redis caching** — cache popular paginated results*
> - ***CDN** — for static assets*
> - ***Connection pooling** — reuse database connections instead of creating new ones for every request*
> - ***Message queues** like RabbitMQ for async operations"*

---

### Q2: Why did you choose MySQL for this project?

> *"The data has a **fixed, well-defined schema** — every order has exactly the same 3 fields. SQL is perfect for this because:*
> 1. *It supports `LIMIT` and `OFFSET` natively — which is exactly what pagination needs*
> 2. *It enforces **data integrity** through schema constraints*
> 3. *It's the **project requirement** — the boilerplate was built for MySQL*
>
> *If the data were more flexible or document-based, I would consider MongoDB instead."*

---

### Q3: How would you secure this API in production?

> *"I would add:*
> 1. ***JWT Authentication** — every request must include a valid token in the Authorization header*
> 2. ***HTTPS only** — encrypt all traffic*
> 3. ***Rate limiting** — using `express-rate-limit` to prevent brute force attacks*
> 4. ***Helmet.js** — sets secure HTTP headers automatically*
> 5. ***Input sanitization** — already done via parameterized queries*
> 6. ***Environment variables** — already done — credentials never in code"*

---

### Q4: How do you handle concurrent requests and data consistency?

> *"MySQL handles concurrent reads very well. For the current READ-ONLY API:*
> - *Multiple users can call `GET /api/orders` simultaneously without any conflict*
> - *MySQL uses **shared locks** for SELECT queries — no blocking*
>
> *If we had write operations like POST or UPDATE:*
> - *I would use **database transactions** to ensure atomicity*
> - *MySQL's **ACID properties** ensure consistency*
> - *For high concurrency writes, I would use a **connection pool** like `mysql2` with pool settings"*

---

### Q5: How would you convert this into microservices?

> *"Currently this is a **monolithic** API. To convert to microservices:*
>
> 1. ***Orders Service** — handles `GET /api/orders` — exactly what we have now*
> 2. ***User Service** — handles authentication and user profiles*
> 3. ***Payment Service** — handles billing and transactions*
> 4. ***Notification Service** — handles emails and SMS*
>
> *Each service would:*
> - *Have its own database*
> - *Communicate via REST API or message queues like RabbitMQ*
> - *Be deployed independently on Vercel or Docker containers*
> - *Have its own GitHub repo and CI/CD pipeline"*

---

## 📋 Before You Start Recording — Checklist

- [ ] Browser open at `https://zomato-orders-omega.vercel.app/api/orders`
- [ ] VS Code open with `zomato-orders` project
- [ ] Postman open with collection imported + all tests green
- [ ] GitHub open at `github.com/deoreneha23122024/zomato-orders`
- [ ] Loom recording started
- [ ] Speak clearly and confidently
- [ ] Point your mouse to what you're explaining

## ⏱️ Time Guide

| Segment | Time |
|---------|------|
| 1. Introduction | 0:00 – 1:30 |
| 2. Problem Understanding | 1:30 – 3:30 |
| 3. Architecture | 3:30 – 5:30 |
| 4. API Design | 5:30 – 8:00 |
| 5. Database Design | 8:00 – 10:00 |
| 6. Validation & Security | 10:00 – 12:00 |
| 7. Testing & Deployment | 12:00 – 13:30 |
| 8. Challenges & Improvements | 13:30 – 15:00 |
