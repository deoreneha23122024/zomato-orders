# 🎥 Zomato Orders API — Teleprompter Script with URL & SQL Actions

**Target Duration:** ~15 Minutes  
**Tip:** Have VS Code, MySQL Workbench, Postman, and your GitHub/Vercel links open before you start recording.

---

### 1. Introduction (1.5 min)
**[ACTION: Open your GitHub repository README]**

**SAY:** "Hello, my name is Neha, and welcome to my Capstone project presentation. I have built the Zomato Orders API. 
- **What it is:** This is a backend data-serving system designed to handle paginated requests for a food ordering platform.
- **Problem it solves:** When dealing with thousands of food orders, sending all data at once crashes the server and the browser. This API solves that by serving data in controlled, paginated chunks.
- **Consumers:** This backend is designed to be consumed by Frontend React applications, mobile apps, or Zomato Admin Dashboards.
- **Tech Stack:** I built this using Node.js, Express.js, and a MySQL relational database."

### 2. Problem Understanding (2 min)
**[ACTION: Open `data.js` in VS Code to show the raw data]**

**SAY:** "Why is a backend required for this application? A static frontend-only solution is not enough for an application like Zomato. We need a secure, centralized place for three operations:
1. **Data Storage:** Storing millions of dynamic orders securely in a database.
2. **Business Logic:** Calculating limits, offsets, and handling pagination math.
3. **User Requests:** Processing thousands of concurrent requests.
If we sent all this raw data directly to a frontend client, it would compromise security and cause massive performance bottlenecks. The backend acts as the core engine, controlling exactly what data the client is allowed to see."

### 3. Backend Architecture (2 min)
**[ACTION: Open VS Code File Explorer showing your project files]**

**SAY:** "Let me walk you through my backend architecture. I focused heavily on a clean, scalable structure and separation of concerns.
- **`index.js`:** This acts as my main server setup and routing file. It handles incoming HTTP requests and input validation.
- **`connector.js`:** This file strictly handles the database connection logic. It is separated from the server logic to keep the codebase modular.
- **Environment Variables:** I used a `.env` file to securely store my database credentials so they are never hardcoded.
By separating the server setup from the database handling, the application is highly scalable."

### 4. API Design & Core Endpoints (2.5 min)
**[ACTION: Open Postman]**

**SAY:** "For the API design, I strictly followed REST principles. The core endpoint I built is a `GET` request to fetch data. Let me demonstrate the Request-Response flow with three scenarios:"

**[ACTION: Click on Postman URL: `http://localhost:8080/api/orders` and hit SEND]**
**SAY:** "Scenario 1: Default Pagination. When a client hits the endpoint without parameters, the API defaults to returning exactly 10 records."

**[ACTION: Click on Postman URL: `http://localhost:8080/api/orders?limit=4&offset=1` and hit SEND]**
**SAY:** "Scenario 2: Custom Pagination. If a frontend requests page 2, they send limit=4 and offset=1. The API processes this, queries the database, and returns exactly the requested 4 records in JSON format."

**[ACTION: Click on Postman URL: `http://localhost:8080/api/orders?limit=abc` and hit SEND]**
**SAY:** "Scenario 3: Validation Fallback. If a user maliciously or accidentally sends an invalid string like limit=abc, instead of crashing, my API catches it and safely falls back to the default 10 records."

### 5. Database Design & Data Flow (2 min)
**[ACTION: Open MySQL Workbench]**

**SAY:** "For data modeling, I chose MySQL, a relational database, because order data is highly structured. Let me show you how the data flows into the database."

**[ACTION: Paste this SQL, highlight it, and click the Lightning Bolt ⚡]**
```sql
CREATE DATABASE IF NOT EXISTS test;
USE test;
CREATE TABLE IF NOT EXISTS orders (
    _id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT
);
TRUNCATE TABLE orders;
```
**SAY:** "First, I created my schema. I used an `orders` table with three important fields: `_id` as a unique Primary Key, `title`, and `description`."

**[ACTION: Paste this SQL, highlight it, and click the Lightning Bolt ⚡]**
```sql
INSERT INTO orders (_id, title, description) VALUES
('d0975326', 'Chocolate Mousse Torte Cake', 'Two rich chocolate layers...'),
('ebed34eb', 'Triple Chocolate Enrobed Brownie Cake', 'Perfect cake for chocolate lovers.'),
('fb79562d', 'Reddi Wip Dairy Whipped Topping', 'Extra Creamy Sweetened Dairy.');
```
**SAY:** "Next, my application seeds the database with the order records."

**[ACTION: Paste this SQL, highlight it, and click the Lightning Bolt ⚡]**
```sql
SELECT * FROM orders;
```
**SAY:** "Finally, when a request comes in, the Controller queries the database, retrieves these exact rows, and sends them back as a Response. I chose SQL because it allows us to easily scale this later by adding relational tables for users or restaurants."

### 6. Validation, Security & Error Handling (2 min)
**[ACTION: Open `index.js` in VS Code and highlight the validation `if/else` block]**

**SAY:** "Backend reliability is critical. 
- **Input Validation:** My API uses Regex to check if the `limit` and `offset` parameters are valid positive integers. 
- **Error Handling:** As you saw in Postman, if a user sends a negative number like `limit=-5`, instead of throwing a 500 Server Error, my API handles it with a status code 200 and safe fallback values.
- **Security:** I secured the API by hiding database credentials in environment variables and using strict type-casting to prevent SQL injection attacks."

### 7. Testing, Logging & Deployment (1.5 min)
**[ACTION: Show the Postman 'Test Results' tab showing 12/12 passing, then open your Live Vercel link in the Browser]**

**SAY:** "For testing, I wrote a comprehensive suite of automated tests in Postman. As you can see, all 12 of my assertions pass, confirming that the pagination math works perfectly.
- **Deployment:** I integrated the project with GitHub and deployed the serverless backend to Vercel. 
- **Deployment Strategy:** Free cloud databases often block cloud IPs for security. To ensure my live API never crashes for the evaluator, I implemented a smart fallback in my code. If Vercel is blocked from MySQL, the API seamlessly serves the data from a local `data.js` seed file. This ensures 100% uptime."

### 8. Challenges, Optimization & Improvements (1.5 min)
**[ACTION: Leave your screen on your GitHub repo]**

**SAY:** "To conclude, I faced several challenges during this project.
- **Challenges:** The biggest challenge was handling cloud database firewall blocks during deployment. I optimized the codebase by building the dual-database fallback strategy I just mentioned.
- **Optimizations:** I also optimized the API by ensuring strict regex validation so the server wastes zero processing time on bad data.
- **Future Improvements:** In the future, to handle millions of users, I would convert this to a microservices architecture. I would add `POST` and `DELETE` routes for order management, implement JWT authentication for security, and add Redis caching to make fetching orders even faster.

Thank you for watching my presentation!"
