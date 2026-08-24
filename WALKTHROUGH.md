# 🎬 Video Walkthrough Script — Zomato Orders API
## Capstone Project Presentation (~15 minutes)

---

> **Tip for recording:** Use Loom, OBS, or any screen recorder. Open the project in VS Code and Postman side-by-side. Keep your terminal ready with the server running.

---

## Segment 1 — Introduction (1.5 min)

**[Show: project folder open in VS Code]**

---

**Script:**

> "Hello everyone. In this walkthrough I'll be presenting my Capstone project — the *Zomato Orders Pagination API*.

> This is a **backend REST API** built with **Node.js and Express**, connected to a **MySQL database**. It solves a very real problem that every food-delivery platform like Zomato faces: how do you efficiently serve thousands of order records to a client without overloading the database or the network?

> The answer is **pagination** — returning a controlled window of records at a time using SQL's LIMIT and OFFSET clauses.

> The tech stack is:
> - **Runtime:** Node.js
> - **Framework:** Express 4
> - **Database:** MySQL (via the `mysql` npm package)
> - **Config:** dotenv for environment variables
> - **Testing:** Mocha + Chai + Chai-HTTP

> This API is consumed by any frontend — a restaurant dashboard, a mobile app, or an admin panel — that needs to display orders page by page."

---

## Segment 2 — Problem Understanding (2 min)

**[Show: data.js in VS Code — scroll through the 12 records]**

---

**Script:**

> "Let's understand the problem. A restaurant chain processes hundreds of orders every day. In our database, the `orders` table holds records with three fields: `_id`, `title`, and `description`.

> Imagine if we had 100,000 orders. Running `SELECT * FROM orders` and sending all of them in a single HTTP response would:
> - Overload the database
> - Transfer megabytes of data on every request
> - Crash the browser trying to render all rows at once

> Static or frontend-only solutions cannot fix this — they have no control over the SQL query.

> The backend is the engine that sits between the client and the database. It receives the client's request — including what page they want — translates it into an efficient SQL query with LIMIT and OFFSET, and returns only the records needed.

> This separation of concerns is the core reason we need a backend."

---

## Segment 3 — Backend Architecture (2 min)

**[Show: project folder structure in VS Code explorer]**

---

**Script:**

> "Let's look at the project structure.

> `src/index.js` — the heart of the server. It sets up Express, registers middleware, and defines our route.

> `src/connector.js` — responsible for establishing the MySQL connection. It reads credentials from environment variables so we never hard-code passwords.

> `src/createDatabase.js` — a one-time setup script that creates the `orders` table and seeds it with 12 sample records.

> `src/data.js` — the seed data, 12 food items from various restaurants.

> The server is intentionally simple — one file, one route, one responsibility. This follows the Single Responsibility Principle and makes the code easy to test and extend.

> Server startup and database connection are decoupled — `connector.js` exports the connection object, so tests can mock it independently."

---

## Segment 4 — API Design & Core Endpoints (2.5 min)

**[Show: src/index.js — scroll through the route handler, then switch to Postman]**

---

**Script:**

> "The API exposes exactly one endpoint:

> `GET http://localhost:8080/api/orders`

> It accepts two optional query parameters:
> - `limit` — how many records to return (default: 10)
> - `offset` — how many records to skip from the start (default: 0)

> Let me show the validation logic — this is the critical part."

**[Highlight the `isValidLimit` and `isValidOffset` functions]**

> "We only accept strings of pure digits — no decimal points, no negative signs, no letters. If the value passes validation, we parse it as an integer and use it in the query. Otherwise we silently fall back to the default.

> Now let me demonstrate in Postman."

**[Switch to Postman]**

> "First, a call with no parameters:
> `GET /api/orders` → returns the first 10 records. Status 200."

**[Run the request, show response]**

> "Now with pagination:
> `GET /api/orders?limit=4&offset=1` → skips 1 record, returns 4. Status 200."

**[Run the request, show response]**

> "Now with invalid values:
> `GET /api/orders?limit=abc&offset=2.5` → both invalid, so both fall back to defaults. Returns 10 records from offset 0."

**[Run the request, show response]**

> "The request-response flow is: Client → Express Route → Validation → MySQL Query → JSON Response."

---

## Segment 5 — Database Design & Data Flow (2 min)

**[Show: createDatabase.js and MySQL Workbench or terminal with `SELECT * FROM orders`]**

