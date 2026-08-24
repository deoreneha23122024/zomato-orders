# 🧪 Zomato Orders API — Beginner Testing Guide
### Step-by-step for absolute beginners — No coding required!

---

## 🛠️ What You Need (Pick ONE)

| Tool | Cost | Download |
|------|------|----------|
| **Web Browser** (Chrome/Edge) | Free | Already installed |
| **Postman** (Recommended) | Free | [postman.com/downloads](https://www.postman.com/downloads/) |

---

## 🌐 Base URL (Live API)

```
https://zomato-orders-omega.vercel.app
```

---

## 📌 Method 1 — Test in Browser (Easiest)

> Just copy-paste the URL into your browser address bar and press Enter!

**Step 1** → Open Chrome or Edge browser

**Step 2** → Copy any URL from the test table below

**Step 3** → Paste it in the address bar → Press **Enter**

**Step 4** → You'll see a JSON response like this:
```json
[
  {
    "_id": "d0975326-7b43-479e-a109-cb818abec62d",
    "title": "Chocolate Mousse Torte Cake",
    "description": "Two rich, chocolate cake layers..."
  },
  ...
]
```

**Step 5** → Count the records and match with "Expected Count" column ✅

---

## 📌 Method 2 — Test in Postman (Recommended)

**Step 1** → Download and install Postman from [postman.com/downloads](https://www.postman.com/downloads/)

**Step 2** → Open Postman → Click **"New"** → Click **"HTTP Request"**

**Step 3** → Set method to **GET** (it's already GET by default)

**Step 4** → Paste the URL in the address bar

**Step 5** → Click **"Send"** button

**Step 6** → See the response in the bottom panel

**Step 7** → Check Status code is **200 OK** ✅

---

## 🟢 CATEGORY 1 — Happy Path Tests
> These are normal, valid requests — all should return 200 with correct records

| Test ID | URL to Test | Expected Count | What to Check |
|---------|------------|----------------|---------------|
| TC-001 | `https://zomato-orders-omega.vercel.app/api/orders` | **10 records** | First item = "Chocolate Mousse Torte Cake" |
| TC-002 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4` | **4 records** | Exactly 4 items in array |
| TC-003 | `https://zomato-orders-omega.vercel.app/api/orders?offset=2` | **10 records** | Starts from 3rd item |
| TC-004 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=1` | **4 records** | First = "Triple Chocolate Brownie Cake" |
| TC-005 | `https://zomato-orders-omega.vercel.app/api/orders?offset=0` | **10 records** | Same as default |
| TC-006 | `https://zomato-orders-omega.vercel.app/api/orders?limit=1` | **1 record** | Only 1 item |
| TC-007 | `https://zomato-orders-omega.vercel.app/api/orders?limit=100` | **12 records** | All records returned |
| TC-008 | `https://zomato-orders-omega.vercel.app/api/orders?limit=10&offset=11` | **1 record** | Last record only |
| TC-009 | `https://zomato-orders-omega.vercel.app/api/orders?offset=100` | **0 records** | Empty array `[]` |
| TC-010 | `https://zomato-orders-omega.vercel.app/api/orders?limit=12&offset=0` | **12 records** | All 12 records |
| TC-011 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=0` | **4 records** | Page 1 — Records 1-4 |
| TC-012 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=4` | **4 records** | Page 2 — Records 5-8 |
| TC-013 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=8` | **4 records** | Page 3 — Records 9-12 |

---

## 🔴 CATEGORY 2 — Invalid Limit Tests
> When limit is invalid → API **ignores it** and uses default limit=10

| Test ID | URL to Test | Expected Count | Why? |
|---------|------------|----------------|------|
| TC-014 | `https://zomato-orders-omega.vercel.app/api/orders?limit=abc` | **10 records** | "abc" is not a number → default 10 |
| TC-015 | `https://zomato-orders-omega.vercel.app/api/orders?limit=2.5` | **10 records** | Decimal not allowed → default 10 |
| TC-016 | `https://zomato-orders-omega.vercel.app/api/orders?limit=-5` | **10 records** | Negative not allowed → default 10 |
| TC-017 | `https://zomato-orders-omega.vercel.app/api/orders?limit=0` | **10 records** | Zero not allowed → default 10 |
| TC-018 | `https://zomato-orders-omega.vercel.app/api/orders?limit=!@` | **10 records** | Special chars → default 10 |
| TC-019 | `https://zomato-orders-omega.vercel.app/api/orders?limit=` | **10 records** | Empty → default 10 |
| TC-020 | `https://zomato-orders-omega.vercel.app/api/orders?limit=4abc` | **10 records** | Mixed text → default 10 |
| TC-021 | `https://zomato-orders-omega.vercel.app/api/orders?limit=04` | **4 records** | "04" = 4 → valid! |

---

## 🔴 CATEGORY 3 — Invalid Offset Tests
> When offset is invalid → API **ignores it** and uses default offset=0

| Test ID | URL to Test | Expected Count | Why? |
|---------|------------|----------------|------|
| TC-022 | `https://zomato-orders-omega.vercel.app/api/orders?offset=xyz` | **10 records** | Text → default offset=0 |
| TC-023 | `https://zomato-orders-omega.vercel.app/api/orders?offset=1.5` | **10 records** | Decimal → default offset=0 |
| TC-024 | `https://zomato-orders-omega.vercel.app/api/orders?offset=-3` | **10 records** | Negative → default offset=0 |
| TC-025 | `https://zomato-orders-omega.vercel.app/api/orders?offset=!@` | **10 records** | Special chars → default offset=0 |
| TC-026 | `https://zomato-orders-omega.vercel.app/api/orders?offset=` | **10 records** | Empty → default offset=0 |

---

## 🟡 CATEGORY 4 — Both Invalid / Mixed Tests

| Test ID | URL to Test | Expected Count | Why? |
|---------|------------|----------------|------|
| TC-027 | `https://zomato-orders-omega.vercel.app/api/orders?limit=abc&offset=xyz` | **10 records** | Both invalid → both use defaults |
| TC-028 | `https://zomato-orders-omega.vercel.app/api/orders?limit=3.3&offset=1.7` | **10 records** | Both floats → both defaults |
| TC-029 | `https://zomato-orders-omega.vercel.app/api/orders?limit=-1&offset=-2` | **10 records** | Both negative → both defaults |
| TC-030 | `https://zomato-orders-omega.vercel.app/api/orders?limit=5&offset=1.5` | **5 records** | limit=5 valid ✅ offset invalid → offset=0 |
| TC-031 | `https://zomato-orders-omega.vercel.app/api/orders?limit=xyz&offset=3` | **9 records** | limit invalid → limit=10 but only 9 left after offset=3 |

---

## 📦 CATEGORY 5 — Response Structure Tests
> Check the format of each record returned

**URL:** `https://zomato-orders-omega.vercel.app/api/orders?limit=1`

**What to check in the response:**

```json
[
  {
    "_id": "d0975326-7b43-479e-a109-cb818abec62d",   ← TC-032: _id must exist
    "title": "Chocolate Mousse Torte Cake",           ← TC-033: title must exist
    "description": "Two rich, chocolate cake..."      ← TC-034: description must exist
  }
]
```

| Test ID | What to Check | Expected |
|---------|--------------|---------|
| TC-032 | `_id` field exists in every record | ✅ UUID format |
| TC-033 | `title` field exists in every record | ✅ Non-empty text |
| TC-034 | `description` field exists in every record | ✅ Non-empty text |
| TC-035 | Only 3 fields per record (no extras) | ✅ Exactly `_id`, `title`, `description` |
| TC-036 | Empty result is `[]` not `null` | Test: `?offset=9999` → `[]` |
| TC-038 | Invalid params return 200 (not 400/422) | Check status in Postman |

---

## 🗄️ CATEGORY 6 — Data Integrity Tests

| Test ID | URL | What to Check |
|---------|-----|--------------|
| TC-039 | `?limit=6` | Exactly 6 records returned |
| TC-040 | `?limit=1&offset=0` | title = **"Chocolate Mousse Torte Cake"** |
| TC-041 | `?limit=1&offset=1` | title = **"Triple Chocolate Enrobed Brownie Cake"** |
| TC-042 | `?limit=12` | All 12 `_id` values are different (no duplicates) |
| TC-043 | `?limit=6&offset=0` vs `?limit=6&offset=6` | No same `_id` appears in both pages |

---

## 🩺 CATEGORY 7 — Health Check

| Test ID | URL | Expected Response |
|---------|-----|------------------|
| TC-044 | `https://zomato-orders-omega.vercel.app/` | `{"message": "Zomato Orders API is running 🚀"}` |

---

## 💼 CATEGORY 8 — Business Logic

| Test ID | URL | What to Check |
|---------|-----|--------------|
| TC-053 | `?limit=100` | Total = **12 records** (seed data count) |
| TC-055 | `?limit=1&offset=11` | title = **"Gaston's Bakery Croissants"** |
| TC-056 | `?limit=12` | Every `_id` matches pattern: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

---

## ✅ How to Mark Results in Excel

Open [`Regression_Test_Scenarios.csv`](file:///c:/Users/Dell/.gemini/antigravity/playground/axial-armstrong/zomato-orders/Regression_Test_Scenarios.csv) in Excel:

1. For each test, copy-paste URL in browser
2. Count the records in response
3. If count matches → type **PASS** in the `Pass/Fail` column ✅
4. If count doesn't match → type **FAIL** ❌ and note what you got in `Remarks`

---

## 🔑 Key Things to Remember

> [!NOTE]
> Status code is always **200** — even for invalid params. The API never returns 400 or 422.

> [!TIP]
> Install the **JSON Formatter** Chrome extension to make the JSON response readable and coloured in browser.

> [!IMPORTANT]
> **Default values:** When any param is invalid → `limit=10`, `offset=0` are used automatically.

> [!WARNING]
> `TC-031` returns 9 records (not 10) — this is **CORRECT**. Only 9 records exist after skipping 3 (offset=3) from 12 total.

---

## 🚀 Quick 5-Minute Test Checklist

If you only have 5 minutes, test these 5 critical URLs:

```
1. https://zomato-orders-omega.vercel.app/api/orders
   → Must return 10 records ✅

2. https://zomato-orders-omega.vercel.app/api/orders?limit=4&offset=1
   → Must return 4 records ✅

3. https://zomato-orders-omega.vercel.app/api/orders?limit=abc
   → Must return 10 records (default) ✅

4. https://zomato-orders-omega.vercel.app/api/orders?limit=100
   → Must return 12 records (all) ✅

5. https://zomato-orders-omega.vercel.app/api/orders?offset=100
   → Must return 0 records (empty []) ✅
```

All 5 pass = API is working correctly! 🎉
