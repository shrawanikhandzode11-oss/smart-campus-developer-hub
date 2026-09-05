# Smart Campus Management Platform – Backend API Documentation

## Week 3 Backend Development

### Base URL

```text
http://localhost:5000
```

---

# 1. Create User

### Endpoint

```text
POST /api/users
```

### Full URL

```text
http://localhost:5000/api/users
```

### Request Body

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Success Response

**Status:** `201 Created`

### Validation

* Name is required
* Email is required
* Password is required
* Email must be in a valid format
* Password must contain at least 6 characters
* Email must not already exist
* Password is hashed using bcrypt before storing it in the database

---

# 2. Login User

### Endpoint

```text
POST /api/users/login
```

### Full URL

```text
http://localhost:5000/api/users/login
```

### Request Body

```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Success Response

**Status:** `200 OK`

### Response

The API returns:

* Login success message
* JWT token
* User ID
* User name
* User email

### Validation

* Email is required
* Password is required
* User must exist
* Password must match the stored hashed password

---

# 3. Get All Users

### Endpoint

```text
GET /api/users
```

### Full URL

```text
http://localhost:5000/api/users
```

### Authentication

🔐 JWT Token Required

### Authorization Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Success Response

**Status:** `200 OK`

### Without Token

**Status:** `401 Unauthorized`

---

# 4. Get User by ID

### Endpoint

```text
GET /api/users/:id
```

### Example

```text
http://localhost:5000/api/users/2
```

### Success Response

**Status:** `200 OK`

### Validation

* User ID must be a valid number
* Invalid ID returns `400 Bad Request`
* If the user does not exist, the API returns `404 Not Found`

---

# 5. Update User

### Endpoint

```text
PUT /api/users/:id
```

### Example

```text
http://localhost:5000/api/users/2
```

### Authentication

🔐 JWT Token Required

### Authorization Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Request Body

```json
{
  "name": "Updated User",
  "email": "updateduser@example.com"
}
```

### Success Response

**Status:** `200 OK`

### Validation

* User ID must be valid
* Name is required
* Email is required
* Email must be valid
* Email cannot already belong to another user
* JWT token is required

---

# 6. Delete User

### Endpoint

```text
DELETE /api/users/:id
```

### Example

```text
http://localhost:5000/api/users/3
```

### Authentication

🔐 JWT Token Required

### Authorization Header

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Success Response

**Status:** `200 OK`

### Validation

* User ID must be valid
* JWT token is required

---

# Authentication and Security

## Password Hashing

Passwords are hashed using **bcrypt** before being stored in the PostgreSQL database.

```text
User Password
      ↓
bcrypt Hashing
      ↓
Hashed Password Stored in Database
```

---

## JWT Authentication

After successful login, the server generates a JWT token.

```text
User Login
     ↓
Verify Email and Password
     ↓
Generate JWT Token
     ↓
User Receives Token
     ↓
Token Sent with Protected Requests
```

Protected APIs verify the token using authentication middleware.

---

# Input Validation

The backend performs validation for:

* Empty registration fields
* Empty login fields
* Empty update fields
* Invalid email format
* Password length less than 6 characters
* Duplicate email during registration
* Duplicate email during update
* Invalid user IDs
* Missing JWT tokens
* Invalid or expired JWT tokens

---

# Technologies Used

* Node.js
* Express.js
* PostgreSQL
* bcrypt
* JSON Web Token (JWT)
* dotenv
* Postman

---

# API Testing

The APIs were tested using Postman.

### Tested Features

* User Registration
* Input Validation
* Password Hashing
* User Login
* JWT Token Generation
* Protected Routes
* User CRUD Operations
* Error Handling

---

# Week 3 Status

## Completed

✅ PostgreSQL Database Connection
✅ User CRUD APIs
✅ Password Hashing using bcrypt
✅ Login API
✅ JWT Token Generation
✅ JWT Authentication Middleware
✅ Protected APIs
✅ Input Validation
✅ Duplicate Email Validation
✅ Email Format Validation
✅ Password Length Validation
✅ API Testing using Postman

**Week 3 Backend Development Completed Successfully.**