---

**Script:**

> "The database has a single table called `orders` with three columns:
> - `_id` — a UUID (varchar 200), the primary identifier
> - `title` — the order/product name (varchar 100)
> - `description` — a detailed description (varchar 1000)

> I chose MySQL (relational/SQL) because:
> - The schema is fixed and well-defined
> - SQL's LIMIT/OFFSET is natively supported and extremely efficient
> - It matches the project's evaluation requirement

> The data flow on every request is:
> 1. HTTP GET request arrives at Express
> 2. Route handler validates query params
> 3. Safe integer values are injected into the parameterized query
> 4. MySQL executes `SELECT * FROM orders LIMIT ? OFFSET ?`
> 5. Results array is returned as JSON with status 200

> We use parameterized queries — passing limit and offset as array values — which prevents SQL injection."

---

## Segment 6 — Validation, Security & Error Handling (2 min)

**[Show: the validation functions in index.js]**

---

**Script:**

> "Security and reliability were a priority.

> **Input Validation:** The regex `^\d+$` ensures only digit-only strings pass. Floats like `2.5`, negatives like `-1`, and strings like `abc` all fail and trigger the default.

> **Parameterized queries:** We never interpolate user input directly into SQL strings. The `mysql` driver safely escapes the LIMIT and OFFSET values.

> **Environment variables:** Database credentials are stored in a `.env` file, which is listed in `.gitignore`. The `.env.example` file shows what variables are needed without exposing actual passwords.

> **Error handling:** If the database query fails — for example, if MySQL is down — the server catches the error and returns status 500 with a safe error message. We never leak database error details to the client.

> **No over-sharing:** The API returns only the fields stored in the table. No internal IDs, stack traces, or sensitive metadata are exposed."

---

## Segment 7 — Testing, Logging & Deployment (1.5 min)

**[Show: terminal running `npm test`, then Vercel dashboard]**

---

**Script:**

> "Testing is handled by **Mocha** with the **Chai** assertion library and **Chai-HTTP** for HTTP assertions.

> Running `npm test` executes the full test suite and generates an HTML report via Mochawesome.

> For logging, every database connection attempt and query error is logged to the console via `console.log` and `console.error`. In production, this would be replaced with a structured logger like Winston.

> For deployment, I've configured **Vercel** with a `vercel.json` that routes all HTTP requests to the Express app as a serverless function. Database credentials are set as environment variables in the Vercel project dashboard, so they're never in the codebase.

> The project is version-controlled on **GitHub** with a proper `.gitignore` that excludes `node_modules` and `.env`."

---

## Segment 8 — Challenges, Optimizations & Improvements (1.5 min)

**[Show: README.md Future Improvements section]**

---

**Script:**

> "The main challenge was designing the validation logic correctly. The requirement says 'positive integers' — but I had to be precise: should `0` be a valid offset? Yes. Should `0` be a valid limit? No — a limit of zero would return nothing. These edge cases required careful unit testing.

> Another challenge was making the connector environment-variable-driven while keeping backward compatibility with the boilerplate's hard-coded defaults.

> **Optimizations I made:**
> - Parameterized queries prevent SQL injection and are also cached by MySQL's query optimizer
> - Validation happens before the query, saving a DB round-trip on bad input

> **Future improvements I'd add:**
> - **Connection pooling** with `mysql.createPool()` for handling concurrent requests
> - **Redis caching** for the most-requested pages
> - **JWT authentication** to protect the endpoint
> - **`X-Total-Count` header** so the frontend knows the total number of records for building page navigation
> - **Microservices** — this orders service could be independently scaled as order volume grows

> Thank you for watching!"

---

## 📋 Follow-up Interview Q&A Cheat Sheet

| Question | Key Points |
|----------|-----------|
| How would you handle millions of users? | Connection pooling, read replicas, Redis cache, horizontal scaling behind a load balancer |
| Why SQL over NoSQL? | Fixed schema, LIMIT/OFFSET natively supported, ACID compliance for order data |
| How would you secure APIs in production? | JWT auth, HTTPS, rate limiting, helmet.js, parameterized queries, env vars |
| How do you handle concurrent requests? | MySQL connection pool, stateless Express (scales horizontally), async query callbacks |
| How to convert to microservices? | Extract orders service, use message queue (RabbitMQ/Kafka) between services, API gateway for routing |
