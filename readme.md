
# Test Case Management Application

This project consists of a backend API built with Flask and a frontend user interface built with React. The backend manages test cases in a PostgreSQL database, and the frontend provides a user interface to view and edit these test cases.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Additional Information](#additional-information)

## Prerequisites

Before setting up the backend and frontend, make sure you have the following installed:

- Python 3.8 or higher
- Node.js 14.x or higher
- PostgreSQL (or access to a PostgreSQL database)

## Backend Setup

###  Navigate to the Backend Directory

```bash
cd server
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository/server
```

### 2. Set Up a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory with the following content:

```plaintext
DATABASE_URL=postgresql://username:password@hostname:port/database
```
I already have placed the DB URL in .env so feel free to use that and test APIs on Postman/curl.

Replace `username`, `password`, `hostname`, `port`, and `database` with your PostgreSQL database credentials from Render.

### 5. Initialize the Database

```bash
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
```

### 6. Run the Backend Server

```bash
flask run
```

The backend server will be running on `http://localhost:5000` by default.

## Frontend Setup

### 1. Navigate to the Frontend Directory

```bash
cd my-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```plaintext
REACT_APP_API_URL=http://localhost:5000
```

Adjust `REACT_APP_API_URL` if your backend is running on a different URL or port.

### 4. Run the Frontend Development Server

```bash
npm start
```

The frontend application will be running on `http://localhost:3000` by default.

## Database Setup

### Render PostgreSQL Database

1. **Create a PostgreSQL Database** on Render and note the connection details (hostname, port, username, password, and database name) or use the existing DATABASE_URL I have placed in .env file.

2. **Set Up Environment Variables**:
   - Ensure the `DATABASE_URL` environment variable in the backend’s `.env` file matches the PostgreSQL connection string provided by Render.

3. **Database Migrations**:
   - After configuring the `DATABASE_URL`, run `flask db migrate` and `flask db upgrade` to set up the database schema according to your models.

## Usage

- **Frontend**: Open `http://localhost:3000` in your browser to access the React-based user interface. You can view and edit test cases here.

- **Backend**: The Flask API provides endpoints to manage test cases. Access the endpoints via the following routes:
  - `GET /testcases`: Retrieve all test cases.
  - `POST /add_testcase`: Add a new test case.
  - `PUT /testcases/:id`:  Update a test case.
## Additional Information

- **Styling**: The frontend uses styled-components for styling. If you need to make styling changes, you can adjust the `styled-components` in `frontend/src/TestCaseUI.js`.

- **Real-Time Updates**: Changes made on the frontend are reflected in real-time in the backend database, and vice versa.

- **Error Handling**: If you encounter any issues, check the console logs in both the frontend and backend for detailed error messages.

## Troubleshooting

- **Backend Issues**: Ensure the backend server is running and accessible. Verify the database connection and migration status.

- **Frontend Issues**: Ensure the React development server is running and that it can communicate with the backend. Check the network tab in browser developer tools for any failed requests.

---

Feel free to reach out for any questions or additional help!


This `README.md` provides a clear guide for setting up and running both the frontend and backend, as well as managing the database. Let me know if there’s anything else you’d like to include!