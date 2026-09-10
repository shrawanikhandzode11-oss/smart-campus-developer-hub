# Smart Campus Developer Hub

Smart Campus Developer Hub is a full-stack web application designed to help
students discover projects, create their own projects, and collaborate with
other student developers.

The application uses a React frontend, Node.js/Express backend, and PostgreSQL
database to provide dynamic project and user management.

---

## 📌 Project Objective

The main objective of Smart Campus Developer Hub is to provide a centralized
platform where students can:

- Discover available student projects
- Search for projects
- Create new projects
- View project information
- Track their projects through a dashboard
- Manage user information
- Collaborate with other students
- Improve practical development skills

The Week 4 implementation focuses on integrating the frontend with the backend
and PostgreSQL database to create a functional full-stack application.

---

# 🚀 Features

## Frontend Features

- Responsive landing page
- Navigation between pages
- Student dashboard
- Projects listing
- Project search
- Create project form
- Dynamic project cards
- Dynamic project count
- User management interface
- Edit user information
- Delete users
- Login and registration pages
- Loading states
- Error messages
- Success messages

## Backend Features

- REST API using Express.js
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- User CRUD operations
- Project creation
- Project retrieval
- PostgreSQL database integration
- Error handling
- CORS configuration

## Database Features

PostgreSQL is used for persistent data storage.

The database stores:

- User information
- Project information
- Project ownership
- Project creation timestamps
- Project status
- Project technologies

---

# 🛠️ Technology Stack

## Frontend

- React
- JavaScript
- HTML5
- CSS3
- Vite
- React Router DOM
- Axios
- React Icons

## Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- CORS
- dotenv

## Database

- PostgreSQL

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Chrome DevTools
- pgAdmin

---

# 🏗️ Project Architecture

The application follows a three-layer architecture:

```text
                 SMART CAMPUS DEVELOPER HUB
                           |
             +-------------+-------------+
             |                           |
        FRONTEND                      BACKEND
             |                           |
        React + Vite              Node.js + Express
             |                           |
             |                       REST APIs
             |                           |
             +-------------+-------------+
                           |
                       PostgreSQL
                         Database
---

# 🔄 Frontend–Backend Integration

The frontend and backend are connected using REST APIs.

The React frontend uses Axios to communicate with the Node.js/Express backend.

The backend processes requests, performs authentication and database operations,
and returns JSON responses to the frontend.

### Data Flow

```text
User
 ↓
React Frontend
 ↓
Axios API Request
 ↓
Express Backend
 ↓
Authentication Middleware
 ↓
Controller
 ↓
PostgreSQL Database
 ↓
JSON Response
 ↓
React UI
# 🔐Authentication

The application uses JWT-based authentication.

Login Flow
User enters email and password
            ↓
Frontend sends login request
            ↓
Backend verifies credentials
            ↓
Password checked using bcrypt
            ↓
JWT token generated
            ↓
Token sent to frontend
            ↓
Token stored in Local Storage
            ↓
Axios sends token with protected requests

Protected API requests use:

Authorization: Bearer <JWT_TOKEN>
API Endpoints
User APIs
Method	Endpoint	Purpose
POST	/api/users	Register a new user
POST	/api/users/login	Login user
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user
Project APIs
Method	Endpoint	Purpose
POST	/api/projects	Create a project
GET	/api/projects	Get logged-in user's projects
Testing APIs
Endpoint	Purpose
/	Check whether backend is running
/api/test-project-route	Check project route
/test-db	Check PostgreSQL connection
🗄️ Database Integration

PostgreSQL is used as the main database.

The backend connects to PostgreSQL using the pg package.

Project data is stored persistently in the database.

The projects table contains information such as:

Project ID
Project title
Project description
Technologies
Status
User ID
Creation timestamp

This allows project data to remain available even after refreshing the frontend.
📁 Project Structure
smart-campus-developer-hub/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── public/
├── .gitignore
├── package.json
└── README.md
⚙️ Local Setup and Installation
1. Clone the Repository
git clone https://github.com/shrawanikhandzode11-oss/smart-campus-developer-hub.git
cd smart-campus-developer-hub
2. Install Frontend Dependencies
npm install
3. Install Backend Dependencies
cd backend
npm install
4. Configure Environment Variables

.

Example:

PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
JWT_SECRET=your_secret_key

Do not upload the actual .env file to GitHub.

5. Start the Backend

Inside the backend folder:

npm run dev

Backend runs on:

http://localhost:5000
6. Start the Frontend

Open another terminal in the project root:

npm run dev

The frontend will run on the Vite development URL shown in the terminal.

🧪 Testing and Validation

The integrated application was tested from both the frontend and backend.

Test	Expected Result	Status
User registration	User successfully created	Passed
User login	JWT token generated	Passed
Create project	Project stored in PostgreSQL	Passed
Fetch projects	Projects displayed dynamically	Passed
Dashboard project count	Correct project count displayed	Passed
Page refresh	Data remains available	Passed
Edit user	Updated data persists	Passed
Delete user	User removed successfully	Passed
Invalid/expired token	User redirected to login	Passed
Database connection	PostgreSQL connection successful	Passed
⚠️ Error Handling

The application handles errors at both frontend and backend levels.

Frontend
Loading messages are displayed while requests are processed.
API errors are displayed to the user.
Failed authentication redirects the user to the login page.
Empty project fields are validated.
Backend
Invalid requests return appropriate HTTP status codes.
Authentication failures return 401 or 403.
Database errors return 500.
Duplicate user emails are handled.
Invalid user IDs are validated.
🧩 Challenges and Solutions
Challenge	Solution
Connecting React with backend	Axios was configured with the backend API base URL
Protecting APIs	JWT authentication middleware was implemented
Password security	bcrypt was used for password hashing
Maintaining login session	JWT token stored in Local Storage
Displaying database data dynamically	React state and useEffect were used
Handling authentication errors	Axios response interceptor redirects to login
Maintaining project data after refresh	Data is stored in PostgreSQL
🚀 Performance and Best Practices

The following practices were implemented:

REST API architecture
Reusable React components
Axios API service
JWT authentication
Password hashing using bcrypt
Protected backend routes
PostgreSQL persistent storage
Error handling
Loading states
Git version control
Environment variables for sensitive configuration
✅ Week 4 Outcome

The Smart Campus Developer Hub frontend and backend were successfully integrated.

The final application supports:

User registration and login
JWT authentication
Protected API requests
Project creation
Dynamic project retrieval
PostgreSQL data persistence
Dynamic dashboard statistics
User management
Error handling
Frontend-backend communication

The application was tested through multiple end-to-end scenarios to verify
that data flows correctly between the React frontend, Express backend, and
PostgreSQL database.

🔮 Future Improvements

Future versions can include:

Project collaboration and team joining
Real-time notifications
Project comments
Student profiles
Advanced project filtering
Role-based access control
Deployment to cloud platforms
Automated testing
Real-time collaboration features
📦 Week 4 Deliverables

The Week 4 submission contains:

Frontend source code
Backend source code
Database configuration
Updated README
Integration documentation
Testing and validation results

A short demonstration video can be provided to show the complete
frontend-backend data flow.