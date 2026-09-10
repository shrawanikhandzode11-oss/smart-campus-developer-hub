# Smart Campus Developer Hub

Smart Campus Developer Hub is a full-stack web application designed to help
students discover projects, create their own projects, and collaborate with
other student developers.

The application uses a React frontend, Node.js/Express backend, and PostgreSQL
database to provide dynamic project and user management.

---

# 📌 Project Objective

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

The project was developed incrementally with frontend development,
backend development, database integration, testing, debugging, and
performance optimization.

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
- Protected frontend routes

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
- Authentication middleware

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

## Testing

- Vitest
- Jest
- React Testing Library
- Jest DOM
- User Event
- jsdom

## Development and Debugging Tools

- Visual Studio Code
- Git
- GitHub
- Chrome DevTools
- PostgreSQL
- pgAdmin

---

# 🏗️ Project Architecture

The application follows a three-layer architecture:

```text
                 SMART CAMPUS DEVELOPER HUB
                              |
              +---------------+---------------+
              |                               |
         FRONTEND                          BACKEND
              |                               |
        React + Vite                   Node.js + Express
              |                               |
              |                           REST APIs
              |                               |
              +---------------+---------------+
                              |
                         PostgreSQL
                           Database
 🔄 Frontend–Backend Integration

The frontend and backend are connected using REST APIs.

The React frontend uses Axios to communicate with the Node.js/Express backend.

The backend processes requests, performs authentication and database
operations, and returns JSON responses to the frontend.

Data Flow
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
🔐 Authentication

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
🔗 API Endpoints
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

This allows project data to remain available even after refreshing the
frontend.

📁 Project Structure
smart-campus-developer-hub/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── test/
│   │   ├── db.js
│   │   └── server.js
│   │
│   └── package.json
│
├── src/
│   ├── pages/
│   ├── services/
│   ├── test/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── test/
│
├── public/
├── .gitignore
├── package.json
├── vite.config.js
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

Create a .env file inside the backend folder.

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

🧪 Week 5 Testing

Week 5 focused on testing, debugging, reliability, and performance
optimization of the Smart Campus Developer Hub.

Testing was performed at multiple levels:

Frontend unit testing
Backend unit testing
Integration testing
Debugging and error validation
Performance testing
Production build verification
🧪 Testing Tools
Frontend Testing

The frontend was tested using:

Vitest
React Testing Library
Jest DOM
User Event
jsdom
Backend Testing

The backend was tested using:

Jest
Mocked database queries
Mocked bcrypt functions
Mocked JWT functions

Chrome DevTools was also used for:

Network request monitoring
API response inspection
Timing analysis
Debugging
Local Storage verification
🧩 Frontend Unit Testing

Frontend unit tests were created for important React functionality.

Basic Test

A basic arithmetic test was created to verify the Vitest setup.

2 + 3 = 5

Result:

Passed
Login Page Testing

The Login Page was tested for:

Successful login
Failed login
API request handling
Token storage
User information storage
Error message display

Result:

2 tests passed
Projects Page Testing

The Projects Page was tested for:

Fetching projects
Displaying projects
Searching projects
Creating projects

Result:

3 tests passed
Final Frontend Test Result
3 test files
6 tests passed
0 tests failed
⚙️ Backend Unit Testing

Backend controllers were tested using Jest.

Database and external dependencies were mocked so that controller logic
could be tested independently.

Project Controller Testing

The Project Controller was tested for:

Successful project creation
Missing title/description validation
Fetching projects for the logged-in user

Result:

3 tests passed
User Controller Testing

The User Controller was tested for:

Successful user creation
Fetching users
Successful login
Password hashing
Password comparison
JWT generation

Result:

3 tests passed
Final Backend Test Result
2 test suites passed
6 tests passed
0 tests failed
🔗 Integration Testing

Integration testing verified that the frontend, backend, database,
authentication, and API communication worked together correctly.

The following scenarios were tested:

Test	Expected Result	Status
Login → Dashboard	User reaches dashboard	Passed
Create project	Project created successfully	Passed
Database persistence	Project remains after refresh	Passed
Project search	Matching project displayed	Passed
Dashboard update	Project count updated	Passed
Authentication protection	Invalid token redirects to login	Passed

All integration scenarios passed successfully.

🐞 Debugging and Error Handling

Multiple invalid-input and error scenarios were intentionally tested
to verify application reliability.

Invalid Login

An invalid/unregistered account was used during login.

Expected result:

Login error message displayed

Result:

Passed
Invalid Project Input

A project was submitted without a required title.

Expected result:

Browser validation prevents invalid submission

Result:

Passed
Invalid Registration Email

An invalid email format was entered.

Expected result:

Email validation rejects the input

Result:

Passed
Duplicate Email

An already registered email was used during registration.

Expected result:

Email already registered

Result:

Passed
🛠️ Testing Configuration Issue and Fix

During Week 5 testing, an issue was discovered when running the frontend
Vitest test suite.

Vitest accidentally detected backend Jest test files.

This produced an error related to importing:

@jest/globals

outside the Jest environment.

Cause

Both frontend Vitest tests and backend Jest tests were located inside
the project structure, and Vitest was discovering backend test files.

Solution

The Vitest configuration was updated to include only frontend test files.

The following configuration was added to vite.config.js:

test: {
  environment: "jsdom",
  setupFiles: "./src/test/setup.js",
  globals: true,

  include: [
    "src/test/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
},

This restricted Vitest to the frontend test directory.

After applying the fix:

Frontend tests passed successfully.
Backend tests were executed separately using Jest.

This improved test reliability and prevented conflicts between the two
testing frameworks.

⚡ Performance Testing

Chrome DevTools Network panel was used to analyze API performance.

The project API request was monitored:

http://localhost:5000/api/projects

Cache was disabled during testing to obtain a fresh request measurement.

The API timing result was approximately:

Total Duration: 63.32 ms

Important timing values included:

Request Sent:       0.15 ms
Waiting Response:  54.97 ms
Content Download:   0.57 ms
Total Duration:    63.32 ms

The API response time was considered suitable for the local development
environment.

⚛️ React Strict Mode Verification

React Strict Mode was reviewed during performance debugging.

Strict Mode can cause additional development-time checks and may result
in effects appearing to execute more than once during development.

Strict Mode was retained because this behavior is intended for development
and does not mean that the production application will make duplicate
requests in the same way.

🏗️ Production Build Testing

The frontend production build was tested using:

npm run build

The build completed successfully without build errors.

This verified that the application could be compiled successfully for
production deployment.

📊 Final Testing Summary
Testing Area	Result
Frontend Unit Testing	Passed
Backend Unit Testing	Passed
Integration Testing	Passed
Debugging Tests	Passed
API Performance Testing	Passed
Production Build	Passed
Test Configuration Fix	Successful
Final Test Results
Frontend:
3 test files
6 tests passed

Backend:
2 test suites
6 tests passed

Integration:
6 scenarios passed

Debugging:
4 scenarios passed

Production Build:
Passed

API Performance:
Approximately 63.32 ms
🛡️ Code Quality and Reliability Improvements

The following improvements were implemented during development and
testing:

Reusable Axios API service
Centralized API configuration
JWT authentication
Protected backend routes
Password hashing using bcrypt
Input validation
Error handling
Loading states
Success and error messages
Authentication response interceptor
Database persistence
Separate frontend and backend testing frameworks
Mocking of database and authentication dependencies during unit tests
Production build verification
Performance monitoring using Chrome DevTools
⚠️ Error Handling

The application handles errors at both frontend and backend levels.

Frontend
Loading messages are displayed while requests are processed.
API errors are displayed to the user.
Failed authentication redirects the user to the login page.
Required project fields are validated.
Invalid registration input is rejected.
Duplicate registration attempts display an error.
Backend
Invalid requests return appropriate HTTP status codes.
Authentication failures return 401 or 403.
Database errors return 500.
Duplicate user emails are handled.
Invalid user IDs are validated.
Passwords are securely hashed using bcrypt.
🧩 Challenges and Solutions
Challenge	Solution
Connecting React with backend	Axios was configured with the backend API base URL
Protecting APIs	JWT authentication middleware was implemented
Password security	bcrypt was used for password hashing
Maintaining login session	JWT token stored in Local Storage
Displaying database data dynamically	React state and useEffect were used
Handling authentication errors	Axios response interceptor redirects to login
Maintaining project data after refresh	Data is stored in PostgreSQL
Testing framework conflict	Vitest was restricted to frontend test files
Verifying API performance	Chrome DevTools Network Timing was used
📈 Performance and Best Practices

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
Input validation
Environment variables for sensitive configuration
Git version control
Unit testing
Integration testing
Debugging and error validation
Production build verification
API performance monitoring
📚 Lessons Learned

During Week 5, the following concepts were practiced:

Writing unit tests for frontend components
Writing unit tests for backend controllers
Mocking database and external dependencies
Testing API interactions
Performing integration testing
Debugging frontend and backend issues
Using Chrome DevTools for network analysis
Measuring API response time
Configuring separate testing frameworks
Validating production builds
Improving code reliability through testing
🔮 Future Improvements

Future versions can include:

Project collaboration and team joining
Real-time notifications
Project comments
Student profiles
Advanced project filtering
Role-based access control
Deployment to cloud platforms
Real-time collaboration features
Automated CI/CD testing
Performance monitoring in production
📦 Week 5 Deliverables

The Week 5 submission contains:

Frontend source code
Backend source code
Database configuration
Frontend unit tests
Backend unit tests
Integration testing results
Debugging validation
Testing configuration
Performance testing results
Production build verification
Updated README
Week 5 testing and optimization report
Error logs/debugging evidence
Project configuration files
✅ Week 5 Outcome

The Smart Campus Developer Hub was successfully tested and optimized
after completing the frontend-backend integration.

The project successfully passed:

Frontend unit testing
Backend unit testing
Integration testing
Debugging validation
API performance testing
Production build testing

The final testing process verified that the React frontend, Express
backend, PostgreSQL database, authentication system, and API communication
work together reliably.                          