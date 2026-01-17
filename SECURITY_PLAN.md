# Security Implementation Plan

## Summary of Changes Needed

### Information Gathered:
- **userRouter.js** - Already has `requireAuth()` on `/me` route ✓
- **userController.js** - Uses `req.auth()` but returns 404 if user not found (needs auto-create)
- **AccountRouter.js** - No auth, accepts userId from params
- **transactionRoute.js** - No auth, accepts accountId from params
- **bugetRouter.js** - No auth, accepts AccountId from params
- **dashboarddata.js** - No auth, accepts userId from params
- **geminiapi.js** - No auth, accepts accountId from body

---

## Plan

### 1. Update userController.js (CHANGE 3)
- Remove user not found error
- Auto-create user if not found with clerkId

### 2. Protect AccountRouter.js (CHANGE 4)
- Import `requireAuth` from "@clerk/express"
- Add `requireAuth()` to all routes
- Update accountController.js to use `req.auth()` instead of userId from body

### 3. Protect transactionRoute.js (CHANGE 4)
- Import `requireAuth` from "@clerk/express"
- Add `requireAuth()` to all routes
- Update transactionController.js to use `req.auth()` instead of userId from body
- Add ownership validation

### 4. Protect bugetRouter.js (CHANGE 4)
- Import `requireAuth` from "@clerk/express"
- Add `requireAuth()` to all routes
- Update budger.controller.js to use `req.auth()` instead of userId from body
- Add ownership validation

### 5. Protect dashboarddata.js (CHANGE 4)
- Import `requireAuth` from "@clerk/express"
- Add `requireAuth()` to route
- Update dashboardcontroller.js to use `req.auth()` instead of userId from params

### 6. Protect geminiapi.js (CHANGE 4)
- Import `requireAuth` from "@clerk/express"
- Add `requireAuth()` to route
- Update aitransaction.controller.js to use `req.auth()` instead of userId from body
- Add ownership validation

### 7. Update Models (Optional but recommended)
- Change userId from String to ObjectId referencing User

 in Account and Transaction---

## Files to Edit:
1. `backend/controller/userController.js`
2. `backend/Router/AccountRouter.js`
3. `backend/controller/accountController.js`
4. `backend/Router/transactionRoute.js`
5. `backend/controller/transactionController.js`
6. `backend/Router/bugetRouter.js`
7. `backend/controller/budger.controller.js`
8. `backend/Router/dashboarddata.js`
9. `backend/controller/dashboardcontroller.js`
10. `backend/Router/geminiapi.js`
11. `backend/controller/aitransaction.controller.js`

---

## Priority:
1. userController.js - Auto-create user if not found
2. All Routers - Add requireAuth middleware
3. All Controllers - Replace userId from client with req.auth()
4. Add ownership validation in all controllers

