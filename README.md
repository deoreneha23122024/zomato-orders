# 🍕 Zomato Orders — Paginated REST API

A production-ready **Node.js + Express** REST API that serves paginated restaurant order records from a **MySQL** database. Built as a Capstone project to demonstrate backend development skills including REST design, SQL pagination, input validation, and deployment.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Reference](#api-reference)
  - [GET /api/orders](#get-apiorders)
  - [Validation Rules](#validation-rules)
  - [Sample Responses](#sample-responses)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Pagination Deep-Dive](#pagination-deep-dive)
- [Future Improvements](#future-improvements)

---

## Overview

Restaurants generate thousands of orders daily. When operating a chain of restaurants, the database must be robust and efficient. Fetching all orders at once is impractical — **pagination** solves this by letting the client request a specific window (page) of records.

This API exposes one endpoint — `GET /api/orders` — that accepts `limit` and `offset` query parameters and returns the corresponding slice of records from the MySQL `orders` table.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (v14+) |
| Framework | Express 4 |
| Database | MySQL 5.7 / 8 |
| ORM / Driver | `mysql` npm package |
| Body Parsing | `body-parser` |
| Config | `dotenv` |
| Testing | Mocha + Chai + Chai-HTTP + Sinon |
| Test Reporter | Mochawesome |

---

## Project Structure

```
zomato-orders/
├── src/
│   ├── index.js          # Express app + GET /api/orders endpoint
│   ├── connector.js      # MySQL connection factory (env-var driven)
│   ├── createDatabase.js # One-time DB seed script
│   └── data.js           # Seed data (12 restaurant order records)
├── __tests__/            # Mocha test suite
├── .env.example          # Environment variable template
├── .gitignore
├── package.json
├── vercel.json           # Vercel serverless deployment config
├── WALKTHROUGH.md        # Video presentation script
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v14 or higher — [Download](https://nodejs.org/)
- **MySQL** 5.7 or 8 running locally — [Download](https://dev.mysql.com/downloads/)
- **Git** — [Download](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/zomato-orders.git
cd zomato-orders

# 2. Install dependencies
npm install
```

### Database Setup

```bash
# 1. Copy the environment template and fill in your MySQL credentials
cp .env.example .env
# Edit .env with your actual DB_HOST, DB_USER, DB_PASSWORD

# 2. Run the seed script — creates the `orders` table and inserts 12 sample records
npm run db:setup
```

Expected output:
```
Connection established with Database!
```

### Running the Server

```bash
# Production
npm start

# Development (auto-restart on changes — requires nodemon)
npm run dev
```

Server starts on **http://localhost:8080** (or the `PORT` env variable).

---

## API Reference

### `GET /api/orders`

Returns a paginated list of restaurant orders.

**URL:** `http://localhost:8080/api/orders`

**Method:** `GET`

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | positive integer | `10` | Number of records to return |
| `offset` | non-negative integer | `0` | Number of records to skip |

#### Validation Rules

| Condition | Behaviour |
|-----------|-----------|
| No params provided | Use defaults: `limit=10`, `offset=0` |
| `limit` is a positive integer string (e.g. `"4"`) | Use the provided value |
| `offset` is a non-negative integer string (e.g. `"0"`, `"3"`) | Use the provided value |
| `limit` or `offset` is a float (e.g. `"2.5"`) | **Fall back to default** |
| `limit` or `offset` is a string (e.g. `"abc"`) | **Fall back to default** |
| `limit` or `offset` is negative (e.g. `"-1"`) | **Fall back to default** |
| `limit` is `0` | **Fall back to default (10)** |

> **Note:** Invalid values for one parameter do NOT affect the other — each falls back to its own default independently.

#### Sample Responses

**Request:** `GET /api/orders`  
Returns first 10 records (default limit=10, offset=0):

```json
[
  {
    "_id": "d0975326-7b43-479e-a109-cb818abec62d",
    "title": "Chocolate Mousse Torte Cake",
    "description": "Two rich, chocolate cake layers are filled with luscious chocolate whipped cream mousse..."
  },
  ...
]
```

**Request:** `GET /api/orders?limit=4&offset=1`  
Returns 4 records, skipping the first one:

```json
[
  {
    "_id": "ebed34eb-7533-49f5-91cb-37c12f20d4b1",
    "title": "Triple Chocolate Enrobed Brownie Cake",
    "description": "..."
  },
  ...
]
```

**Request:** `GET /api/orders?limit=abc&offset=xyz`  
Invalid values → falls back to defaults → returns first 10 records.

**Status Codes:**

| Code | Meaning |
|------|---------|
| `200` | Success — array of order records returned |
| `500` | Internal server error (DB connection failure) |

---

## Environment Variables

Copy `.env.example` to `.env` and set your values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=test
PORT=8080
```

> **Never commit `.env` to Git.** It is listed in `.gitignore`.

---

## Running Tests

```bash
npm test
```

This runs the Mocha test suite and generates a report in `mochawesome-report/`.

---

## Deployment

### Vercel (Serverless)

> **Note:** MySQL is a persistent connection database — for production Vercel deployments, use a cloud MySQL service like **PlanetScale**, **Railway**, or **AWS RDS**, and set the environment variables in the Vercel project dashboard.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables on Vercel
vercel env add DB_HOST
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
```

The `vercel.json` file routes all requests to the Express app.

---

## Pagination Deep-Dive

SQL pagination uses two clauses:

```sql
SELECT * FROM orders LIMIT 4 OFFSET 1;
--                   ^^^^^^ ^^^^^^^^
--                   |      └─ Skip the first 1 record
--                   └─ Return at most 4 records
```

| Page | limit | offset | Records returned |
|------|-------|--------|-----------------|
| 1 | 4 | 0 | Records 1–4 |
| 2 | 4 | 4 | Records 5–8 |
| 3 | 4 | 8 | Records 9–12 |

**Why validate strictly?**  
Passing `LIMIT 'abc'` to MySQL would cause a query error. We validate before querying so we always provide safe, integer values.

---

## Future Improvements

- [ ] **Authentication** — JWT-based API keys to protect endpoints
- [ ] **Total count header** — `X-Total-Count` response header for frontend pagination UI
- [ ] **Sorting** — `?sort=title&order=asc` query params
- [ ] **Filtering** — `?search=chocolate` for title search
- [ ] **Connection pooling** — use `mysql.createPool()` for production concurrency
- [ ] **Rate limiting** — `express-rate-limit` middleware
- [ ] **Caching** — Redis cache for frequently requested pages
- [ ] **Containerisation** — Dockerfile + docker-compose for local dev

---

## License

ISC © Capstone Project
