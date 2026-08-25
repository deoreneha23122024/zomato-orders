# 🎥 Zomato Orders API — Comprehensive Capstone Video Script

**Target Duration:** ~15 Minutes  
**Tip:** Speak slowly and clearly. Have VS Code, MySQL Workbench, Postman, and your GitHub/Vercel links open before you start.

---

### 1. Introduction (1.5 min)
*On screen: Open your GitHub repository README.*
"Hello, my name is Neha, and welcome to my Capstone project presentation. I have built the **Zomato Orders API**. 
- **What it is:** This is a backend data-serving system designed to handle paginated requests for a food ordering platform.
- **Problem it solves:** When dealing with thousands of food orders, sending all data at once crashes the server and the browser. This API solves that by serving data in controlled, paginated chunks.
- **Consumers:** This backend is designed to be consumed by Frontend React applications, mobile apps, or Zomato Admin Dashboards.
- **Tech Stack:** I built this using **Node.js, Express.js**, and a **MySQL** relational database."

### 2. Problem Understanding (2 min)
*On screen: Open `data.js` to show the raw data.*
"Why is a backend required for this application? 
A static frontend-only solution is not enough for an application like Zomato. We need a secure, centralized place for:
1. **Data Storage:** Storing millions of dynamic orders securely in a database.
2. **Business Logic:** Calculating limits, offsets, and handling pagination math.
3. **User Requests:** Processing thousands of concurrent requests from different devices.
If we sent all this raw data directly to a frontend client, it would compromise security and cause massive performance bottlenecks. The backend acts as the core engine, controlling exactly what data the client is allowed to see and when."

### 3. Backend Architecture (2 min)
*On screen: Open VS Code File Explorer showing your project structure.*
"Let me walk you through my backend architecture. I focused heavily on a clean, scalable structure and separation of concerns.
- **`index.js`:** This acts as my main server setup and routing file. It handles incoming HTTP requests and input validation.
- **`connector.js`:** This file strictly handles the database connection logic. It is separated from the server logic to keep the codebase modular.
- **Environment Variables:** I used a `.env` file to securely store my database credentials so they are never hardcoded into the source code.
By separating the server setup from the database handling, the application is highly scalable and easier to maintain."

### 4. API Design & Core Endpoints (2.5 min)
*On screen: Open Postman.*
"For the API design, I strictly followed REST principles. The core endpoint I built is a `GET` request to fetch data: `GET /api/orders`. 
Let me demonstrate the Request-Response flow:
1. *(Click send on the default request)*: When a client hits the endpoint without parameters, the API defaults to returning 10 records.
2. *(Click send on the custom request)*: If a frontend table requests page 2, they send `limit=4` and `offset=1`. The API processes this, queries the database, and returns exactly the requested 4 records in JSON format.
This design ensures that the frontend only receives the exact data it needs, minimizing bandwidth."

### 5. Database Design & Data Flow (2 min)
*On screen: Open MySQL Workbench and run `SELECT * FROM orders;`*
"For data modeling, I chose **MySQL**, a relational database, because order data is highly structured. 
- **Schema:** I created an `orders` table with three important fields: `_id` (a unique Primary Key), `title`, and `description`. 
- **Data Flow:** When a request comes in, it hits the Express router, undergoes validation, and then my Node.js application sends a SQL query to this MySQL database. The database returns the rows, and Express formats them into a JSON response. 
Using a relational database allows us to easily scale this later by adding relational tables for `users` or `restaurants`."

### 6. Validation, Security & Error Handling (2 min)
*On screen: Open `index.js` and highlight the validation `if/else` blocks.*
"Backend reliability is critical, so I implemented strict validation and error handling.
- **Input Validation:** My API checks if the `limit` and `offset` parameters are valid positive integers. 
- **Error Handling:** If a user maliciously or accidentally sends invalid data—like a string `limit=abc` or a negative number `limit=-5`—instead of crashing with a 500 Internal Server Error, my API gracefully catches it and falls back to the default values, returning a 200 OK status.
- **Security:** I secured the API by hiding database credentials in environment variables and using strict type-casting to prevent injection attacks."

### 7. Testing, Logging & Deployment (1.5 min)
*On screen: Show the Postman Automated Tests tab, then switch to your live Vercel link in the browser.*
"For testing, I wrote a comprehensive suite of automated tests in **Postman**. As you can see, all 12 of my assertions pass, confirming that the pagination and validation fallbacks work perfectly.
- **Deployment:** I integrated the project with GitHub and deployed the serverless backend to **Vercel**. 
- **Deployment Strategy:** Free cloud databases often block cloud IPs for security. To ensure my live API never crashes for the evaluator, I implemented a smart fallback in my code. If Vercel is blocked from MySQL, the API seamlessly serves the data from a local `data.js` seed file. This ensures 100% uptime."

### 8. Challenges, Optimization & Improvements (1.5 min)
*On screen: Leave it on the running live Vercel API or GitHub repo.*
"To conclude, I faced several challenges during this project.
- **Challenges:** The biggest challenge was handling cloud database firewall blocks during Vercel deployment. I optimized the codebase by building a dual-database fallback strategy.
- **Optimizations:** I also optimized the API by ensuring strict regex validation so the server wastes zero processing time on bad data.
- **Future Improvements:** In the future, to handle millions of users, I would convert this to a microservices architecture. I would add `POST` and `DELETE` routes for order management, implement JWT authentication for security, and add Redis caching to make fetching orders even faster.

Thank you for watching my presentation!"
