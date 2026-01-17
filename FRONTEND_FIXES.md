# Frontend API Fixes Plan

## Issues Found:

### 1. Dashboarddataslice/index.js
- Still uses: `/api/data/getdata/${userId}`
- Should be: `/api/data/getdata`
- No params needed (auth provides userId)

### 2. Account-Slice/index.js
- `fetchallAccount({ UserId })` - passes userId in params
- `createAccount(formData)` - includes userId in formData
- Should use: no userId needed (auth provides it)

### 3. Transaction-Slice/index.js
- `createTransaction` - sends `userId` in formData
- Should not send `userId` (auth provides it)

### 4. Budget-Slice/index.js
- `createBudget` - sends `AccountId` and `userId` in formData
- Should only send `AccountId` (auth provides userId)

### 5. Dashboard.jsx
- Calls `dispatch(fetchallAccount({ UserId: res.data.user._id }))`
- Should call without userId

### 6. AddTransactionForm.jsx
- Sends `userId: backendUser._id` in dataToSend
- Should not send `userId`

### 7. Account Model Issue
- `userId` is String but we store `user._id` (ObjectId)
- Should be mongoose.Schema.Types.ObjectId referencing User

---

## Files to Fix:

1. `frontend/src/Store/Dashboarddataslice/index.js`
2. `frontend/src/Store/Account-Slice/index.js`
3. `frontend/src/Store/Transaction-Slice/index.js`
4. `frontend/src/Store/Budget-Slice/index.js`
5. `frontend/src/components/Dashboard.jsx`
6. `frontend/src/pages/Transaction/AddTransactionForm.jsx`
7. `backend/models/Account.js` - Fix userId type
8. `backend/models/transaction.js` - Fix userId type (optional)

