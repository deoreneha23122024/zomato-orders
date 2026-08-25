# 🎥 Zomato Orders API — Loom Video Walkthrough Script

**Duration Goal:** ~5 to 7 Minutes  
**Tip:** Have MySQL Workbench, Postman, VS Code, and your Browser open before you start recording.

---

### 1. Introduction (1 min)
*Open your browser showing your GitHub repository.*
"Hello, my name is Neha. For my Capstone project, I built the **Zomato Orders API**, a backend system designed to handle food order pagination and validation. The purpose of this API is to allow frontend panels to fetch large amounts of orders efficiently without crashing the browser. I built this using **Node.js, Express, and a MySQL Database**."

### 2. Problem Understanding (1 min)
*Open your VS Code showing `index.js`.*
"When fetching data, if a user requests 1,000 orders at once, it can crash the system. To solve this, I implemented **Pagination** using `limit` and `offset`. I also implemented strict validation to ensure that if a user sends invalid data—like letters or negative numbers—the API gracefully falls back to default values instead of throwing a 500 server error."

### 3. Setup & Architecture (1 min)
*Show `index.js` and `.env` (hide passwords if needed).*
"My architecture is highly modular. 
- I use `index.js` for routing and validation.
- I use `connector.js` to handle my database connection.
- I use environment variables to keep my credentials secure."

### 4. API Design & Core Endpoints (1.5 min)
*Open Postman showing your Local tests.*
"Let me demonstrate the API running locally on my machine using Postman.
1. First, I'll hit `GET http://localhost:8080/api/orders` with no parameters. As you can see, it defaults to exactly 10 records.
2. Next, I'll test custom pagination: `limit=4` and `offset=1`. The API successfully returns exactly 4 records, starting from the second item.
3. Finally, I will send an invalid limit, like `limit=abc` or `limit=-5`. Instead of crashing, my API catches the invalid input and safely returns the default 10 records."

### 5. Database Design (1 min)
*Open MySQL Workbench.*
"For my database, I am using **MySQL** running locally on my machine. Let me run a quick query to show you the data. 
*(Highlight `SELECT * FROM orders;` and click the lightning bolt ⚡)*. 
As you can see, all 12 of my order records are stored beautifully in a relational table, ready to be queried by my Node.js backend."

### 6. Deployment & Fallback Strategy (1 min)
*Open your browser to your live Vercel URL.*
"I successfully deployed my live API to **Vercel**. However, I encountered a common real-world security issue: free cloud databases block Vercel's IP addresses. 
To engineer around this, I implemented a **Graceful Fallback** in my `index.js` code. If the database connection is blocked in production, my API automatically catches the error and serves the data from my `data.js` seed file. This guarantees that my live production link never crashes and pagination continues to work perfectly."

### 7. Conclusion (30 sec)
"To summarize, I built a resilient API with MySQL, added strict validation, implemented automated Postman testing, and deployed it to Vercel with a smart fallback strategy. Thank you for watching!"
